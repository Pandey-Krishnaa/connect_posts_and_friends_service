const { LikesService } = require(".");
const ApiError = require("../utils/errors/ApiError");
const { statusCodes, errors } = require("../utils/errors/errors");
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
  static async getPostsByUserId(user_id, page_no = 1, result_per_page = 5) {
    try {
      const filter = { author_id: user_id };
      const pagination = {
        offset: (page_no - 1) * result_per_page * 1,
        limit: result_per_page * 1,
      };
      const posts = await PostRepository.getMany(filter, pagination);
      const post_attachments = {};
      for (const post of posts) {
        post_attachments[`${post.id}`] = [];
        const attachments = await PostAttachmentService.getAttachments({
          post_id: post.id,
        });
        attachments.forEach((attachment) => {
          post_attachments[`${post.id}`].push({
            url: attachment.attachment_public_url,
            public_id: attachment.attachment_public_id,
          });
        });
      }
      const result = posts.map((post) => {
        const data = post.dataValues;
        data.files = post_attachments[post.id];
        return data;
      });

      return result;
    } catch (err) {
      throw err;
    }
  }
  static async getPostById(post_id) {
    try {
      console.log("post id => ", post_id);
      const post = await PostRepository.getOne({ id: post_id });
      if (!post)
        throw new ApiError(
          "post doesn't exists",
          statusCodes.BadRequest,
          errors.BadRequest
        );
      return post;
    } catch (err) {
      throw err;
    }
  }
  static async detelePostById(post_id) {
    try {
      await PostRepository.delete({ id: post_id });
      return null;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = PostService;
