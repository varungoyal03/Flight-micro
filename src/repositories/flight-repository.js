const { Sequelize } = require('sequelize');

const CrudRepository = require('./crud-repository');
const { Flight, Airplane, Airport, City } = require('../models');
const db = require('../models');



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



    
    async updateRemainingSeats(flightId, seats, dec = true) {//dec pass as true for decrement and false for increment
        const transaction = await db.sequelize.transaction();
        console.log("transaction started");
        console.log(transaction);
        try {
            

        const flight = await Flight.findByPk(flightId, {
            transaction,
            lock: transaction.LOCK.UPDATE
        });

        
        if (!flight) {
            throw new Error('Flight not found');
        }

        // 🔴 CRITICAL CHECK
        if (dec && flight.totalSeats < seats) {
            throw new Error('Not enough seats available');
        }

        if (dec) {
            await flight.decrement('totalSeats', { by: seats, transaction });
        } else {
            await flight.increment('totalSeats', { by: seats, transaction });
        }


      

            await transaction.commit();
            return flight;
        } catch(error) {
            await transaction.rollback();
            throw error;
        }
       
    }
}


module.exports = FlightRepository;
