const express = require("express");
const UserRouter = express.Router();
const authenticate = require("../middleware/index");

const {
  userLogin,
  userSignup,
  updateUser,
  createUser,
  getAllUsers,
  getUserProfile,
} = require("../controllers/user.controller");

UserRouter.post("/register", userSignup);
UserRouter.post("/login", userLogin);
UserRouter.put("/update/:id", updateUser);
UserRouter.post("/create", createUser);
UserRouter.get("/all", getAllUsers);
UserRouter.get("/:id", getUserProfile);
module.exports = UserRouter;
