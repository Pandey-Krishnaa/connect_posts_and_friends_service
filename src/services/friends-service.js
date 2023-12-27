const ApiError = require("../utils/errors/ApiError");
const { statusCodes, errors } = require("../utils/errors/errors");
const { FriendRepository } = require("./../repositories/index");

const { Op } = require("sequelize");
class FriendService {
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
}
module.exports = FriendService;
