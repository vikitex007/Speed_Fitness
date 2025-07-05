

const express = require('express');
const router = express.Router();
const messageController = require('../controller/messageController');

// ✅ Route to get chat history with a trainer
router.get('/:trainerId', messageController.getMessages);

// ✅ Route to send a message to a trainer
router.post('/:trainerId', messageController.sendMessage);

module.exports = router;

