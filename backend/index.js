const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/config");
const path = require("path");
require("./models");

const adminUserRouter = require("./admin/adminRouters/admin.user.router");
const  adminLanguageRouter = require ("./admin/adminRouters/admin.language.router")

const userRouter = require("./routers/user.router");
const languageRouter = require("./routers/language.router");
const lessonsRouter = require("./routers/lesson.router");
const questionRouter = require("./routers/question.router");
const choiceRouter = require("./routers/question.router");
const lessonsUserRouter = require("./routers/lessonUsers.router.js");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Admin Routes
app.use("/api/admin/user", adminUserRouter);
app.use("/api/admin/languages", adminLanguageRouter);
app.use("/api/user", userRouter);
app.use("/api/language", languageRouter);
app.use("/api/lessons", lessonsRouter);
app.use("/api/question", questionRouter);
app.use("/api/choices", choiceRouter);
app.use("/api/lessonsUsers", lessonsUserRouter);
app.listen(port, () => {
  console.log(`Server running on port  http://localhost:${port}`);
});
