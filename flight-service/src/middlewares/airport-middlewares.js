const { StatusCodes } = require("http-status-codes");

const { errorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
	if (!req.body.name) {
		errorResponse.message = "Something went wrong while creating airport";
		errorResponse.error = new AppError(
			["Name is not provided"],
			StatusCodes.BAD_REQUEST
		);

		return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
	}
	if (!req.body.code) {
		errorResponse.message = "Something went wrong while creating airport";
		errorResponse.error = new AppError(
			["code is not provided"],
			StatusCodes.BAD_REQUEST
		);

		return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
	}
	if (!req.body.cityID) {
		errorResponse.message = "Something went wrong while creating airport";
		errorResponse.error = new AppError(
			["cityID is not provided"],
			StatusCodes.BAD_REQUEST
		);

		return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
	}
	next();
}

module.exports = {
	validateCreateRequest,
};
