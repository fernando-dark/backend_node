
const pool = require('../database/db');

const AppModel = require('../models/AppModel');
const TagModel = require('../models/TagModel');
const AppTagModel = require('../models/AppTagModel');
const ResponsibleModel = require('../models/ResponsibleModel');
const AppResponsibleModel = require('../models/AppResponsibleModel');
const GroupAppModel = require('../models/GroupAppModel');

const getAllApps = async (req, res) => {
    try {

        const apps = await AppModel.findAll();
        res.status(200).json({
            apps: apps
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error to retrieve Apps'
        });
    }
};

const createApp = async (req, res) => {

    const client = await pool.connect();
    try {

        await client.query('BEGIN');
        const { name, description, accessMethod, accessPoint, imageUrl, status, tags, responsibles, bussines } = req.body;


        const newApp = await AppModel.createApp({
            name,
            description,
            accessMethod,
            accessPoint,
            imageUrl,
            status,
            lastUsed: new Date(),
            bussines
        });


        const tagIds = [];
        for (const tagName of tags) {
            const newTag = await TagModel.createTag({ name: tagName.name });
            tagIds.push(newTag.id);
        }

        for (const tagId of tagIds) {
            await AppTagModel.createAppTag({ appid: newApp.id, tagid: tagId });
        }

        const responsibleId = [];
        for (const responsible of responsibles) {
            const newResponsible = await ResponsibleModel.responsibleExist({ email: responsible.email });
            if (newResponsible) {
                responsibleId.push(newResponsible);
            } else {
                const newResponsible = await ResponsibleModel.createResponsible({ email: responsible.email, name: responsible.name });
                responsibleId.push(newResponsible.id);
            }

        }

        for (const appResposnible of responsibleId) {
            await AppResponsibleModel.createAppResponsible({ appid: newApp.id, responsibleid: appResposnible });
        }

        await client.query('COMMIT');

        res.status(201).json({
            message: 'App creada exitosamente',
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error al crear la app:', error);
        res.status(500).json({ error: 'Error al crear la app' });
    } finally {
        client.release();
    }

};


const checkResponsible = async (req, res) => {
    try {

        const { email } = req.body;

        const newResponsible = await ResponsibleModel.responsibleExist({ email: email });
        res.status(200).json({
            newResponsible: newResponsible
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error to retrieve Responsible'
        });
    }

};

const addFavApp = async (req, res) => {
    try {

        const { appId, userId } = req.body;

        const appFav = await AppModel.addFavApp({ appId, userId });
        res.status(200).json({
            appFav: appFav
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error to add FavApp'
        });
    }
};


const getFavApps = async (req, res) => {
    try {

        const { userId } = req.body;

        const appFav = await AppModel.getFavApps({ userId });
        res.status(200).json({
            apps: appFav
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error to get FavApps'
        });
    }
}


const addGroupApp = async (req, res) => {
    try {
        const { appid, groupid, creationdate } = req.body;

        const addApp = await GroupAppModel.add({ appid, groupid, creationdate });
        res.status(201).json({
            addGroupApp: addApp
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: `Error al agregar app al grupo ${error}`
        });
    }
}


const updateApp = async (req, res) => {

    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        const { name, description, accessMethod, accessPoint, imageUrl, status, tags, responsibles, bussines } = req.body;

        const addApp = await AppModel.updateApp({
            name,
            description,
            accessMethod,
            accessPoint,
            imageUrl,
            status,
            lastUsed: new Date(),
            bussines
        });


        await client.query('COMMIT');

        res.status(201).json({
            addGroupApp: addApp
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: `Error al actualizar app ${error}`
        });
    }
}

const getAppsByGroup = async (req, res) => {
    try {

        const { group } = req.body;

        const appsByGroup = await AppModel.appsByGroup({ group });
        res.status(200).json({
            apps: appsByGroup
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error to get appsByGroup'
        });
    }
}
module.exports = { getAllApps, createApp, checkResponsible, addFavApp, getFavApps, addGroupApp, updateApp, getAppsByGroup };