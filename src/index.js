const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { PORT } = require("./config/index");
const {
  FriendRoutes,
  RequestRoutes,
  PostsRoutes,
} = require("./routes/v1/index");
const errorHandler = require("./utils/commons/errorHandler");
const { v2: cloudinary } = require("cloudinary");
const expressUploader = require("express-fileupload");
const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY,
} = require("./config/index");

const cors = require("cors");
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET_KEY,
});
const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());
app.use(expressUploader({ useTempFiles: true }));
app.use("/api/v1/friends", FriendRoutes);
app.use("/api/v1/requests", RequestRoutes);
app.use("/api/v1/posts", PostsRoutes);
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
