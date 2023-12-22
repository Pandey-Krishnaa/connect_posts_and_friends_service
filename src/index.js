const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { PORT } = require("./config/index");

app.listen(PORT, () => {
  `server started at ${PORT} port.`;
});
