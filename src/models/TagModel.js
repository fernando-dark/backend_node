const pool = require('../database/db');

class TagModel {

    constructor({ id, name }) {
        this.id = id;
        this.name = name;
        // this.isBusiness = isbusiness;
    }

    static async createTag({ name }) {
        console.log(name);
        // console.log(isBusiness);


        const result = await pool.query(
            `INSERT INTO tag (name) VALUES ($1) RETURNING *`,
            [name]
        );

        return new TagModel(result.rows[0]);
    }

    static async getAllTags() {
        const result = await pool.query(`SELECT * FROM tag`);
        return result.rows.map(row => new TagModel(row));
    }
}

module.exports = TagModel;