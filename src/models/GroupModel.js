const pool = require('../database/db');
class GroupModel {
    //     apps=# select * from "Group";
    //  id | name | description | creationdate | lastupdate | lastupdateuser | status 
    // ----+------+-------------+--------------+------------+----------------+--------
    constructor({ id, name, description, creationdate, lastupdate, lastupdateuser, status }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.creationdate = creationdate;
        this.lastupdate = lastupdate;
        this.lastupdateuser = lastupdateuser;
        this.status = status;
    }


    static async createGroup({ name, description, creationdate, lastupdate, lastupdateuser, status }) {


        const result = await pool.query(
            `INSERT INTO "Group" (name, description, creationdate, lastupdate, lastupdateuser, status ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, description, creationdate, lastupdate, lastupdateuser, 1/* TODO: check this status*/]
        );

        return new GroupModel(result.rows[0]);
    }

    static async getAllGroups() {
        const result = await pool.query(`SELECT * FROM "Group"`);
        return result.rows.map(row => new GroupModel(row));
    }


    static async asignGrouApp({ appid, groupid }) {
        const creationdate = new Date();
        const result = await pool.query(
            `INSERT INTO groupapp ( appid, groupid, creationdate ) VALUES ($1, $2, $3) RETURNING *`,
            [appid, groupid, creationdate]
        );

        console.log(result.rows[0]);
        return new GroupModel(result.rows[0]);

    }


    static async deleteGroup({ id }) {
        const result = await pool.query(
            `DELETE FROM "Group" WHERE id = $1 RETURNING *`,
            [id]
        );
        return new GroupModel(result.rows[0]);
    }
}

module.exports = GroupModel;