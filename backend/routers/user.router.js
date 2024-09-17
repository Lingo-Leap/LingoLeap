const express = require("express");
const UserRouter = express.Router();
const authenticate = require("../middleware/index");

const {
    userLogin,
    userSignup,
   
  } = require("../controllers/user.controller");
  
 
  UserRouter.post("/register", userSignup);
  UserRouter.post("/login", userLogin);

  
  module.exports = UserRouter;