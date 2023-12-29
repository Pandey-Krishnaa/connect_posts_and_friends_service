const { PostAttachment } = require("./../models/index");
class PostRepository {
  static async create(data) {
    try {
      const post_attachment = await PostAttachment.create(data);
      return post_attachment;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = PostRepository;
