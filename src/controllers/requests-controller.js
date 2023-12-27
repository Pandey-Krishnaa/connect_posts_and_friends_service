const { GET_USER_BY_ID_URL } = require("../config");
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
const withdrawRequest = async (req, res, next) => {
  try {
    await RequestService.withdrawRequest(req.params.request_id, req.user.id);
    res.status(200).json({
      message: "request withdrawed successfully",
    });
  } catch (err) {
    next(err);
  }
};

const ignoreRequest = async (req, res, next) => {
  try {
    await RequestService.ignoreRequest(req.params.request_id, req.user.id);
    res.status(200).json({
      message: "request ignored successfully",
    });
  } catch (err) {
    next(err);
  }
};

const getAllMyRequests = async (req, res, next) => {
  try {
    const queryObj = req.query;
    const keys = Object.keys(queryObj);
    const validQueryParams = ["page", "requests_per_page"];
    for (const key of keys)
      if (!validQueryParams.includes(key)) delete queryObj[key];
    const requests = await RequestService.getAllRequestsForUser(
      req.user.id,
      queryObj
    );
    for (const request of requests) {
      const response = await fetch(`${GET_USER_BY_ID_URL}/${request.from}`, {
        headers: {
          "x-auth-token": req.headers["x-auth-token"],
        },
      });
      const data = await response.json();
      request.from = data.user;
    }
    res.status(200).json({
      results: requests.length,
      requests,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  withdrawRequest,
  ignoreRequest,
  getAllMyRequests,
};
