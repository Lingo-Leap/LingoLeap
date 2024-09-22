const express = require("express");
const adminUserRouter = express.Router();

const {
  getAllUsers,
  getUserByUsername,
  updateUser,
  deleteUser,
} = require("../adminControllers/admin.user.controller");

adminUserRouter.get("/all", getAllUsers);
adminUserRouter.get("/:username", getUserByUsername);
adminUserRouter.put("/update/:id", updateUser);
adminUserRouter.delete("/delete/:id", deleteUser);

module.exports = adminUserRouter;
