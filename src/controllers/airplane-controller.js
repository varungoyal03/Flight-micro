const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


async function createAirplane(req, res) {
    try {
        const { modelNumber, capacity } = req.body;

        const airplane = await AirplaneService.createAirplane({
            modelNumber,
            capacity,
        });
    
        SuccessResponse.data = airplane;
        return res.status(StatusCodes?.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        console.log(error);
        return res.status(error.statusCode).json(ErrorResponse);
    }
}
module.exports = {
    createAirplane
}