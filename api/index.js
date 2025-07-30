const express = require('express');
const serverless = require('serverless-http');
const chatRoutes = require('../routes/chatRoutes');

const app = express();

const cors = require('cors');
app.use(cors());

// Middleware pour lire le JSON
app.use(express.json());

// Route principale pour affichage "page d'acceuil"
app.get('/', (req, res) => {
  res.send('Hello depuis Express sur Vercel !');
});
// Préfixe les routes avec /api/chat
app.use('/api/chat', chatRoutes);

// Export pour Vercel
module.exports.handler = serverless(app);
