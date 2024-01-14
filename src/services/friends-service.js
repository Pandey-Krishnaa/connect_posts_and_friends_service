const { GET_USER_BY_ID_URL } = require("../config");
const ApiError = require("../utils/errors/ApiError");
const { statusCodes, errors } = require("../utils/errors/errors");
const {
  FriendRepository,
  RequestRepository,
} = require("./../repositories/index");

const { Op } = require("sequelize");
class FriendService {
  static async acceptRequest(from, to, token) {
    try {
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
      const filter = {
        [Op.or]: [
          { user1_id: from, user2_id: to },
          { user1_id: to, user2_id: from },
        ],
      };
      const areFriends = await FriendRepository.getOne(filter);
      if (!areFriends) {
        const result = await FriendRepository.create({
          user1_id: from,
          user2_id: to,
        });
        return result;
      } else
        throw new ApiError(
          "you are already friend",
          "you both are already friends",
          statusCodes.BadRequest,
          errors.BadRequest
        );
    } catch (err) {
      throw err;
    }
  }
  static async removeFriend(friend_id, my_id) {
    try {
      const filter = {
        [Op.or]: [
          { user1_id: friend_id, user2_id: my_id },
          { user1_id: my_id, user2_id: friend_id },
        ],
      };
      const response = await FriendRepository.getOne(filter);
      if (!response)
        throw new ApiError(
          "failed to remove friend",
          statusCodes.ServerError,
          errors.ServerError
        );
      await FriendRepository.deleteOne(response.id);
    } catch (err) {
      throw err;
    }
  }
  static async getAllFriends(logged_in_user_id, user_id, pagination) {
    try {
      // to get all the friends of a user you have to be friend of that user
      const are_they_friends = FriendRepository.getOne({
        [Op.or]: [
          { user1_id: logged_in_user_id, user2_id: user_id },
          { user1_id: user_id, user2_id: logged_in_user_id },
        ],
      });
      if (!are_they_friends)
        throw new ApiError(
          "you can't see friend list of non friend user",
          statusCodes.AccessDenied,
          errors.AccessDenied
        );
      const filter = {
        [Op.or]: [{ user1_id: user_id }, { user2_id: user_id }],
      };
      const friends = await FriendRepository.getMany(filter, pagination);
      const friendsCount = await FriendRepository.getNumberOfRecords(filter);
      return { friends, friendsCount };
    } catch (err) {
      throw err;
    }
  }
}
module.exports = FriendService;
