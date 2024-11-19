const pool = require('../database/db');

class AppResponsibleModel {

    constructor({ id, appid, responsibleid }) {
        this.id = id;
        this.appid = appid;
        this.responsibleid = responsibleid;
    }

    static async createAppResponsible({ appid, responsibleid }) {

        const result = await pool.query(
            `INSERT INTO appresponsible (appid, responsibleid) VALUES ($1, $2) RETURNING *`,
            [appid, responsibleid]
        );

        return new AppResponsibleModel(result.rows[0]);
    }

    static async getAllAppResponsible() {
        const result = await pool.query(`SELECT * FROM appresponsible`);
        return result.rows.map(row => new AppResponsibleModel(row));
    }
}

module.exports = AppResponsibleModel;