const { Post, PostAttachment } = require("./../models/index");

class PostRepository {
  static async create(data) {
    try {
      const post = await Post.create(data);
      return post;
    } catch (err) {
      throw err;
    }
  }
  static async getMany(filter, pagination) {
    try {
      const posts = await Post.findAll({
        where: filter,
        ...pagination,
      });
      return posts;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = PostRepository;
