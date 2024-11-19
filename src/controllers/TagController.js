

const TagModel = require('../models/TagModel');

const getAllTags = async (req, res) => {
    try {

        const tags = await TagModel.getAllTags();
        res.status(200).json({
            tags: tags
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error to retrieve Tags'
        });
    }
};

const createTag = async (req, res) => {
    try {
        const { name, isBusiness } = req.body;

        const tag = await TagModel.createTag({ name, isBusiness });

        res.status(201).json({
            tag: tag
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al crear tag'
        });

    }
};

module.exports = { getAllTags, createTag };