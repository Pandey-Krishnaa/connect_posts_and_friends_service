const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("./../../middlewares/index");
const { RequestController } = require("./../../controllers/index");
router.route("").get(isAuthenticated, RequestController.getAllMyRequests);
router.route("/:id").post(isAuthenticated, RequestController.sendFriendRequest);
router
  .route("/accept-request/:id")
  .post(isAuthenticated, RequestController.acceptFriendRequest);
router
  .route("/withdraw-request/:request_id")
  .delete(isAuthenticated, RequestController.withdrawRequest);
router
  .route("/ignore-request/:request_id")
  .delete(isAuthenticated, RequestController.ignoreRequest);

module.exports = router;
