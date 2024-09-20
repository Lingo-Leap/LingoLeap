const express = require("express");
const UserRouter = express.Router();
const upload = require("../config/multerConfig");
const authenticate = require("../middleware/index");

const {
  userLogin,
  userSignup,
  updateUserProfile,
  updateUserPassword,
  createUser,
  getAllUsers,
  // getUserProfile,
  getCurrentUser,
  getUserPointsById,
} = require("../controllers/user.controller");

UserRouter.post("/register", upload.single("profilePicture"), userSignup);
UserRouter.post("/login", userLogin);
UserRouter.put("/update/:id", authenticate, updateUserProfile);
UserRouter.put("/update-password/:id", authenticate, updateUserPassword);
UserRouter.post("/create", createUser);
UserRouter.get("/all", getAllUsers);
// UserRouter.get("/:id", getUserProfile);
UserRouter.get("/me", authenticate, getCurrentUser);
UserRouter.get("/points/:id", getUserPointsById);

module.exports = UserRouter;
