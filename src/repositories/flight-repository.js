const { Sequelize } = require('sequelize');

const CrudRepository = require('./crud-repository');
const { Flight, Airplane, Airport, City } = require('../models');


class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetail',
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    include: {
                        model: City,
                        required: true
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    include: {
                        model: City,
                        required: true
                    }
                }
            ]
        });
        return response;
    }
}
module.exports = FlightRepository;