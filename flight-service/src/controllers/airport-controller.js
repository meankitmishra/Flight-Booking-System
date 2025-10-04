const { AirportService } = require("../services");

const { StatusCodes } = require("http-status-codes");

const { errorResponse, successResponse } = require("../utils/common");

async function createAirport(req, res) {
	try {
		// console.log(req.body);
		const airport = await AirportService.createAirport({
			name: req.body.name,
			code: req.body.code,
			address: req.body.address,
			cityID: req.body.cityID,
		});
		successResponse.message = "Successfully created airplane";
		successResponse.data = airport;
		return res.status(StatusCodes.CREATED).json(successResponse);
	} catch (error) {
		errorResponse.error = error;
		errorResponse.message = "Something went wrong while creating airport";
		// console.log(error);
		return res.status(error.statusCode).json(errorResponse);
	}
}

async function getAirports(req, res) {
	try {
		const airports = await AirportService.getAirports();
		successResponse.message = "Successfully fetched the airports";
		successResponse.data = airports;
		return res.status(StatusCodes.OK).json(successResponse);
	} catch (error) {
		errorResponse.error = error;
		errorResponse.message = "Something went wrong while fetching the airports";
		return res.status(error.statusCode).json(errorResponse);
	}
}

async function getAirport(req, res) {
	try {
		const airport = await AirportService.getAirport(req.params.id);
		successResponse.message = "Successfully fetched the airport";
		successResponse.data = airport;
		return res.status(StatusCodes.OK).json(successResponse);
	} catch (error) {
		errorResponse.error = error;
		errorResponse.message = "Something went wrong while fetching the airport";
		return res.status(error.statusCode).json(errorResponse);
	}
}

async function destroyAirport(req, res) {
	try {
		const airport = await AirportService.destroyAirport(req.params.id);
		successResponse.message = "Successfully destroyed the airport";
		successResponse.data = airport;
		return res.status(StatusCodes.OK).json(successResponse);
	} catch (error) {
		errorResponse.error = error;
		errorResponse.message = "Something went wrong while destroying the airport";
		return res.status(error.statusCode).json(errorResponse);
	}
}

async function updateAirport(req, res) {
	try {
		const airport = await AirportService.updateAirport(req.params.id, req.body);
		successResponse.message = "Successfully updated the airport";
		successResponse.data = airport;
		return res.status(StatusCodes.OK).json(successResponse);
	} catch (error) {
		errorResponse.error = error;
		errorResponse.message = "Something went wrong while updating the airport";
		return res.status(error.statusCode).json(errorResponse);
	}
}

module.exports = {
	createAirport,
	getAirports,
	getAirport,
	destroyAirport,
	updateAirport,
};
