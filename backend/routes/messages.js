const express = require("express");
const router = express.Router();
const messageController = require("../controller/messageController");
const { auth } = require("../middleware/auth");

// ✅ Route to get all conversations for a trainer
router.get(
  "/trainer/conversations",
  auth,
  messageController.getTrainerConversations
);

// ✅ Route to get chat history with a trainer
router.get("/:trainerId", auth, messageController.getMessages);

// Route for trainer to get chat history with a specific user
router.get("/user/:userId", auth, messageController.getMessagesWithUser);

// ✅ Route to send a message to a trainer
router.post("/:trainerId", auth, messageController.sendMessage);

// Route for trainer to send a message to a user
router.post("/user/:userId", auth, messageController.sendMessageToUser);

module.exports = router;
