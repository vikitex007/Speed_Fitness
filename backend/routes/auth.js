const express = require("express");
const { body } = require("express-validator");
const { auth, authenticate } = require("../middleware/auth");
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  getPremiumFeatures,
  upgradeMembership,
  cancelMembership,
  updateFitnessProfile,
  recordWorkout,
  getAllUsers,
  getPremiumUsers,
} = require("../controller/authController");

const router = express.Router();

// Validation middleware
const registerValidation = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("retypePassword").notEmpty().withMessage("Please confirm your password"),

  body("profilePicture")
    .optional()
    .isString()
    .withMessage("Profile picture must be a valid string"),

  body("userType")
    .optional()
    .isIn(["user", "trainer"])
    .withMessage("User type must be either 'user' or 'trainer'"),
];

const loginValidation = [
  body("username").trim().notEmpty().withMessage("Username is required"),

  body("password").notEmpty().withMessage("Password is required"),
];

const updateProfileValidation = [
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),

  body("profilePicture")
    .optional()
    .isString()
    .withMessage("Profile picture must be a valid string"),
];

const changePasswordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long"),

  body("confirmNewPassword")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("New passwords do not match");
      }
      return true;
    }),
];

// Premium membership validation
const upgradeMembershipValidation = [
  body("plan")
    .isIn(["basic", "premium", "elite", "ultimate"])
    .withMessage("Invalid plan selected"),
  body("duration")
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage("Duration must be between 1 and 365 days"),
  body("paymentMethod")
    .optional()
    .isString()
    .withMessage("Payment method must be a string"),
];

const updateFitnessProfileValidation = [
  body("fitnessLevel")
    .optional()
    .isIn(["beginner", "intermediate", "advanced", "elite"])
    .withMessage("Invalid fitness level"),
  body("goals").optional().isArray().withMessage("Goals must be an array"),
  body("goals.*")
    .optional()
    .isIn([
      "weight_loss",
      "muscle_gain",
      "endurance",
      "flexibility",
      "strength",
      "general_fitness",
    ])
    .withMessage("Invalid goal type"),
  body("medicalConditions")
    .optional()
    .isArray()
    .withMessage("Medical conditions must be an array"),
  body("emergencyContact.name")
    .optional()
    .isString()
    .withMessage("Emergency contact name must be a string"),
  body("emergencyContact.phone")
    .optional()
    .isString()
    .withMessage("Emergency contact phone must be a string"),
  body("emergencyContact.relationship")
    .optional()
    .isString()
    .withMessage("Emergency contact relationship must be a string"),
];

const recordWorkoutValidation = [
  body("duration")
    .optional()
    .isFloat({ min: 0.1, max: 24 })
    .withMessage("Duration must be between 0.1 and 24 hours"),
  body("workoutType")
    .optional()
    .isString()
    .withMessage("Workout type must be a string"),
];

// Routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfileValidation, updateProfile);
router.put("/change-password", auth, changePasswordValidation, changePassword);

// Premium routes
router.get("/premium-features", auth, getPremiumFeatures);
router.post(
  "/upgrade-membership",
  auth,
  upgradeMembershipValidation,
  upgradeMembership
);
router.post("/cancel-membership", auth, cancelMembership);
router.put(
  "/fitness-profile",
  auth,
  updateFitnessProfileValidation,
  updateFitnessProfile
);
router.post("/record-workout", auth, recordWorkoutValidation, recordWorkout);

router.get("/users", authenticate, getAllUsers);
router.get("/users/premium", authenticate, getPremiumUsers);

module.exports = router;
