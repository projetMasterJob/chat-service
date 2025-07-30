const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const chatRoutes = require('../routes/chatRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello depuis Express sans Sequelize sur Vercel !');
});

app.use('/api/chat', chatRoutes);

// 🔴 La ligne incorrecte qui provoque l’erreur :
// module.exports.handler = serverless(app);

// ✅ La bonne ligne :
module.exports = serverless(app);
