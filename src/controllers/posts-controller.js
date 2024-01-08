const { PostService } = require("./../services/index");
const createPost = async (req, res, next) => {
  try {
    const { title } = req.body;
    let attachments = [];
    console.log(req.files);
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

const getPostByUserId = async (req, res, next) => {
  try {
    let { page_no, result_per_page } = req.query;
    const { user_id } = req.params;
    page_no = page_no || 1;
    result_per_page = result_per_page || 10;
    const posts = await PostService.getPostsByUserId(
      user_id * 1,
      page_no * 1,
      result_per_page
    );
    res.status(200).json({
      author_details: {
        name: req.user.name,
        avatar_url: req.user.avatar_public_url,
        author_id: req.user.name,
      },
      posts,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createPost, getPostByUserId };
