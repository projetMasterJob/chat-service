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

export const postAddListeChat = async (req: Request, res: Response) => {
  const { user_id, company_id } = req.body;

  try {
    const messages = await ListChat.create({ user_id, company_id });

    res.json(messages);
  } catch (error) {
    console.error('Erreur lors de l\'ajout à la liste de message :', error);
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
    const messages = await Chat.create({ chat_id, sender_id, content });

    res.json(messages);
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

export const delItemListMessage = async (req: Request, res: Response) => {
  const  id  = req.params.chat_id;

  try {
    const deletedCount = await ListChat.destroy({
      where: { id },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Aucun item trouvé à supprimer' });
    }

    res.json({ message: 'Item supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du chat :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

export const delMessage = async (req: Request, res: Response) => {
  const  id  = req.params.message_id;

  try {
    const deletedCount = await Chat.destroy({
      where: { id },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Le message à supprimer, n\'est pas trouvé' });
    }

    res.json({ message: 'Message supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du message :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};



// A prevoir suppression d'un item de la liste de chat -> supprimer tout les chats?
// A prevoir suppression d'un chat


