const dotenv   = require('dotenv');
dotenv.config();

const express  = require('express');
const sequelize = require('./db/sequelize');
require('./models');          // charge les modèles

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API chat-service is running ✅');
});

const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);



module.exports = app;
