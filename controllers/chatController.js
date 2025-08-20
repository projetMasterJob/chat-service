const pool = require('../db/connection');
const { v4: uuidv4 } = require('uuid');

// ─────────── Récupérer la liste des chats ───────────
async function getListeChat(req, res) {
  const { user_id } = req.params;
  try {
    const { rows } = await pool.query(
      'SELECT * FROM chats WHERE user_id = $1',
      [user_id]
    );
    res.json(rows);
  } catch (error) {
    console.error('Erreur getListeChat :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

// ─────────── Ajouter un chat à la liste ───────────
async function postAddListeChat(req, res) {
  const { user_id, company_id } = req.body;
  try {
    const id = uuidv4();
    const { rows } = await pool.query(
      'INSERT INTO chats (id, user_id, company_id, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [id, user_id, company_id]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur postAddListeChat :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

// ─────────── Lire les messages d’un chat ───────────
async function getMessages(req, res) {
  const { chat_id } = req.params;
  try {
    const { rows } = await pool.query(
      'SELECT * FROM messages WHERE chat_id = $1 ORDER BY sent_at ASC',
      [chat_id]
    );
    res.json(rows);
  } catch (error) {
    console.error('Erreur getMessages :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

// ─────────── Envoyer un message ───────────
async function sendMessage(req, res) {
  const { chat_id, sender_id, content } = req.body;
  try {
    const id = uuidv4();
    const { rows } = await pool.query(
      'INSERT INTO messages (id, chat_id, sender_id, content, sent_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [id, chat_id, sender_id, content]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur sendMessage :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

// ─────────── Supprimer un chat de la liste ───────────
async function delItemListMessage(req, res) {
  const { chat_id } = req.params;
  try {
    const { rowCount } = await pool.query(
      'DELETE FROM chats WHERE id = $1',
      [chat_id]
    );
    if (!rowCount) return res.status(404).json({ error: 'Item introuvable' });
    res.json({ message: 'Item supprimé' });
  } catch (error) {
    console.error('Erreur delItemListMessage :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

// ─────────── Supprimer un message ───────────
async function delMessage(req, res) {
  const { message_id } = req.params;
  try {
    const { rowCount } = await pool.query(
      'DELETE FROM messages WHERE id = $1',
      [message_id]
    );
    if (!rowCount) return res.status(404).json({ error: 'Message introuvable' });
    res.json({ message: 'Message supprimé' });
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
