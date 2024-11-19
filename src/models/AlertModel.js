const pool = require('../database/db');

class AlertModel {
    static async createAlert(data) {
        const {
            priority,
            message,
            useExpiration,
            startDate,
            endDate,
            useRoles
        } = data;

        try {
            const result = await pool.query(
                ```INSERT INTO Alert 
                (priority, message, useExpiration, startDate, endDate, useRoles) 
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING id```,
                [priority, message, useExpiration, startDate, endDate, useRoles]
            );
            return result.rows[0].id;
        } catch (err) {
            throw new Error('Error creating alert: ' + err.message);
        }
    }

    static async addRolesToAlert(alertId, roleIds) {
        try {
            for (const roleId of roleIds) {
                await pool.query(
                    'INSERT INTO AlertRole (alertId, roleId) VALUES ($1, $2)',
                    [alertId, roleId]
                );
            }
        } catch (err) {
            throw new Error('Error adding roles to alert: ' + err.message);
        }
    }

    static async getAllAlerts() {
        try {
            const result = await pool.query('SELECT * FROM Alert');
            return result.rows;
        } catch (err) {
            throw new Error('Error fetching alerts: ' + err.message);
        }
    }
}

module.exports = AlertModel;
