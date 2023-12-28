const express = require("express");
const router = express.Router();
const { FriendController } = require("./../../controllers/index");
const { isAuthenticated } = require("./../../middlewares/index");
router
  .route("/remove-friend/:friend_id")
  .delete(isAuthenticated, FriendController.removeFriend);
router.route("/:user_id").get(isAuthenticated, FriendController.getAllFriends);
module.exports = router;
