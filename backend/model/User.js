const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    profilePicture: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    userType: {
      type: String,
      enum: ["user", "trainer"],
      default: "user",
      required: true,
    },
    // Premium user fields
    membershipStatus: {
      type: String,
      enum: ["free", "silver", "gold", "platinum"],
      default: "free",
    },
    subscriptionDetails: {
      planName: {
        type: String,
        default: "Free Plan",
      },
      startDate: {
        type: Date,
        default: null,
      },
      endDate: {
        type: Date,
        default: null,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
      autoRenew: {
        type: Boolean,
        default: false,
      },
      paymentMethod: {
        type: String,
        default: null,
      },
      lastPaymentDate: {
        type: Date,
        default: null,
      },
      nextPaymentDate: {
        type: Date,
        default: null,
      },
    },
    premiumFeatures: {
      contactTrainer: { type: Boolean, default: false },
      dietPlan: { type: Boolean, default: false },
      workoutPlan: { type: Boolean, default: false },
      progressCheck: { type: String, default: "none" }, // none, monthly, biweekly, weekly
      support: { type: String, default: "none" }, // none, weekly, biweekly, priority
      liveQnA: { type: Boolean, default: false },
      videoConsult: { type: Boolean, default: false },
      lifestyleCoaching: { type: Boolean, default: false },
    },
    fitnessProfile: {
      fitnessLevel: {
        type: String,
        enum: ["beginner", "intermediate", "advanced", "elite"],
        default: "beginner",
      },
      goals: [
        {
          type: String,
          enum: [
            "weight_loss",
            "muscle_gain",
            "endurance",
            "flexibility",
            "strength",
            "general_fitness",
          ],
        },
      ],
      medicalConditions: [
        {
          type: String,
        },
      ],
      emergencyContact: {
        name: String,
        phone: String,
        relationship: String,
      },
    },
    activityStats: {
      totalWorkouts: {
        type: Number,
        default: 0,
      },
      totalHours: {
        type: Number,
        default: 0,
      },
      currentStreak: {
        type: Number,
        default: 0,
      },
      longestStreak: {
        type: Number,
        default: 0,
      },
      lastWorkoutDate: {
        type: Date,
        default: null,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    // Hash password with cost of 12
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to check if user is premium
userSchema.methods.isPremium = function () {
  return this.membershipStatus !== "free" && this.subscriptionDetails.isActive;
};

// Method to get premium features
userSchema.methods.getPremiumFeatures = function () {
  // Silver
  if (this.membershipStatus === "silver" && this.subscriptionDetails.isActive) {
    return {
      contactTrainer: true,
      dietPlan: true,
      workoutPlan: true,
      progressCheck: "monthly",
      support: "weekly",
      liveQnA: false,
      videoConsult: false,
      lifestyleCoaching: false,
    };
  }
  // Gold
  if (this.membershipStatus === "gold" && this.subscriptionDetails.isActive) {
    return {
      contactTrainer: true,
      dietPlan: true,
      workoutPlan: true,
      progressCheck: "biweekly",
      support: "biweekly",
      liveQnA: true,
      videoConsult: false,
      lifestyleCoaching: false,
    };
  }
  // Platinum
  if (
    this.membershipStatus === "platinum" &&
    this.subscriptionDetails.isActive
  ) {
    return {
      contactTrainer: true,
      dietPlan: true,
      workoutPlan: true,
      progressCheck: "weekly",
      support: "priority",
      liveQnA: true,
      videoConsult: true,
      lifestyleCoaching: true,
    };
  }
  // Free
  return {
    contactTrainer: false,
    dietPlan: false,
    workoutPlan: false,
    progressCheck: "none",
    support: "none",
    liveQnA: false,
    videoConsult: false,
    lifestyleCoaching: false,
  };
};

// Method to upgrade membership
userSchema.methods.upgradeMembership = function (plan, duration = 30) {
  const plans = {
    silver: {
      planName: "Silver Package",
      features: {
        contactTrainer: true,
        dietPlan: true,
        workoutPlan: true,
        progressCheck: "monthly",
        support: "weekly",
        liveQnA: false,
        videoConsult: false,
        lifestyleCoaching: false,
      },
    },
    gold: {
      planName: "Gold Package",
      features: {
        contactTrainer: true,
        dietPlan: true,
        workoutPlan: true,
        progressCheck: "biweekly",
        support: "biweekly",
        liveQnA: true,
        videoConsult: false,
        lifestyleCoaching: false,
      },
    },
    platinum: {
      planName: "Platinum Package",
      features: {
        contactTrainer: true,
        dietPlan: true,
        workoutPlan: true,
        progressCheck: "weekly",
        support: "priority",
        liveQnA: true,
        videoConsult: true,
        lifestyleCoaching: true,
      },
    },
  };

  const selectedPlan = plans[plan];
  if (!selectedPlan) {
    throw new Error("Invalid plan selected");
  }

  this.membershipStatus = plan;
  this.subscriptionDetails.planName = selectedPlan.planName;
  this.subscriptionDetails.startDate = new Date();
  this.subscriptionDetails.endDate = new Date(
    Date.now() + duration * 24 * 60 * 60 * 1000
  );
  this.subscriptionDetails.isActive = true;
  this.premiumFeatures = selectedPlan.features;

  return this;
};

// Method to get user info without password
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// Index for better query performance
userSchema.index({ username: 1 });
userSchema.index({ membershipStatus: 1 });
userSchema.index({ "subscriptionDetails.isActive": 1 });

const User = mongoose.model("User", userSchema);

module.exports = User;
