const { PostRepository } = require("./../repositories/index");
const PostAttachmentService = require("./post-attachment-service");

class PostService {
  static async createPost(data) {
    try {
      const { author_id, title, attachments } = data;

      const post = await PostRepository.create({ author_id, title });

      if (attachments) {
        await PostAttachmentService.uploadAttachment(post.id, attachments);
      }
      return post;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = PostService;
