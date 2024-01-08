const { LikesService } = require("./../services/index");
const LikeOrRemoveLike = async (req, res, next) => {
  try {
    const data = await LikesService.LikeOrRemoveLike({
      user_id: req.user.id,
      post_id: req.params.post_id,
    });

    console.log(data);
    if (data) res.status(200).json({ data });
    else res.status(204).json({ message: "post disliked" });
  } catch (err) {
    next(err);
  }
};
module.exports = { LikeOrRemoveLike };
