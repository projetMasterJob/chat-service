const dotenv = require('dotenv');
dotenv.config();

import app from './src/app';

const db = require('./src/db/connection.ts');


db.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err: unknown) => {
    console.error('Database connection error:', err);
  });