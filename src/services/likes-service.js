const { LikesRepository } = require("./../repositories/index");
const PostService = require("./post-service");
class LikesService {
  static async LikeOrRemoveLike(data) {
    try {
      const { post_id, user_id } = data;
      const post = await PostService.getPostById(post_id);
      const like = await LikesRepository.getLike({ post_id, user_id });
      console.log("likes = ", like.length);
      if (like.length === 0) {
        const like = await LikesRepository.create({ post_id, user_id });
        return like;
      } else {
        await LikesRepository.destroyOne({ post_id, user_id });
        return null;
      }
    } catch (err) {
      throw err;
    }
  }
}
module.exports = LikesService;
