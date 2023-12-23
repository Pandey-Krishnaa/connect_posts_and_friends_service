const { FriendsSerive } = require("./../services/index");
const sendFriendRequest = async (req, res, next) => {
  try {
    // the id of source user;
    const from = req.params.from;
    // the id of target user;

    const to = req.params.to;
    console.log(to);
    // auth token
    const token = req.headers["x-auth-token"];
    const result = await FriendsSerive.SendFriendRequest(from, to, token);
    res.status(200).json({
      success: true,
      message: "friend request sent successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  sendFriendRequest,
};
