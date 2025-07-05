const User = require("../model/User");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Generate JWT Token
const generateToken = (userId, userType) => {
  return jwt.sign({ userId, userType }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });
};

// Register User
const register = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { username, password, retypePassword, profilePicture, userType } =
      req.body;

    if (password !== retypePassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    if (userType && !["user", "trainer"].includes(userType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user type.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    // Create new user
    const user = new User({
      username,
      password,
      profilePicture: profilePicture || null,
      userType: userType || "user",
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id, user.userType);

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: user.toJSON(),
        token,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Login User
const login = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // // Check if account is active
    // if (!user.isActive) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Account is deactivated",
    //   });
    // }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Generate token
    const token = generateToken(user._id, user.userType);

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: user.toJSON(),
        token,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get User Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update User Profile
const updateProfile = async (req, res) => {
  try {
    console.log("Update profile request:", req.body);
    console.log("Current user:", req.user);

    const { username, profilePicture } = req.body;
    const updateData = {};

    // Only update fields that are provided
    if (username) updateData.username = username;
    if (profilePicture) updateData.profilePicture = profilePicture;

    console.log("Update data:", updateData);

    // Check if username is being changed and if it already exists
    if (username && username !== req.user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    console.log("Updated user:", updatedUser);

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Change Password
const changePassword = async (req, res) => {
  try {
    console.log("Change password request:", {
      ...req.body,
      newPassword: "[HIDDEN]",
    });

    const { currentPassword, newPassword } = req.body;

    // Validate current password
    const user = await User.findById(req.user._id);
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);

    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Update password - this will trigger the pre-save hook to hash it
    user.password = newPassword;
    await user.save();

    console.log("Password changed successfully for user:", user._id);

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Upgrade Membership
const upgradeMembership = async (req, res) => {
  try {
    const { plan, paymentMethod } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Only allow silver, gold, platinum
    const validPlans = ["silver", "gold", "platinum"];
    if (!validPlans.includes(plan)) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan selected",
      });
    }

    // Require payment method
    if (!paymentMethod || !["khalti", "esewa"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing payment method",
      });
    }

    // Simulate payment verification (replace with real gateway check)
    const paymentSuccess = true; // Set to false to simulate failure
    if (!paymentSuccess) {
      return res.status(402).json({
        success: false,
        message: "Payment failed. Please try again.",
      });
    }

    // Upgrade membership
    user.upgradeMembership(plan, 30); // 30 days for monthly
    user.subscriptionDetails.paymentMethod = paymentMethod;
    user.subscriptionDetails.lastPaymentDate = new Date();
    user.subscriptionDetails.nextPaymentDate = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    );
    await user.save();

    res.json({
      success: true,
      message: "Membership upgraded successfully",
      data: {
        user: user.toJSON(),
        membershipStatus: user.membershipStatus,
        plan: plan,
        premiumFeatures: user.getPremiumFeatures(),
      },
    });
  } catch (error) {
    console.error("Upgrade membership error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get Premium Features
const getPremiumFeatures = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPremium = user.isPremium();
    const premiumFeatures = user.getPremiumFeatures();

    res.json({
      success: true,
      data: {
        isPremium,
        membershipStatus: user.membershipStatus,
        subscriptionDetails: user.subscriptionDetails,
        premiumFeatures,
        fitnessProfile: user.fitnessProfile,
        activityStats: user.activityStats,
      },
    });
  } catch (error) {
    console.error("Get premium features error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Cancel Membership
const cancelMembership = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Set subscription to inactive
    user.subscriptionDetails.isActive = false;
    user.subscriptionDetails.autoRenew = false;
    user.membershipStatus = "free";
    user.premiumFeatures = {
      personalTrainer: false,
      nutritionConsultation: false,
      groupClasses: false,
      recoverySessions: false,
      priorityBooking: false,
      guestPasses: 0,
      towelService: false,
      lockerAccess: true,
      parkingAccess: true,
    };

    await user.save();

    res.json({
      success: true,
      message: "Membership cancelled successfully",
      data: {
        user: user.toJSON(),
        membershipStatus: user.membershipStatus,
      },
    });
  } catch (error) {
    console.error("Cancel membership error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update Fitness Profile
const updateFitnessProfile = async (req, res) => {
  try {
    const { fitnessLevel, goals, medicalConditions, emergencyContact } =
      req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update fitness profile
    if (fitnessLevel) user.fitnessProfile.fitnessLevel = fitnessLevel;
    if (goals) user.fitnessProfile.goals = goals;
    if (medicalConditions)
      user.fitnessProfile.medicalConditions = medicalConditions;
    if (emergencyContact)
      user.fitnessProfile.emergencyContact = emergencyContact;

    await user.save();

    res.json({
      success: true,
      message: "Fitness profile updated successfully",
      data: {
        fitnessProfile: user.fitnessProfile,
      },
    });
  } catch (error) {
    console.error("Update fitness profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Record Workout Activity
const recordWorkout = async (req, res) => {
  try {
    const { duration, workoutType } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update activity stats
    user.activityStats.totalWorkouts += 1;
    user.activityStats.totalHours += duration || 1;
    user.activityStats.lastWorkoutDate = new Date();

    // Update streak logic
    const today = new Date();
    const lastWorkout = user.activityStats.lastWorkoutDate;
    const daysSinceLastWorkout = Math.floor(
      (today - lastWorkout) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastWorkout <= 1) {
      user.activityStats.currentStreak += 1;
    } else {
      user.activityStats.currentStreak = 1;
    }

    if (user.activityStats.currentStreak > user.activityStats.longestStreak) {
      user.activityStats.longestStreak = user.activityStats.currentStreak;
    }

    await user.save();

    res.json({
      success: true,
      message: "Workout recorded successfully",
      data: {
        activityStats: user.activityStats,
      },
    });
  } catch (error) {
    console.error("Record workout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all premium users
const getPremiumUsers = async (req, res) => {
  try {
    const users = await User.find({
      membershipStatus: { $ne: "free" },
      "subscriptionDetails.isActive": true,
    }).select("-password");
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  upgradeMembership,
  getPremiumFeatures,
  cancelMembership,
  updateFitnessProfile,
  recordWorkout,
  getAllUsers,
  getPremiumUsers,
};
