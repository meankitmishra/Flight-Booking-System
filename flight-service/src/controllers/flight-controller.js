const { FlightService } = require("../services");

const { StatusCodes } = require("http-status-codes");

const { errorResponse, successResponse } = require("../utils/common");

async function createFlight(req, res) {
	try {
		// console.log(req.body);
		const flight = await FlightService.createFlight({
			flightNumber: req.body.flightNumber,
			airplaneId: req.body.airplaneId,
			departureAirportId: req.body.departureAirportId,
			arrivalAirportId: req.body.arrivalAirportId,
			departureTime: req.body.departureTime,
			arrivalTime: req.body.arrivalTime,
			price: req.body.price,
			boardingGate: req.body.boardingGate,
			totalSeats: req.body.totalSeats,
		});
		successResponse.message = "Successfully created flight";
		successResponse.data = flight;
		return res.status(StatusCodes.CREATED).json(successResponse);
	} catch (error) {
		errorResponse.error = error;
		errorResponse.message = "Something went wrong while creating flight";
		// console.log(error);
		return res.status(error.statusCode).json(errorResponse);
	}
}

async function getAllFlights(req, res) {
	try {
		const flights = await FlightService.getAllFlights(req.query);
		successResponse.data = flights;
		successResponse.message = "Successfully fetched all the flights";
		return res.status(StatusCodes.OK).json(successResponse);
	} catch (error) {
		errorResponse.error = error;
		console.log(error);
		errorResponse.message = "Something went wrong while fetching the flights";
		return res.status(error.statusCode).json(errorResponse);
	}
}

async function getFlight(req, res) {
	try {
		const flight = await FlightService.getFlight(req.params.id);
		successResponse.message = "Successfully fetched the flight";
		successResponse.data = flight;
		return res.status(StatusCodes.OK).json(successResponse);
	} catch (error) {
		console.log(error);
		errorResponse.data = error;
		errorResponse.message = "Something went wrong while fetching the flights";
		return res.status(error.statusCode).json(errorResponse);
	}
}

async function updateSeats(req, res) {
	try {
		const response = await FlightService.updateSeats({
			flightId: req.params.id,
			seats: req.body.seats,
			dec: req.body.dec,
		});
		successResponse.data = response;
		successResponse.message = "Successfully updated the seats of flights";
		return res.status(StatusCodes.OK).json(successResponse);
	} catch (error) {
		errorResponse.data = error;
		errorResponse.message = "Something went wrong while updating the seats";
		return res.status(error.statusCode).json(errorResponse);
	}
}

module.exports = {
	createFlight,
	getAllFlights,
	getFlight,
	updateSeats,
};
