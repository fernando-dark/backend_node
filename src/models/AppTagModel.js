const pool = require('../database/db');
class AppTagModel {
    constructor({ appid, tagid }) {
        this.appid = appid;
        this.tagid = tagid;
    }

    static async createAppTag({ appid, tagid }) {

        console.log(` MODEL ${appid} + ${tagid}`);

        const result = await pool.query(
            `INSERT INTO apptag (appid, tagid) VALUES ($1, $2) RETURNING *`,
            [appid, tagid]
        );

        return new AppTagModel(result.rows[0]);
    }

    static async getAllAppTags() {
        const result = await pool.query(`SELECT * FROM apptag`);
        return result.rows.map(row => new AppTagModel(row));
    }

}

module.exports = AppTagModel;