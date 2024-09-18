const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./config/config");
// <<<<<<< majid
// require("./models");
// =======
require("./models");

const userRouter = require("./routers/user.router");
const languageRouter =  require("./routers/language.router")
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/language" , languageRouter)
app.listen(port, () => {
  console.log(`Server running on port  http://localhost:${port}`);
});
