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
  static async getMany(filter) {
    try {
      const post_attachments = await PostAttachment.findAll({ where: filter });
      return post_attachments;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = PostRepository;
