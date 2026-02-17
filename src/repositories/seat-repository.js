const CrudRepository = require('./crud-repository');
const { Seat } = require('../models/');

class SeatRepository extends CrudRepository {
    constructor() {
        super(Seat);
    }

async getSeatsByAirplaneId(airplaneId) {
        // Fetch all physical seats (A1, A2, B1...) for this airplane
        const response = await Seat.findAll({
            where: { airplaneId: airplaneId },
            order: [['row', 'ASC'], ['col', 'ASC']]
        });
        return response;
    }
}

module.exports = SeatRepository;