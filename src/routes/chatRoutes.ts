const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');



router.get('/:user_id/listes-messages', chatController.getListeChat);
router.get('/get-messages/:chat_id', chatController.getMessages);
router.post('/send-message', chatController.sendMessage);
// router.get('/reponse-message', chatController.getReponseMessage);

  


module.exports = router;