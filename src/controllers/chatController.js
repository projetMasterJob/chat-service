// const { Chat, ListChat } = require('../models');

// ─────────── Récupérer la liste des chats ───────────
async function getListeChat(req, res) {
  console.log('[GET] /list/:user_id', req.params.user_id);
  const { user_id } = req.params;
  
  try {
    // Pour le moment, on retourne des données mockées
    // Une fois la DB configurée, décommentez le code Sequelize
    const mockData = [
      { id: 1, user_id: user_id, company_id: 456, created_at: new Date() },
      { id: 2, user_id: user_id, company_id: 789, created_at: new Date() }
    ];
    
    res.json(mockData);
    
    // const messages = await ListChat.findAll({ where: { user_id } });
    // res.json(messages);
  } catch (error) {
    console.error('Erreur getListeChat :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

// ─────────── Ajouter un chat à la liste ───────────
async function postAddListeChat(req, res) {
  const { user_id, company_id } = req.body;
  try {
    // Mock data pour le développement
    const item = { 
      id: Date.now(), 
      user_id, 
      company_id, 
      created_at: new Date() 
    };
    res.json(item);
    
    // const item = await ListChat.create({ user_id, company_id });
    // res.json(item);
  } catch (error) {
    console.error('Erreur postAddListeChat :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

// ─────────── Lire les messages d’un chat ───────────
async function getMessages(req, res) {
  const { chat_id } = req.params;
  try {
    // Mock data pour le développement
    const messages = [
      { id: 1, chat_id, sender_id: 'user1', content: 'Hello!', sent_at: new Date() },
      { id: 2, chat_id, sender_id: 'user2', content: 'Hi there!', sent_at: new Date() }
    ];
    res.json(messages);
    
    // const messages = await Chat.findAll({ where: { chat_id } });
    // res.json(messages);
  } catch (error) {
    console.error('Erreur getMessages :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

// ─────────── Envoyer un message ───────────
async function sendMessage(req, res) {
  const { chat_id, sender_id, content } = req.body;
  try {
    // Mock data pour le développement
    const message = { 
      id: Date.now(), 
      chat_id, 
      sender_id, 
      content, 
      sent_at: new Date() 
    };
    res.json(message);
    // const message = await Chat.create({ chat_id, sender_id, content });
    // res.json(message);
  } catch (error) {
    console.error('Erreur sendMessage :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

// ─────────── Supprimer un chat de la liste ───────────
async function delItemListMessage(req, res) {
  const { chat_id: id } = req.params;
  try {
    // Mock response pour le développement
    res.json({ message: 'Item supprimé' });
    
    // const deleted = await ListChat.destroy({ where: { id } });
    // if (!deleted) return res.status(404).json({ error: 'Item introuvable' });
    // res.json({ message: 'Item supprimé' });
  } catch (error) {
    console.error('Erreur delItemListMessage :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

// ─────────── Supprimer un message ───────────
async function delMessage(req, res) {
  const { message_id: id } = req.params;
  try {
    // Mock response pour le développement
    res.json({ message: 'Message supprimé' });
    
    // const deleted = await Chat.destroy({ where: { id } });
    // if (!deleted) return res.status(404).json({ error: 'Message introuvable' });
    // res.json({ message: 'Message supprimé' });
  } catch (error) {
    console.error('Erreur delMessage :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

module.exports = {
  getListeChat,
  postAddListeChat,
  getMessages,
  sendMessage,
  delItemListMessage,
  delMessage,
};
