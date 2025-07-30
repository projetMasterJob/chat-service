const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const chatRoutes = require('../routes/chatRoutes');
const pool = require('../db/connection');

const app = express();

app.use(cors());
app.use(express.json());

console.log('[INFO] Serveur Express lancé...');


app.get('/', (req, res) => {
  res.send('Hello depuis Express sans Sequelize sur Vercel !');
});

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await require('../db/connection').query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur test-db :', error);
    res.status(500).json({ error: 'DB error', details: error.message });
  }
});


app.use('/api/chat', chatRoutes);


module.exports = app;
//module.exports = serverless(app);
