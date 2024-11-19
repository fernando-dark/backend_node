// src/database.js
const { Pool } = require('pg');
require('dotenv').config();

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.pool = new Pool({
      user: "postgresliver",
      host: "database-liverpool.cz0es6muycoi.us-east-2.rds.amazonaws.com",
      database: "liverpool",
      password: "_j7%L%r078a5",
      port: 5432,
      ssl: { rejectUnauthorized: false },
    });

    Database.instance = this;
  }

  async query(text, params) {
    try {
      const res = await this.pool.query(text, params);
      return res;
    } catch (err) {
      console.error('Database query error:', err);
      throw err;
    }
  }

  async close() {
    await this.pool.end();
  }
}

module.exports = new Database();
