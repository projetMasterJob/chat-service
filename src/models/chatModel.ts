module.exports = (Sequelize: any, DataTypes: any) => {
    const Chat = Sequelize.define('Chat', {
      id: { type: DataTypes.UUIDV4, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      chat_id: { type: DataTypes.UUIDV4, allowNull: false },
      sender_id: { type: DataTypes.UUIDV4, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      sent_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, {
      tableName: 'messages',
      timestamps: false,
    });
  
    return Chat;
  };