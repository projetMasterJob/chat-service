const sequelize = require('../db/sequelize');
const { DataTypes } = require('sequelize');

const Chat = require('./chatModel')(sequelize, DataTypes);
const ListChat = require('./listChatModel')(sequelize, DataTypes);

// Tu peux ajouter d'autres associations ici si besoin

module.exports = {
  sequelize,
  Chat,
  ListChat,
};
