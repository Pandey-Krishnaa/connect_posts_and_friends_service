const { FriendRepository } = require("./../repositories/index");
const { GET_USER_BY_ID_URL } = require("./../config/index");
const ApiError = require("../utils/errors/ApiError");
const { statusCodes } = require("../utils/errors/errors");
const errors = require("../utils/errors/errors");
class FriendService {
  static async SendFriendRequest(from, to, token) {
    try {
      // checking the sender is authorized or not
      const response1 = await fetch(`${GET_USER_BY_ID_URL}/${from}`, {
        headers: {
          "x-auth-token": token,
        },
        method: "GET",
      });
      if (!response1.ok)
        throw new ApiError(
          "please login again",
          statusCodes.UnauthorizedRequest,
          errors.UnauthorizedRequest
        );
      const response2 = await fetch(`${GET_USER_BY_ID_URL}/${to}`, {
        headers: {
          "x-auth-token": token,
        },
        method: "GET",
      });
      if (!response2.ok)
        throw new ApiError(
          "user whom do you want to send request does not exists",
          statusCodes.BadRequest,
          errors.BadRequest
        );
      const result = await FriendRepository.create({
        user1_id: from,
        user2_id: to,
      });
      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = FriendService;
