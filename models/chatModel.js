module.exports = (Sequelize, DataTypes) => {
  const Chat = Sequelize.define('Chat', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    chat_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sender_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sent_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'messages',
    timestamps: false,
  });

  return Chat;
};
