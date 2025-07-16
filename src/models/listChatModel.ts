module.exports = (Sequelize: any, DataTypes: any) => {
    const listChat = Sequelize.define('listChat', {
      id: { type: DataTypes.UUIDV4, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      user_id: { type: DataTypes.UUIDV4, allowNull: false },
      company_id: { type: DataTypes.UUIDV4, allowNull: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, {
      tableName: 'chats',
      timestamps: false,
    });
  
    return listChat;
  };