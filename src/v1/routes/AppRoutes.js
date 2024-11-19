const express = require('express');
const router = express.Router();

const appController = require('../../controllers/AppController');
router
    .get('/', appController.getAllApps)
    .post('/add', appController.createApp)
    .post('/check', appController.checkResponsible)
    .post('/favs', appController.addFavApp)
    .post('/my-favs', appController.getFavApps)
    .post('/add-app', appController.addGroupApp)
    .post('/app-by-group', appController.getAppsByGroup)


module.exports = router;    