const express = require("express");
const router = express.Router();
const { FriendController } = require("./../../controllers/index");
router.route("/:from/:to").post(FriendController.sendFriendRequest);
module.exports = router;
