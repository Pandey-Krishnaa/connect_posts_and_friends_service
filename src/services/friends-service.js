const { FriendRepository } = require("./../repositories/index");
const ApiError = require("../utils/errors/ApiError");
const { statusCodes, errors } = require("../utils/errors/errors");

const { Op } = require("sequelize");
class FriendService {
  static async acceptRequest(user1_id, user2_id) {
    try {
      const filter = {
        [Op.or]: [
          { user1_id, user2_id },
          { user1_id: user2_id, user2_id: user1_id },
        ],
      };
      const response = await FriendRepository.getOne(filter);
      if (response)
        throw new ApiError(
          "you both are already friends",
          statusCodes.BadRequest,
          errors.BadRequest
        );
      const result = await FriendRepository.create({ user1_id, user2_id });
      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = FriendService;
