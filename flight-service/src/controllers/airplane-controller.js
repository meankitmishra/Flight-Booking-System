const { AirplaneService } = require("../services");

const { StatusCodes } = require("http-status-codes");

const { errorResponse, successResponse } = require("../utils/common");

async function createAirplane(req, res) {
	try {
		// console.log(req.body);
		const airplane = await AirplaneService.createAirplane({
			modelNumber: req.body.modelNumber,
			capacity: req.body.capacity,
		});
		successResponse.message = "Successfully created airplane";
		successResponse.data = airplane;
		return res.status(StatusCodes.CREATED).json(successResponse);
	} catch (error) {
		errorResponse.error = error;
		errorResponse.message = "Something went wrong while creating airplane";
		return res.status(error.statusCode).json(errorResponse);
	}
}

async function getAirplanes(req, res) {
	try {
		const airplanes = await AirplaneService.getAirplanes();
		successResponse.message = "Successfully fetched the airplane";
		successResponse.data = airplanes;
		return res.status(StatusCodes.OK).json(successResponse);
	} catch (error) {
		errorResponse.error = error;
		errorResponse.message = "Something went wrong while fetching the airplane";
		return res.status(error.statusCode).json(errorResponse);
	}
}

async function getAirplane(req, res) {
	try {
		const airplane = await AirplaneService.getAirplane(req.params.id);
		successResponse.message = "Successfully fetched the airplane";
		successResponse.data = airplane;
		return res.status(StatusCodes.OK).json(successResponse);
	} catch (error) {
		errorResponse.error = error;
		errorResponse.message = "Something went wrong while fetching the airplane";
		return res.status(error.statusCode).json(errorResponse);
	}
}

async function destroyAirplane(req, res) {
	try {
		const airplane = await AirplaneService.destroyAirplane(req.params.id);
		successResponse.message = "Successfully destroyed the airplane";
		successResponse.data = airplane;
		return res.status(StatusCodes.OK).json(successResponse);
	} catch (error) {
		errorResponse.error = error;
		errorResponse.message =
			"Something went wrong while destroying the airplane";
		return res.status(error.statusCode).json(errorResponse);
	}
}

async function updateAirplane(req, res) {
	try {
		const airplane = await AirplaneService.updateAirplane(
			req.params.id,
			req.body
		);
		successResponse.message = "Successfully updated the airplane";
		successResponse.data = airplane;
		return res.status(StatusCodes.OK).json(successResponse);
	} catch (error) {
		errorResponse.error = error;
		errorResponse.message = "Something went wrong while updating the airplane";
		return res.status(error.statusCode).json(errorResponse);
	}
}

module.exports = {
	createAirplane,
	getAirplanes,
	getAirplane,
	destroyAirplane,
	updateAirplane,
};
