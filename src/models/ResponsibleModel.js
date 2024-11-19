const pool = require('../database/db');

class ResponsibleModel {

    constructor({ id, name, email }) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    static async createResponsible({ name, email }) {

        const result = await pool.query(
            `INSERT INTO responsible (name, email) VALUES ($1, $2) RETURNING *`,
            [name, email]
        );

        return new ResponsibleModel(result.rows[0]);
    }

    static async getAllResponsible() {
        const result = await pool.query(`SELECT * FROM responsible`);
        return result.rows.map(row => new ResponsibleModel(row));
    }

    static async responsibleExist({ email }) {
        const result = await pool.query('SELECT * FROM responsible where email = $1', [email]);
        if (result.rows.length > 0) {
            return result.rows[0].id;
        }
        return result.rows[0];
    }
}

module.exports = ResponsibleModel;