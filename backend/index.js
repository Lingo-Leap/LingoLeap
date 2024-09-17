const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./config/config");
// <<<<<<< majid
// require("./models");
// =======
require("./models");

const app = express();
// const progressRoutes = require("./routes/progressRoutes");
const port = process.env.PORT || 1274;
app.use(cors());
app.use(express.json());

// app.use("/api/progress", progressRoutes);
app.listen(port, () => {
  console.log(`Server running on port  http://localhost:${port}`);
});
