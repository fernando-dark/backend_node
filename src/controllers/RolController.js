const RolModel = require('../models/RolModel');
const GroupAppModel = require('../models/GroupAppModel');
const GroupRoleModel = require('../models/GroupRoleModel');
const GroupModel = require('../models/GroupModel');




const createSSOGroup = async (req, res) => {
    try {
        const { groupsso } = req.body;

        console.log(`CONTROLLER: ${groupsso}`);


        const groupSso = await RolModel.createSSOGroup({ groupsso });
        res.status(201).json({
            groupsso: groupSso
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: `Error al crear grupo SSO ${error}`
        });
    }

};

const getAllSSOGroup = async (req, res) => {
    try {
        const groupsSSO = await RolModel.getAllGroupSSO();
        res.status(200).json({
            groupsSSO: groupsSSO
        });
    } catch (error) {
        res.status(500).json({
            error: `Error al obtener los SSOGroups ${error}`
        });
    }
}


const addRol = async (req, res) => {
    try {

        const { name, groupsso, location, func, section, personalarea, personalgroup, salarygrade, payrolltype, society } = req.body;

        console.log(`society ${society}`);


        const addrol = await RolModel.addRole({ name, groupsso, location, func, section, personalarea, personalgroup, salarygrade, payrolltype, society });

        res.status(201).json({
            message: addrol
        });

    } catch (error) {
        console.log(`Error add rol ${error}`);

        res.status(500).json({
            error: `Error al crear rol ${error}`
        });
    }
}


const allRoles = async (req, res) => {
    try {

        const roles = await RolModel.getAllRolls();

        res.status(201).json({
            roles: roles,
        });

    } catch (error) {
        console.log(`Error roles ${error}`);

        res.status(500).json({
            error: `Error al obtener los roles ${error}`
        });
    }
}


const editRole = async (req, res) => {
    try {

        const { name, groupsso, func, id } = req.body

        const editRole = await RolModel.editRole({ name, groupsso, func, id });
        res.status(202).json({
            editRole: editRole
        });
    } catch (error) {
        console.log(`Error  ${error}`);
        res.status(500).json({
            error: `error al   ${error}`
        });
    }
}

const deleteRole = async (req, res) => {

    console.log('ENTRO AQUI');

    try {
        const { id } = req.params;
        // console.log(`ID DEL ROL A ELIMINAR ${id}`);

        const roleGroup = await RolModel.deleteRole({ id });
        res.status(200).json({
            message: 'Role eliminado correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: `Error al eliminar role 123 ${error}`
        });
    }
}

module.exports = { createSSOGroup, getAllSSOGroup, addRol, allRoles, editRole, deleteRole };