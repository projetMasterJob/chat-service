const { Pool } = require('pg');
require('dotenv').config();




const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

console.log('[INFO] Tentative de connexion à PostgreSQL...');

module.exports = pool;
