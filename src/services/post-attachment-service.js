const { PostAttachmentRepository } = require("../repositories/index");
const uploader = require("../utils/commons/upload-to-cloudinary");

class PostAttachmentService {
  static async uploadAttachment(post_id, attachments) {
    try {
      const uploaderPromises = attachments.map((attachment) => {
        return uploader(attachment.tempFilePath);
      });

      const uploaderResults = await Promise.all(uploaderPromises);
      const attachmentsPromises = uploaderResults.map((result) =>
        PostAttachmentRepository.create({
          post_id,
          attachment_public_id: result.public_id,
          attachment_public_url: result.secure_url,
        })
      );
      const attachmentsResults = await Promise.all(attachmentsPromises);
      console.log(attachmentsResults);
      return attachmentsResults;
    } catch (err) {
      throw err;
    }
  }
  static async getAttachments(filter) {
    try {
      const attachments = await PostAttachmentRepository.getMany(filter);
      return attachments;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = PostAttachmentService;
