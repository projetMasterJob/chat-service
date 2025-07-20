const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');



router.get('/:user_id/listes-messages', chatController.getListeChat);
router.post('/add-listes-messages', chatController.postAddListeChat);
router.get('/get-messages/:chat_id', chatController.getMessages);
router.post('/send-message', chatController.sendMessage);

router.delete('/del-item-list-message/:chat_id', chatController.delItemListMessage);
router.delete('/del-message/:message_id', chatController.delMessage);


module.exports = router;