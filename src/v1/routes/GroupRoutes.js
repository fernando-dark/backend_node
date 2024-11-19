const express = require('express');
const router = express.Router();

const groupController = require('../../controllers/GroupController');
router
    .get('/', groupController.getAllGroups)
    .post('/add', groupController.createGroup)
    .post('/add-role', groupController.addRoleGroup)
    .delete('/delete/:id', groupController.deleteRoleGroup)




module.exports = router;    