const express = require("express");
const router = express.Router();
const { FriendController } = require("./../../controllers/index");
const { isAuthenticated } = require("./../../middlewares/index");
router
  .route("/remove-friend/:frient_id")
  .delete(isAuthenticated, FriendController.removeFriend);
module.exports = router;
