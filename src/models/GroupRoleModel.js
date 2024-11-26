const pool = require('../database/db');

class GroupRoleModel {

    constructor({ id, idgroup, idrole }) {
        this.id = id;
        this.idgroup = idgroup;
        this.idrole = idrole;
    }

    static async add({ idgroup, idrole }) {

        const result = await pool.query(
            `INSERT INTO grouprole (idgroup, idrole) VALUES ($1, $2) RETURNING *`,
            [idgroup, idrole]
        );

        return new GroupRoleModel(result.rows[0]);
    }

    static async delete({ id }) {

        try {

            const result = await pool.query(
                `DELETE FROM grouprole WHERE idgroup = $1 RETURNING *`,
                [id]
            );

            if (result.rows.length === 0) {
                return;
            }

            return new GroupRoleModel(result.rows[0]);

        } catch (error) {
            throw error;
        }

    }

    static async roleExist({ name }) {
        const result = await pool.query('SELECT * FROM role where name = $1', [name]);
        if (result.rows.length > 0) {
            return result.rows[0].id;
        }
        return result.rows[0];
    }

}

module.exports = GroupRoleModel;