const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();
require("./config/config");
// <<<<<<< majid
// require("./models");
// =======
require("./models");


const userRouter = require("./routers/user.router");
const app = express();
const port = process.env.PORT
app.use(express.json());
app.use(cors())

app.use(cookieParser());



app.use("/api/user", userRouter);

app.listen(port, () => {
    console.log(`Server running on port  http://localhost:${port}`);
  });

