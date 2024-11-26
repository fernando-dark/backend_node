
const pool = require('../database/db');

class RolModel {

    constructor({ id, name, groupsso, location, func, section, personalarea, personalgroup, salarygrade, payrolltype, society, sso_name }) {
        this.id = id;
        this.name = name;
        this.groupsso = groupsso;
        this.sso_name = sso_name;
        this.location = location;
        this.func = func;
        this.section = section;
        this.personalarea = personalarea;
        this.personalgroup = personalgroup;
        this.salarygrade = salarygrade;
        this.payrolltype = payrolltype;
        this.society = society;
    }

    static async getAllRolls() {
        // const result = await pool.query(`SELECT * FROM Role`);
        const result = await pool.query(
            `SELECT 
                Role.*, 
                (SELECT groupsso.groupsso 
                FROM groupsso 
                WHERE groupsso.id = 4) AS sso_name
            FROM Role;`
        );
        return result.rows.map(row => new RolModel(row));
    }


    static async addRole({ name, groupsso, location, func, section, personalarea, personalgroup, salarygrade, payrolltype, society }) {
        const result = await pool.query(
            `INSERT INTO Role (name, groupsso, location, func, section, personalarea, personalgroup, salarygrade, payrolltype, society) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [name, groupsso, location, func, section, personalarea, personalgroup, salarygrade, payrolltype, society]
        );

        return new RolModel(result.rows[0]);
    }


    // TODO: Verificar si se mueve o no
    static async createSSOGroup({ groupsso }) {
        const result = await pool.query(
            `INSERT INTO groupsso (groupsso) VALUES ($1) RETURNING *`,
            [groupsso]
        );
        return new RolModel(result);
    }

    // TODO: Verificar si se mueve o no
    static async getAllGroupSSO() {
        const result = await pool.query(`SELECT * FROM groupsso`);
        return result.rows.map(row => new RolModel(row));
    }



    static async editRole({ name, groupsso, func, id }) {
        const updateRole = await pool.query(
            `UPDATE role SET name = $1, groupsso = $2, func = $3
            WHERE id = $4 RETURNING *`,
            [name, groupsso, func, id]
        );

        return new RolModel(updateRole.rows[0]);
    }

    static async deleteRole({ id }) {

        try {
            const deleteRole = await pool.query(
                `DELETE FROM role WHERE id = $1 RETURNING *`,
                [id]
            );

            if (deleteRole.rows.length === 0) {
                throw new Error(`No se encontró un rol con el ID ${id}`);
            }

            return new RolModel(deleteRole.rows[0]);
        } catch (error) {
            throw error;
        }

    }

}

module.exports = RolModel;