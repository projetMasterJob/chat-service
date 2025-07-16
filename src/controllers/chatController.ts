import { Request, Response } from 'express';
import { ListChat } from '../models';

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


// A prevoir suppression de la liste de chat



