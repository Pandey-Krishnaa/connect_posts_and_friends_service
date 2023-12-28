const { FriendsService } = require("./../services/index");
const removeFriend = async (req, res, next) => {
  try {
    const friend_id = req.params.friend_id;
    await FriendsService.removeFriend(friend_id, req.user.id);
    res.status(200).json({ message: "friend removed successfully" });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  removeFriend,
};
