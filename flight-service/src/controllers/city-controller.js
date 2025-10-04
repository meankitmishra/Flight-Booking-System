const { CityService } = require("../services");

const { StatusCodes } = require("http-status-codes");

const { errorResponse, successResponse } = require("../utils/common");

async function createCity(req, res) {
	try {
		const city = await CityService.createCity({ name: req.body.name });
		successResponse.data = city;
		successResponse.message = "Created a city Successfully";
		return res.status(StatusCodes.CREATED).json(successResponse);
	} catch (error) {
		errorResponse.error = error;
		errorResponse.message = "Something went wrong while creating the city";
		return res.status(error.statusCode).json(errorResponse);
	}
}

async function getCities(req, res) {
	try {
		const cities = await CityService.getCities();
		successResponse.data = cities;
		successResponse.message = "Successfully fetched all the cities";
		return res.status(StatusCodes.OK).json(successResponse);
	} catch (error) {
		errorResponse.error = error;
		errorResponse.message = "Something went wrong while fetching cities";
		return res.status(error.statusCode).json(errorResponse);
	}
}

async function getCity(req, res) {
	try {
		const city = await CityService.getCity(req.params.id);
		successResponse.data = city;
		successResponse.message = "Successfully fetched the city";
		res.status(StatusCodes.OK).json(successResponse);
	} catch (error) {
		errorResponse.error = error;
		errorResponse.message = "Something went wrong while fetching the city";
		return res.status(error.statusCode).json(errorResponse);
	}
}

async function destroyCity(req, res) {
	try {
		const city = await CityService.destroyCity(req.params.id);
		successResponse.data = city;
		successResponse.message = "Successfully destroyed the city";
		res.status(StatusCodes.OK).json(successResponse);
	} catch (error) {
		errorResponse.error = error;
		errorResponse.message = "Something went wrong while destroying the city";
		return res.status(error.statusCode).json(errorResponse);
	}
}

async function updateCity(req, res) {
	try {
		const city = await CityService.updateCity(req.params.id, req.body);
		successResponse.message = "Successfully updated the city";
		successResponse.data = city;
		res.status(StatusCodes.OK).json(successResponse);
	} catch (error) {
		errorResponse.error = error;
		errorResponse.message = "Something went wrong while updating the city";
		return res.status(error.statusCode).json(errorResponse);
	}
}

module.exports = {
	createCity,
	getCities,
	getCity,
	destroyCity,
	updateCity,
};
