const Alert = require('../models/AlertModel');

const getAllAlerts = async (req, res) => {
    try {
        const alerts = await Alert.getAllAlerts();
        res.status(200).json(alerts);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: 'Error to retrieve alerts'
        });
    }
};

module.exports = { getAllAlerts };