import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import './models'; // Initialiser les modèles


const app = express();

const chatRoutes = require('./routes/chatRoutes');

app.use(express.json());
app.use('/api/chat', chatRoutes);

// app.get('/', async (req, res) => {
//     try {
//       await sequelize.authenticate();
//       res.json({
//         message: 'Connexion réussie à la base de données !',
//         time: new Date().toISOString(),
//       });
//     } catch (error) {
//       console.error('Erreur de connexion à la base de données :', error);
//       res.status(500).json({ error: 'Connexion échouée.' });
//     }
//   });

// app.listen(port, () => {
//   console.log(`Chat service listening at http://localhost:${port}`);
// });


module.exports = app;