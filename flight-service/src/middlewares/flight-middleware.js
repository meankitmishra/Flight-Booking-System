const { StatusCodes } = require("http-status-codes");
const { DateTimeCompare } = require("../utils");
const { errorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
	if (!req.body.flightNumber) {
		errorResponse.message = "Something went wrong while creating flight";
		errorResponse.error = new AppError(
			["Flight Number is not provided"],
			StatusCodes.BAD_REQUEST
		);

		return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
	}
	if (!req.body.airplaneId) {
		errorResponse.message = "Something went wrong while creating flight";
		errorResponse.error = new AppError(
			["airplane Id is not provided"],
			StatusCodes.BAD_REQUEST
		);

		return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
	}
	if (!req.body.departureAirportId) {
		errorResponse.message = "Something went wrong while creating flight";
		errorResponse.error = new AppError(
			["departure Airport Id is not provided"],
			StatusCodes.BAD_REQUEST
		);

		return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
	}
	if (!req.body.arrivalAirportId) {
		errorResponse.message = "Something went wrong while creating flight";
		errorResponse.error = new AppError(
			["arrival Airport Id is not provided"],
			StatusCodes.BAD_REQUEST
		);

		return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
	}
	if (!req.body.departureTime) {
		errorResponse.message = "Something went wrong while creating flight";
		errorResponse.error = new AppError(
			["departure Time is not provided"],
			StatusCodes.BAD_REQUEST
		);

		return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
	}
	if (!req.body.arrivalTime) {
		errorResponse.message = "Something went wrong while creating flight";
		errorResponse.error = new AppError(
			["arrival Time is not provided"],
			StatusCodes.BAD_REQUEST
		);

		return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
	}
	if (!req.body.price) {
		errorResponse.message = "Something went wrong while creating flight";
		errorResponse.error = new AppError(
			["price is not provided"],
			StatusCodes.BAD_REQUEST
		);

		return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
	}
	if (!req.body.totalSeats) {
		errorResponse.message = "Something went wrong while creating flight";
		errorResponse.error = new AppError(
			["totalSeats is not provided"],
			StatusCodes.BAD_REQUEST
		);

		return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
	}

	next();
}

function validateDepartureArrivalTime(req, res, next) {
	if (
		!DateTimeCompare.compareTime(req.body.departureTime, req.body.arrivalTime)
	) {
		errorResponse.message = "Something went wrong while creating flight";
		errorResponse.error = new AppError(
			["Departure time should be before arrival time"],
			StatusCodes.BAD_REQUEST
		);
		return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
	}

	next();
}

function validateUpdateSeatRequest(req, res, next) {
	if (!req.body.seats) {
		errorResponse.message = "Something went wrong while updating flight";
		errorResponse.error = new AppError(
			["Seats information is not provided"],
			StatusCodes.BAD_REQUEST
		);

		return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
	}
	next();
}

module.exports = {
	validateCreateRequest,
	validateDepartureArrivalTime,
	validateUpdateSeatRequest,
};
