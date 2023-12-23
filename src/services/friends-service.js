const { FriendRepository } = require("./../repositories/index");
const { GET_USER_BY_ID_URL } = require("./../config/index");
const ApiError = require("../utils/errors/ApiError");
const { statusCodes } = require("../utils/errors/errors");
const errors = require("../utils/errors/errors");
const { Op } = require("sequelize");
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
      // check whether they are already friend or not

      const filterObj = {
        [Op.or]: [
          { user1_id: from, user2_id: to },
          { user1_id: to, user2_id: from },
        ],
      };
      const areFriends = await FriendRepository.getOne(filterObj);
      if (!areFriends) {
        const result = await FriendRepository.create({
          user1_id: from,
          user2_id: to,
        });

        return result;
      } else
        throw new ApiError(
          "you are already friend",
          statusCodes.BadRequest,
          errors.BadRequest
        );
    } catch (err) {
      throw err;
    }
  }
}
module.exports = FriendService;
