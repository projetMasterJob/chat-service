import app from '../dist/app';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Lancer Express en tant que handler Serverless
  app(req, res);
}