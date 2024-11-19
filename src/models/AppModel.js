const pool = require('../database/db');


class AppModel {
    constructor({ id, name, description, accessmethod, accesspoint, imageurl, status, lastused, tags = [], responsibles = [], bussines = [], group = null, roles = [] }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.accessmethod = accessmethod;
        this.accesspoint = accesspoint;
        this.imageurl = imageurl;
        this.status = status;
        this.lastused = lastused;
        this.tags = tags;
        this.responsibles = responsibles;
        this.bussines = bussines;
        this.group = group;
        this.roles = roles;

    }

    static async createApp({ name, description, accessMethod, accessPoint, imageUrl, status, bussines }) {
        const result = await pool.query(
            `INSERT INTO App (name, description, accessMethod, accessPoint, imageUrl, status, lastUsed, bussines) 
            VALUES ($1, $2, $3, $4, $5, $6, NOW(),$7)
             RETURNING *`,
            [name, description, accessMethod, accessPoint, imageUrl, status, bussines]
        );
        return new AppModel(result.rows[0]);
    }

    static async updateApp({ name, description, accessMethod, accessPoint, imageUrl, status, bussines, id }) {
        const updateResult = await pool.query(
            `UPDATE App 
             SET name = $1, description = $2, accessMethod = $3, accessPoint = $4, 
                 imageUrl = $5, status = $6, lastUsed = NOW(), bussines = $8 
             WHERE id = $9 
             RETURNING *`,
            [name, description, accessMethod, accessPoint, imageUrl, status, bussines, id]
        );
        return new AppModel(updateResult.rows[0]);
    }

    static async findAll() {
        // const result = await pool.query(`SELECT * FROM app`);
        // return result.rows.map(row => new AppModel(row));

        // const result = await pool.query(`
        //     SELECT 
        //         app.*, 
        //         json_agg(DISTINCT tag.*) AS tags,
        //         json_agg(DISTINCT responsible.*) AS responsibles,
        //         role.groupsso AS group,
        //         json_agg(DISTINCT role.*) AS roles
        //     FROM 
        //         app
        //     LEFT JOIN apptag ON app.id = apptag.appid
        //     LEFT JOIN tag ON apptag.tagid = tag.id
        //     LEFT JOIN appresponsible ON app.id = appresponsible.appid
        //     LEFT JOIN responsible ON appresponsible.responsibleid = responsible.id
        //     JOIN GroupApp ON app.id = GroupApp.appid
        //     JOIN GroupRole ON GroupApp.groupid = GroupRole.idgroup
        //     JOIN Role ON GroupRole.idrole = Role.id
        //     GROUP BY app.id, role.groupsso;
        // `);

        const result = await pool.query(`
        SELECT 
            app.*, 
            json_agg(DISTINCT tag.*) AS tags,
            json_agg(DISTINCT responsible.*) AS responsibles,
            role.groupsso AS group,
            json_agg(DISTINCT role.*) AS roles
        FROM 
            app
        LEFT JOIN apptag ON app.id = apptag.appid
        LEFT JOIN tag ON apptag.tagid = tag.id
        LEFT JOIN appresponsible ON app.id = appresponsible.appid
        LEFT JOIN responsible ON appresponsible.responsibleid = responsible.id
        LEFT JOIN GroupApp ON app.id = GroupApp.appid
        LEFT JOIN GroupRole ON GroupApp.groupid = GroupRole.idgroup
        LEFT JOIN Role ON GroupRole.idrole = Role.id
        GROUP BY app.id, role.groupsso;
        `);



        //     const result = await pool.query(`
        //     SELECT 
        //         app.*, 
        //         json_agg(DISTINCT tag.*) AS tags,
        //         json_agg(DISTINCT responsible.*) AS responsibles
        //     FROM 
        //         app
        //     LEFT JOIN apptag ON app.id = apptag.appid
        //     LEFT JOIN tag ON apptag.tagid = tag.id
        //     LEFT JOIN appresponsible ON app.id = appresponsible.appid
        //     LEFT JOIN responsible ON appresponsible.responsibleid = responsible.id
        //     GROUP BY app.id
        // `);
        return result.rows.map(row => new AppModel({
            ...row,
            tags: row.tags.filter(tag => tag !== null),
            responsibles: row.responsibles.filter(responsible => responsible !== null)
        }));
    }


    static async addFavApp({ appId, userId }) {
        const result = await pool.query(
            `INSERT INTO FavApps (appid, userid, lastused) VALUES ($1, $2, $3) RETURNING id`,
            [appId, userId, new Date()]
        );
        return new AppModel(result.rows[0]);
    }


    static async getFavApps({ userId }) {
        const result = await pool.query(`
            SELECT 
            app.*, 
            json_agg(DISTINCT tag.*) AS tags,
            json_agg(DISTINCT responsible.*) AS responsibles,
            fav.lastUsed
        FROM 
            app
        LEFT JOIN apptag ON app.id = apptag.appid
        LEFT JOIN tag ON apptag.tagid = tag.id
        LEFT JOIN appresponsible ON app.id = appresponsible.appid
        LEFT JOIN responsible ON appresponsible.responsibleid = responsible.id
        LEFT JOIN (
            SELECT DISTINCT ON (appId) appId, lastUsed
            FROM FavApps
            WHERE userId = $1
            ORDER BY appId, lastUsed DESC
        ) fav ON app.id = fav.appId
        WHERE 
            app.id IN (SELECT appId FROM FavApps WHERE userId = $1)
        GROUP BY app.id, fav.lastUsed
        ORDER BY fav.lastUsed DESC
        LIMIT 6;
        `, [userId]);
        return result.rows.map(row => new AppModel({
            ...row,
            tags: row.tags.filter(tag => tag !== null),
            responsibles: row.responsibles.filter(responsible => responsible !== null)
        }));
    }

    static async appExist({ name }) {
        const result = await pool.query('SELECT * FROM App where name = $1', [name]);
        if (result.rows.length > 0) {
            return result.rows[0].id;
        }
        return result.rows[0];
    }


    static async appsByGroup({ group }) {
        const result = await pool.query(`
            SELECT 
                app.*, 
                json_agg(DISTINCT tag.*) AS tags,
                json_agg(DISTINCT responsible.*) AS responsibles
            FROM 
                app
            LEFT JOIN apptag ON app.id = apptag.appid
            LEFT JOIN tag ON apptag.tagid = tag.id
            LEFT JOIN appresponsible ON app.id = appresponsible.appid
            LEFT JOIN responsible ON appresponsible.responsibleid = responsible.id
            WHERE 
                app.id IN (
                    SELECT appid 
                    FROM GroupApp
                    WHERE groupid = (
                        SELECT idgroup 
                        FROM GroupRole
                        WHERE idrole = (
                            SELECT id 
                            FROM Role
                            WHERE groupsso @> ARRAY[$1]::VARCHAR[]
                        )
                    )
                )
            GROUP BY app.id;`, [group]);
        return result.rows.map(row => new AppModel({
            ...row,
            tags: row.tags.filter(tag => tag !== null),
            responsibles: row.responsibles.filter(responsible => responsible !== null)
        }));
    }


}


module.exports = AppModel;