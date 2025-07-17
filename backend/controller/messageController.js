const Message = require("../model/Message");
const User = require("../model/User");

// Get chat history between logged-in user and trainer
exports.getMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const trainerId = req.params.trainerId;

    // Validate trainer exists and is actually a trainer
    const trainer = await User.findById(trainerId);
    if (!trainer || trainer.userType !== "trainer") {
      return res.status(404).json({
        success: false,
        message: "Trainer not found.",
      });
    }

    // Check if user is premium
    const user = await User.findById(userId);
    if (!user || user.membershipStatus === "free") {
      return res.status(403).json({
        success: false,
        message: "Premium membership required to chat with trainers.",
      });
    }

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: trainerId },
        { sender: trainerId, receiver: userId },
      ],
    })
      .populate("sender", "username profilePicture userType")
      .populate("receiver", "username profilePicture userType")
      .sort({ timestamp: 1 });

    res.json({ success: true, messages });
  } catch (err) {
    console.error("Get messages error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages.",
    });
  }
};

// Send a new message
exports.sendMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const trainerId = req.params.trainerId;
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Message text is required.",
      });
    }

    // Validate trainer exists and is actually a trainer
    const trainer = await User.findById(trainerId);
    if (!trainer || trainer.userType !== "trainer") {
      return res.status(404).json({
        success: false,
        message: "Trainer not found.",
      });
    }

    // Check if user is premium
    const user = await User.findById(userId);
    if (!user || user.membershipStatus === "free") {
      return res.status(403).json({
        success: false,
        message: "Premium membership required to chat with trainers.",
      });
    }

    const message = new Message({
      sender: userId,
      receiver: trainerId,
      text: text.trim(),
    });
    await message.save();

    // Populate sender and receiver details
    await message.populate("sender", "username profilePicture userType");
    await message.populate("receiver", "username profilePicture userType");

    res.json({ success: true, message });
  } catch (err) {
    console.error("Send message error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send message.",
    });
  }
};

// Get all conversations for a trainer
exports.getTrainerConversations = async (req, res) => {
  try {
    const trainerId = req.user._id;

    // Check if user is actually a trainer
    const trainer = await User.findById(trainerId);
    if (!trainer || trainer.userType !== "trainer") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Trainers only.",
      });
    }

    // Get all unique conversations for this trainer
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: trainerId }, { receiver: trainerId }],
        },
      },
      {
        $group: {
          _id: {
            $cond: [{ $eq: ["$sender", trainerId] }, "$receiver", "$sender"],
          },
          lastMessage: { $last: "$$ROOT" },
          messageCount: { $sum: 1 },
        },
      },
      {
        $sort: { "lastMessage.timestamp": -1 },
      },
    ]);

    // Populate user details for each conversation
    const populatedConversations = await Message.populate(conversations, [
      {
        path: "_id",
        select: "username profilePicture userType membershipStatus",
        model: "User",
      },
      {
        path: "lastMessage.sender",
        select: "username profilePicture userType",
        model: "User",
      },
      {
        path: "lastMessage.receiver",
        select: "username profilePicture userType",
        model: "User",
      },
    ]);

    res.json({
      success: true,
      conversations: populatedConversations,
    });
  } catch (err) {
    console.error("Get trainer conversations error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch conversations.",
    });
  }
};

// Get chat history between trainer and a specific user
exports.getMessagesWithUser = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const userId = req.params.userId;

    // Validate trainer exists and is actually a trainer
    const trainer = await User.findById(trainerId);
    if (!trainer || trainer.userType !== "trainer") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Trainers only.",
      });
    }

    // Validate user exists and is actually a user
    const user = await User.findById(userId);
    if (!user || user.userType !== "user") {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const messages = await Message.find({
      $or: [
        { sender: trainerId, receiver: userId },
        { sender: userId, receiver: trainerId },
      ],
    })
      .populate("sender", "username profilePicture userType")
      .populate("receiver", "username profilePicture userType")
      .sort({ timestamp: 1 });

    res.json({ success: true, messages });
  } catch (err) {
    console.error("Get messages with user error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages.",
    });
  }
};

// Send a new message from trainer to user
exports.sendMessageToUser = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const userId = req.params.userId;
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Message text is required.",
      });
    }

    // Validate trainer exists and is actually a trainer
    const trainer = await User.findById(trainerId);
    if (!trainer || trainer.userType !== "trainer") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Trainers only.",
      });
    }

    // Validate user exists and is actually a user
    const user = await User.findById(userId);
    if (!user || user.userType !== "user") {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const message = new Message({
      sender: trainerId,
      receiver: userId,
      text: text.trim(),
    });
    await message.save();

    // Populate sender and receiver details
    await message.populate("sender", "username profilePicture userType");
    await message.populate("receiver", "username profilePicture userType");

    res.json({ success: true, message });
  } catch (err) {
    console.error("Send message to user error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send message.",
    });
  }
};
