const express = require('express');
const {
  getListeChat,
  postAddListeChat,
  getMessages,
  sendMessage,
  delItemListMessage,
  delMessage,
} = require('../controllers/chatController');

const router = express.Router();

router.get('/list/:user_id', getListeChat);
router.post('/list',        postAddListeChat);
router.get('/:chat_id',     getMessages);
router.post('/',            sendMessage);
router.delete('/list/:chat_id', delItemListMessage);
router.delete('/:message_id',   delMessage);

module.exports = router;
