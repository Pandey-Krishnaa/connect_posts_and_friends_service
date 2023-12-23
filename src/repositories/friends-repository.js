const { friend } = require("./../models/index");
const ApiError = require("./../utils/errors/ApiError");
const errors = require("./../utils/errors/errors");
const { statusCodes } = require("./../utils/errors/errors");
class FriendRepository {
  static async create(data) {
    try {
      const result = await friend.create(data);
      return result;
    } catch (err) {
      console.log(err);
      throw new ApiError(
        "internal server error",
        statusCodes.ServerError,
        errors.ServerError
      );
    }
  }
}
module.exports = FriendRepository;
