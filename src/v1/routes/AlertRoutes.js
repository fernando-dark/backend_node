const express = require('express');
const router = express.Router();

const alertController = require('../../controllers/AlertController');
router
    .get('/', alertController.getAllAlerts);




module.exports = router;    