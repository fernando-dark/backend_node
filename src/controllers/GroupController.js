const GroupModel = require('../models/GroupModel');
const GroupRoleModel = require('../models/GroupRoleModel');
const AppModel = require('../models/AppModel');
const GroupAppModel = require('../models/GroupAppModel');

const createGroup = async (req, res) => {
    try {
        const { name, description, creationdate, lastupdateuser, roles, apps } = req.body;

        const group = await GroupModel.createGroup({ name, description, creationdate, lastupdate: creationdate, lastupdateuser, status: 1 });
        console.log(`id del Grupo ${group.id}`);


        for (const rol of roles) {
            const existRole = await GroupRoleModel.roleExist({ name: rol });

            if (existRole) {
                await GroupRoleModel.add({ idgroup: group.id, idrole: existRole });
            }
        }

        for (const app of apps) {
            const existApp = await AppModel.appExist({ name: app });

            if (existApp) {
                // await GroupRoleModel.add({ idgroup: group.id, idrole: existApp });
                await GroupAppModel.add({ appid: existApp, groupid: group.id, creationdate });
            }
        }


        res.status(201).json(group);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: 'Error al crear grupo'
        });
    }
};



const getAllGroups = async (req, res) => {
    try {
        const groups = await GroupModel.getAllGroups();
        res.status(200).json({
            groups: groups
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al mostrar los grupos'
        });
    }
};


const addRoleGroup = async (req, res) => {
    try {

        const { idgroup, idrole } = req.body;

        const roleGroup = await GroupRoleModel.add({ idgroup, idrole });
        res.status(201).json({
            roleGroup: roleGroup
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: `Error al agregar role al grupo ${error}`
        });
    }
}


const deleteRoleGroup = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteRole = await GroupModel.deleteGroup({ id });
        const deleteGroupApp = await GroupAppModel.delete({ id });
        const deleteGroupRole = await GroupRoleModel.delete({ id });

        res.status(201).json({
            message: `Grupo de rol ${id} eliminado correctamente`
        });

    } catch (error) {
        console.log(`Error eliminar rol ${error}`);
        res.status(500).json({
            error: `Error al eliminar rol: ${error}`
        });
    }
}

module.exports = { createGroup, getAllGroups, addRoleGroup, deleteRoleGroup };