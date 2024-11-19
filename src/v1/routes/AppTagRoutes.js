const express = require('express');
const router = express.Router();

const appTagController = require('../../controllers/AppTagController');
router
    .get('/', appTagController.getAllAppTags)
    .post('/add', appTagController.createAppTag)




module.exports = router;    