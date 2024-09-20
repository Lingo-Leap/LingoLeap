const User = require("../models/user.model");
const upload = require("../config/multerConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  userSignup: async (req, res) => {
    try {
      const { username, email, passwordHash, role } = req.body;
      // Input validation
      if (role !== "user" && role !== "admin" && role !== "teacher") {
        return res.status(400).json({ message: "Invalid role" });
      }
      if (!username || !email || !passwordHash || !role) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Email format validation (simple regex)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      // Password strength check
      if (passwordHash.length < 8) {
        return res
          .status(400)
          .json({ message: "Password must be at least 8 characters long" });
      }

      // Check if the email is already in use
      const user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(passwordHash, saltRounds);

      const profilePicture = req.file ? req.file.filename : null;

      console.log({
        username,
        email,
        passwordHash: hashedPassword,
        role,
        profilePicture,
      });

      await User.create({
        username,
        email,
        passwordHash: hashedPassword,
        role,
        profilePicture,
      });

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  userLogin: async (req, res) => {
    try {
      const { email, passwordHash } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(
        passwordHash,
        user.passwordHash
      );
      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        userId: user.id,
        role: user.role,
        userName: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      // const { id } = req.params;
      const userId = req.user.id;
      const { username, email } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await user.update({ username, email });

      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
  updateUserPassword: async (req, res) => {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;
      console.log("Received password update request:", {
        userId,
        currentPassword,
        newPassword,
      });
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.passwordHash
      );

      if (!passwordMatch) {
        console.log("Current password is incorrect");
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      await user.update({ passwordHash: hashedPassword });

      console.log("Password updated successfully");
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ message: error.message });
    }
  },
  createUser: async (req, res) => {
    try {
      const { username, email, passwordHash, role, profilePicture } = req.body;
      const user = await User.create({
        username,
        email,
        passwordHash,
        role,
        profilePicture,
      });
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // getUserProfile: async (req, res) => {
  //   const { id } = req.params;

  //   try {
  //     const user = await User.findByPk(id, {
  //       attributes: [
  //         "username",
  //         "email",
  //         "profilePicture",
  //         "role",
  //         "totalPoints",
  //       ],
  //     });

  //     if (!user) {
  //       return res.status(404).json({ error: "User not found" });
  //     }

  //     res.status(200).json(user);
  //   } catch (error) {
  //     res
  //       .status(500)
  //       .json({ error: "An error occurred while fetching the user profile" });
  //   }
  // },

  getCurrentUser: async (req, res) => {
    try {
      const userId = req.user.id;
      console.log("User ID from token:", userId);
      if (!userId) {
        return res.status(400).json({ message: "User ID not found in token" });
      }
      const user = await User.findByPk(userId, {
        attributes: [
          "username",
          "email",
          "role",
          "profilePicture",
          "totalPoints",
        ],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the current user" });
    }
  },
};
