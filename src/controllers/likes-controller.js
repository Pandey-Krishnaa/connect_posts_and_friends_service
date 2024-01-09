const { LikesService } = require("./../services/index");
const LikeOrRemoveLike = async (req, res, next) => {
  try {
    const data = await LikesService.LikeOrRemoveLike({
      user_id: req.user.id,
      post_id: req.params.post_id,
    });
    if (data) res.status(200).json({ data });
    else res.status(204).end();
  } catch (err) {
    next(err);
  }
};
const getLikesOfPost = async (req, res, next) => {
  try {
    const post_id = req.params.post_id;
    const data = await LikesService.GetLikes(post_id);
    res.status(200).json({
      likeCount: data.length,
      likes: data,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { LikeOrRemoveLike, getLikesOfPost };
