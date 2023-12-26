const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { PORT } = require("./config/index");
const { FriendRoutes, RequestRoutes } = require("./routes/v1/index");
const errorHandler = require("./utils/commons/errorHandler");

app.use("/api/v1/friends", FriendRoutes);
app.use("/api/v1/requests", RequestRoutes);
app.all("*", (req, res) => {
  res.status(400).json({
    success: false,
    message: "invalid endpoint",
  });
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server started at ${PORT}....`);
});
