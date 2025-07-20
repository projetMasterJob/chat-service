const dotenv   = require('dotenv');
dotenv.config();

const express  = require('express');
const sequelize = require('./db/sequelize');
require('./models');          // charge les modèles

const app = express();
app.use(express.json());

const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);



module.exports = app;
