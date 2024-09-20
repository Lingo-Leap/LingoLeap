const jwt = require("jsonwebtoken");
require("dotenv").config();

// MiddleWare Here we will need auth for now

const authenticate = (req, res, next) => {
  console.log(req, "========= auth header ==========");

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Authorization header missing ");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'
  if (!token) {
    console.log("Token extraction failed");
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token verification failed");
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log(decoded, "====== decoded ======");
    req.user = decoded;
    next();
  });
};
module.exports = authenticate;
