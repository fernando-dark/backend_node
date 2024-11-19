const pool = require('../database/db');

class GroupAppModel {
    constructor({ appid, groupid, creationdate }) {
        this.appid = appid;
        this.groupid = groupid;
        this.creationdate = creationdate;
    }

    static async add({ appid, groupid, creationdate }) {

        const result = await pool.query(
            `INSERT INTO groupapp (appid, groupid, creationdate) VALUES ($1, $2, $3) RETURNING *`,
            [appid, groupid, creationdate]
        );

        return new GroupAppModel(result.rows[0]);
    }

    static async delete({ id }) {
        const result = await pool.query(
            `DELETE FROM groupapp WHERE groupid = $1 RETURNING *`,
            [id]
        );
        return new GroupAppModel(result.rows[0]);
    }

}

module.exports = GroupAppModel;