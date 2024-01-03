const { PostAttachmentRepository } = require("../repositories/index");
const uploader = require("../utils/commons/upload-to-cloudinary");

class PostAttachmentService {
  static async uploadAttachment(post_id, attachments) {
    console.log("attachment uploader");
    try {
      const uploaderPromises = attachments.map((attachment) => {
        return uploader(attachment.tempFilePath);
      });

      const uploaderResults = await Promise.all(uploaderPromises);
      console.log(uploaderResults);
      const attachmentsPromises = uploaderResults.map((result) =>
        PostAttachmentRepository.create({
          post_id,
          attachment_public_id: result.public_id,
          attachment_public_url: result.secure_url,
        })
      );
      const attachmentsResults = await Promise.all(attachmentsPromises);
      return attachmentsResults;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = PostAttachmentService;
