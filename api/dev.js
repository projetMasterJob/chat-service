const app = require('./index');
const express = require('express');

const PORT = process.env.PORT || 3000;

express()
  .use(app)
  .listen(PORT, () => {
    console.log(`[✅] Serveur local démarré sur http://localhost:${PORT}`);
  });
