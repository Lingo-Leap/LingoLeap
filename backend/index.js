const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./config/config");
require("./models")

const userRouter = require("./routers/user.router");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.use("/api/user", userRouter);

app.listen(port, () => {
    console.log(`Server running on port  http://localhost:${port}`);
  });