"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */ await queryInterface.bulkInsert(
			"Flights",
			[
				{
					flightNumber: "AI101",
					airplaneId: 1,
					departureAirportId: "DEL",
					arrivalAirportId: "BOM",
					departureTime: new Date("2025-03-01 10:00:00"),
					arrivalTime: new Date("2025-03-01 12:00:00"),
					price: 5000,
					totalSeats: 180,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					flightNumber: "BA202",
					airplaneId: 2,
					departureAirportId: "BOM",
					arrivalAirportId: "BLR",
					departureTime: new Date("2025-03-02 08:30:00"),
					arrivalTime: new Date("2025-03-02 10:30:00"),
					price: 4500,
					totalSeats: 220,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					flightNumber: "6E303",
					airplaneId: 3,
					departureAirportId: "DEL",
					arrivalAirportId: "BOM",
					departureTime: new Date("2025-03-03 07:00:00"),
					arrivalTime: new Date("2025-03-03 09:30:00"),
					price: 3000,
					totalSeats: 200,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					flightNumber: "UK505",
					airplaneId: 5,
					departureAirportId: "BOM",
					arrivalAirportId: "PAT",
					departureTime: new Date("2025-03-04 12:00:00"),
					arrivalTime: new Date("2025-03-04 15:30:00"),
					price: 2800,
					totalSeats: 130,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					flightNumber: "AI707",
					airplaneId: 6,
					departureAirportId: "PAT",
					arrivalAirportId: "BLR",
					departureTime: new Date("2025-03-05 09:00:00"),
					arrivalTime: new Date("2025-03-05 12:45:00"),
					price: 3500,
					totalSeats: 210,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					flightNumber: "SG808",
					airplaneId: 1,
					departureAirportId: "BLR",
					arrivalAirportId: "HYD",
					departureTime: new Date("2025-03-06 06:30:00"),
					arrivalTime: new Date("2025-03-06 07:45:00"),
					price: 2000,
					totalSeats: 180,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					flightNumber: "AI909",
					airplaneId: 5,
					departureAirportId: "HYD",
					arrivalAirportId: "DEL",
					departureTime: new Date("2025-03-07 14:15:00"),
					arrivalTime: new Date("2025-03-07 16:45:00"),
					price: 4000,
					totalSeats: 120,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					flightNumber: "AI303",
					airplaneId: 6,
					departureAirportId: "DEL",
					arrivalAirportId: "HYD",
					departureTime: new Date("2025-03-08 10:00:00"),
					arrivalTime: new Date("2025-03-08 12:00:00"),
					price: 3500,
					totalSeats: 200,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					flightNumber: "UK606",
					airplaneId: 2,
					departureAirportId: "BOM",
					arrivalAirportId: "BLR",
					departureTime: new Date("2025-03-09 14:30:00"),
					arrivalTime: new Date("2025-03-09 16:30:00"),
					price: 3200,
					totalSeats: 220,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					flightNumber: "AI404",
					airplaneId: 4,
					departureAirportId: "BLR",
					arrivalAirportId: "DEL",
					departureTime: new Date("2025-03-10 11:00:00"),
					arrivalTime: new Date("2025-03-10 14:00:00"),
					price: 3800,
					totalSeats: 230,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete(
			"Flights",
			{
				flightNumber: [
					"AI101",
					"BA202",
					"6E303",
					"UK505",
					"AI707",
					"SG808",
					"AI909",
					"AI303",
					"UK606",
					"AI404",
				],
			},
			{}
		);
	},
};
