const express = require('express');

const { InfoController } = require('../../controllers');


const router = express.Router();
const airplaneRoutes = require('./airplane-route');
const cityRoutes = require('./city-route');
const flightRoutes = require('./flight-route');

router.get('/info', InfoController.info);
router.use('/airplanes', airplaneRoutes);
router.use('/cities', cityRoutes);
router.use('/flights', flightRoutes);

module.exports = router;