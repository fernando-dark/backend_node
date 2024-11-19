const Admin = require('../models/AdminModel');

const getAdminPanel = async (req, res) => {

    const divisions = [
        { id: '0001', name: 'Liverpool Centro' },
        { id: '0002', name: 'Liverpool Insurgentes' },
        { id: '0003', name: 'Liverpool Polanco' },
    ];

    const functions = [
        { id: '815', name: 'Vendedor Optica' },
    ];

    res.render('admin/admin', { divisions, functions });
};

module.exports = { getAdminPanel };