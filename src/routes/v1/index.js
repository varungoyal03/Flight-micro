const express = require('express');

const { InfoController } = require('../../controllers');


const router = express.Router();
const airplaneRoutes = require('./airplane-route');
const cityRoutes = require('./city-route');

router.get('/info', InfoController.info);
router.use('/airplanes', airplaneRoutes);
router.use('/cities', cityRoutes);

module.exports = router;