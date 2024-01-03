const { PostService } = require("./../services/index");
const createPost = async (req, res, next) => {
  try {
    const { title } = req.body;

    let attachments = [];
    if (req.files && req.files.attachments) {
      if (!Array.isArray(req.files.attachments))
        attachments.push(req.files.attachments);
      else attachments = req.files.attachments;
    }
    const data = { title, attachments, author_id: req.user.id };
    const post = await PostService.createPost(data);
    res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
};

module.exports = { createPost };
