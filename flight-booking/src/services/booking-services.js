const axios = require("axios");
const { BookingRepository } = require("../repositories");
const db = require("../models");
const { ServerConfig } = require("../config");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const { Enums } = require("../utils/common");
const { BOOKED, CANCELLED, INITIATED, PENDING } = Enums.BOOKING_STATUS;

const bookingRepository = new BookingRepository();

async function createBooking(data) {
	const transaction = await db.sequelize.transaction();
	try {
		const flight = await axios.get(
			`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`
		);

		const flightData = flight.data.data;
		if (data.noOfSeats > flightData.totalSeats) {
			throw new AppError("Not enough Seats available", StatusCodes.BAD_REQUEST);
		}
		const totalBillingAmount = data.noOfSeats * flightData.price;

		const bookingPayload = { ...data, totalCost: totalBillingAmount };
		const booking = await bookingRepository.createBooking(
			bookingPayload,
			transaction
		);

		await axios.patch(
			`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,
			{ seats: data.noOfSeats }
		);

		await transaction.commit();
		return booking;
	} catch (error) {
		// console.log(error);
		await transaction.rollback();
		throw error;
	}
}

async function makePayment(data) {
	const transaction = await db.sequelize.transaction();
	try {
		const bookingDetails = await bookingRepository.get(
			data.bookingId,
			transaction
		);
		if (bookingDetails.status == CANCELLED) {
			throw new AppError("the Booking has expired", StatusCodes.BAD_REQUEST);
		}

		const bookingTime = bookingDetails.createdAt;
		const currentTime = new Date();
		if (currentTime - bookingTime > 300000) {
			await cancelTicket(data);
			throw new AppError("The Booking has expired", StatusCodes.BAD_REQUEST);
		}
		console.log(bookingDetails.totalCost);
		console.log(data.totalCost);
		if (bookingDetails.totalCost != data.totalCost) {
			throw new AppError(
				"The amount of payment doesn't match",
				StatusCodes.BAD_REQUEST
			);
		}

		if (bookingDetails.userId != data.userId) {
			throw new AppError(
				"The user corresponding to this payment doesn't match",
				StatusCodes.BAD_REQUEST
			);
		}

		await bookingRepository.update(
			data.bookingId,
			{ status: BOOKED },
			transaction
		);

		await transaction.commit();
	} catch (error) {
		await transaction.rollback();
		// console.log(error);

		if (error.statusCode == StatusCodes.BAD_REQUEST) {
			throw error;
		}

		if (error.statusCode == StatusCodes.NOT_FOUND) {
			throw new AppError(
				"Not able to find the resource",
				StatusCodes.NOT_FOUND
			);
		}

		throw new AppError(
			"Something went wrong",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function cancelTicket(data) {
	console.log("from cancellation");
	const transaction = await db.sequelize.transaction();
	try {
		const bookingDetails = await bookingRepository.get(
			data.bookingId,
			transaction
		);
		if (bookingDetails.status == CANCELLED) {
			await transaction.commit();
			return true;
		}

		await axios.patch(
			`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${bookingDetails.flightId}/seats`,
			{ seats: bookingDetails.noOfSeats, dec: 0 }
		);
		await bookingRepository.update(
			data.bookingId,
			{ status: CANCELLED },
			transaction
		);
		await transaction.commit();
	} catch (error) {
		await transaction.rollback();
	}
}

async function cancelOldBooking() {
	try {
		// console.log("here service");
		const time = new Date(Date.now() - 1000 * 300); //5 min ago
		const response = await bookingRepository.cancelOldBookings(time);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

module.exports = { createBooking, makePayment, cancelOldBooking };
