import sequelize from '../db/sequelize';
import { DataTypes } from 'sequelize';
const listChatModel = require('./listChatModel');
const chatModel = require('./chatModel');

// Initialiser les modèles
const ListChat = listChatModel(sequelize, DataTypes);
const Chat = chatModel(sequelize, DataTypes);

// Synchroniser avec la base de données
//sequelize.sync({ alter: true });

export { ListChat, Chat }; 