const AppTagModel = require('../models/AppTagModel');

const getAllAppTags = async (req, res) => {
    try {

        const tags = await AppTagModel.getAllAppTags();
        res.status(200).json({
            appTags: tags
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error to retrieve Tags'
        });
    }
};

const createAppTag = async (req, res) => {
    try {
        const { appid, tagid } = req.body;

        console.log(appid);
        console.log(tagid);


        const appTag = await AppTagModel.createAppTag({ appid, tagid });

        res.status(201).json({
            appTag: appTag
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al crear appTag'
        });

    }
};

module.exports = { getAllAppTags, createAppTag };