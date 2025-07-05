const Message = require("../model/Message");
const User = require("../model/User");

// Get chat history between logged-in user and trainer
exports.getMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const trainerId = req.params.trainerId;
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: trainerId },
        { sender: trainerId, receiver: userId },
      ],
    }).sort({ timestamp: 1 });
    res.json({ success: true, messages });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch messages." });
  }
};

// Send a new message
exports.sendMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const trainerId = req.params.trainerId;
    const { text } = req.body;
    if (!text)
      return res
        .status(400)
        .json({ success: false, message: "Message text required." });
    const message = new Message({ sender: userId, receiver: trainerId, text });
    await message.save();
    res.json({ success: true, message });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to send message." });
  }
};
