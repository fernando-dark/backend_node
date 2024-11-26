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

        try {
            const result = await pool.query(
                `DELETE FROM groupapp WHERE groupid = $1 RETURNING *`,
                [id]
            );

            if (result.rows.length === 0) {
                return;
            }

            return new GroupAppModel(result.rows[0]);

        } catch (error) {
            console.log(error);
            throw error
        }


    }

}

module.exports = GroupAppModel;