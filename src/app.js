const dotenv   = require('dotenv');
dotenv.config();

const express  = require('express');
// const sequelize = require('./db/sequelize');
// require('./models');          // charge les modèles

const app = express();
app.use(express.json());

// Middleware pour les CORS si nécessaire
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send('API chat-service is running ✅');
});

app.get('/api', (req, res) => {
  res.json({ message: 'Chat API is working', timestamp: new Date().toISOString() });
});

const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);

// Gestion des erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
