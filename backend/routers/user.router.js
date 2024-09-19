const express = require("express");
const UserRouter = express.Router();
const upload = require("../config/multerConfig");
const authenticate = require("../middleware/index");

const {
  userLogin,
  userSignup,
  updateUserProfile,
  createUser,
  getAllUsers,
  // getUserProfile,
  getCurrentUser,
} = require("../controllers/user.controller");

UserRouter.post("/register", upload.single("profilePicture"), userSignup);
UserRouter.post("/login", userLogin);
UserRouter.put("/update/:id", authenticate, updateUserProfile);
UserRouter.post("/create", createUser);
UserRouter.get("/all", getAllUsers);
// UserRouter.get("/:id", getUserProfile);
UserRouter.get("/me", authenticate, getCurrentUser);

module.exports = UserRouter;
