const express = require("express");
const router = express();
const { PostController } = require("./../../controllers/index");
const { validatePost, isAuthenticated } = require("./../../middlewares/index");
router.route("").post(isAuthenticated, validatePost, PostController.createPost);
router
  .route("/user/:user_id")
  .get(isAuthenticated, PostController.getPostByUserId);
router
  .route("/:post_id")
  .delete(isAuthenticated, PostController.deletePostById);
module.exports = router;
