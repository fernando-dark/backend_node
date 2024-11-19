const express = require('express');
const router = express.Router();

const roleController = require('../../controllers/RolController');

router
    .get('/')
    .post('/add-gsso', roleController.createSSOGroup)
    .get('/get-gsso', roleController.getAllSSOGroup)
    .post('/add-rol', roleController.addRol)
    .get('/get-all', roleController.allRoles)
    .put('/edit-rol', roleController.editRole)
    .delete('/delete/:id', roleController.deleteRole)


module.exports = router;
