const { BookingService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { errorResponse, successResponse } = require("../utils/common");
const inMemDb = [];
async function createBooking(req, res) {
	try {
		// console.log(req.body);
		const response = await BookingService.createBooking({
			flightId: req.body.flightId,
			userId: req.body.userId,
			noOfSeats: req.body.noOfSeats,
		});
		successResponse.data = response;
		return res.status(StatusCodes.CREATED).json(successResponse);
	} catch (error) {
		console.log(error);
		errorResponse.error = error;
		errorResponse.message = "Something went wrong";
		// console.log(error);
		return res.status(error.statusCode).json(errorResponse);
	}
}

async function makePayment(req, res) {
	try {
		// console.log(req.body);
		const idempotencyKey = req.headers["x-idempotency-key"];
		if (!idempotencyKey) {
			errorResponse.message = "idempotency key missing";
			// console.log(error);
			return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
		}
		if (!idempotencyKey || inMemDb[idempotencyKey]) {
			errorResponse.message = "Cannot retry on sucessful message";
			// console.log(error);
			return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
		}
		const response = await BookingService.makePayment({
			bookingId: req.body.bookingId,
			userId: req.body.userId,
			totalCost: req.body.totalCost,
		});
		inMemDb[idempotencyKey] = idempotencyKey;
		successResponse.data = response;
		return res.status(StatusCodes.OK).json(successResponse);
	} catch (error) {
		console.log(error);
		errorResponse.error = error;
		errorResponse.message = "Something went wrong";
		// console.log(error);
		return res.status(error.statusCode).json(errorResponse);
	}
}

module.exports = { createBooking, makePayment };
