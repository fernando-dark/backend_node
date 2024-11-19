class AdminModel {
    constructor() {
    }

    static async getAllAlerts() {
        try {
            const result = await pool.query('SELECT * FROM users');
            return result.rows;
        } catch (err) {
            throw new Error('Error fetching alerts: ' + err.message);
        }
    }

}

module.exports = { AdminModel }

