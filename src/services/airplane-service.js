const { StatusCodes } = require('http-status-codes');

const {AirplaneRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        
        if (error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('cannot create a new Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



async function getAirplanes() {
    try {
        const ariplanes = await airplaneRepository.getAll();


        return ariplanes;
    } catch(error) {
        throw new AppError('cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        if(!airplane) {
        throw new AppError("The airplane you requested is not present", StatusCodes.NOT_FOUND);
    }
        return airplane;
    } catch (error) {
        }
        throw new AppError("Cannot fetch data of the airplane", StatusCodes.BAD_REQUEST);
    }


async function destroyAirplane(id) {
    try {
        const deletedCount = await airplaneRepository.destroy(id);

    if (deletedCount === 0) {
        throw new AppError("The airplane you requested to delete is not present", StatusCodes.NOT_FOUND);
    }
        return deletedCount;

    } catch (error) {
       
        throw new AppError(`Cannot destroy airplane`, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirplane(id, data) {
    try {
      
        const updatedCount = await airplaneRepository.update(id, data);

          if (updatedCount === 0) {
            throw new AppError("Airplane not found", StatusCodes.NOT_FOUND);
        }

    
        return updatedCount;
    } catch (error) {
        // Handle validation errors from the repository layer
        if (error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        
        console.log(error);
        throw new AppError('Cannot update the airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}

