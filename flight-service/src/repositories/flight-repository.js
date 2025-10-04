const CrudRepository = require("./crud-repository");
const { Flight, Airport, Airplane } = require("../models");
const db = require("../models");
const { rowLockQueryOnFlights } = require("./queries");
class FlightRepository extends CrudRepository {
	constructor() {
		super(Flight);
	}

	async getAllFlights(filter, sort) {
		const flights = await Flight.findAll({
			where: filter,
			order: sort,
			include: [
				{
					model: Airport,
					as: "departure_airport", // Specify the alias for the departure airport
					attributes: ["id", "name", "code"],
				},
				{
					model: Airport,
					as: "arrival_airport", // Specify the alias for the arrival airport
					attributes: ["id", "name", "code"],
				},
				{
					model: Airplane,
					as: "airplane_details",
					required: true,
				},
			],
		});
		return flights;
	}

	async updateRemainningSeats(flightId, seats, dec = true) {
		const transaction = await db.sequelize.transaction();
		try {
			await db.sequelize.query(rowLockQueryOnFlights(flightId));
			const flight = await Flight.findByPk(flightId);
			if (+dec) {
				const response = await flight.decrement(
					"totalSeats",
					{ by: seats },
					{ transaction: transaction }
				);
				return response;
			} else {
				const response = await flight.increment(
					"totalSeats",
					{ by: seats },
					{ transaction: transaction }
				);
				await transaction.commit();
				return response;
			}
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
}

module.exports = FlightRepository;
