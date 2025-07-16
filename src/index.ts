import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import pool from '../src/db/connection';


const app = express();
const port = 3001;

app.use(express.json());

app.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT NOW()'); // Test simple
      res.json({
        message: 'Connexion réussie à la base de données !',
        time: result.rows[0].now,
      });
    } catch (error) {
      console.error('Erreur de connexion à la base de données :', error);
      res.status(500).json({ error: 'Connexion échouée.' });
    }
  });

app.listen(port, () => {
  console.log(`Chat service listening at http://localhost:${port}`);
});
