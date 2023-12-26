const { statusCodes } = require("../utils/errors/errors");
const { RequestService } = require("./../services/index");
const sendFriendRequest = async (req, res, next) => {
  try {
    const from = req.user.id;
    const to = req.params.id;
    await RequestService.sendRequest(from, to);
    res.status(200).json({
      message: "request sent successfully",
    });
  } catch (err) {
    next(err);
  }
};

const acceptFriendRequest = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    await RequestService.acceptRequest(requestId, req.user.id);
    res.status(200).json({
      message: "request accepted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { sendFriendRequest, acceptFriendRequest };
