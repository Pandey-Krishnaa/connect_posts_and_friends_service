const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("./../../middlewares/index");

const { LikesController } = require("../../controllers");

router
  .route("/posts/:post_id")
  .post(isAuthenticated, LikesController.LikeOrRemoveLike)
  .get(isAuthenticated, LikesController.getLikesOfPost);

module.exports = router;
