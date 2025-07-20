const app = require('./src/app');
const dotenv = require('dotenv');
dotenv.config();

const db = require('./src/db/connection');


db.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });