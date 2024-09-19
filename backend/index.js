const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/config");
const path = require("path");
require("./models");

const userRouter = require("./routers/user.router");
const languageRouter =  require("./routers/language.router");
const lessonsRouter = require("./routers/lesson.router");
const questionRouter = require("./routers/question.router")
const choiceRouter= require("./routers/question.router")
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/user", userRouter);
app.use("/api/language" , languageRouter)
app.use("/api/lessons" , lessonsRouter)
app.use("/api/question" , questionRouter)
app.use("/api/choices"  ,  choiceRouter )
app.listen(port, () => {
  console.log(`Server running on port  http://localhost:${port}`);
});
