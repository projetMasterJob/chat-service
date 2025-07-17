import { Request, Response } from 'express';
import { Chat, ListChat } from '../models';

export const getListeChat = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  try {
    const messages = await ListChat.findAll({
      where: { user_id },
    });

    res.json(messages);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { chat_id } = req.params;

  try {
    const messages = await Chat.findAll({
      where: { chat_id },
    });

    res.json(messages);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  const { chat_id, sender_id, content } = req.body;

  try {
    const message = await Chat.create({ chat_id, sender_id, content });

    res.json(message);
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};



// A prevoir suppression de la liste de chat
// A prevoir suppression de la d'un chat ??


