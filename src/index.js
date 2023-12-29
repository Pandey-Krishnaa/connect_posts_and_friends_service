const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { PORT } = require("./config/index");
const { FriendRoutes, RequestRoutes } = require("./routes/v1/index");
const errorHandler = require("./utils/commons/errorHandler");
const { v2: cloudinary } = require("cloudinary");
const expressUploader = require("express-fileupload");
const {
  PORT,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY,
} = require("./config/index");

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET_KEY,
});
app.use(expressUploader({ useTempFiles: true }));
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
