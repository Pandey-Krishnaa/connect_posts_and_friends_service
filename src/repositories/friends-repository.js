const { friend } = require("./../models/index");
const ApiError = require("./../utils/errors/ApiError");
const errors = require("./../utils/errors/errors");
const { statusCodes } = require("./../utils/errors/errors");
const { Op } = require("sequelize");
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
  static async getOne(filterObj) {
    try {
      const result = await friend.findOne({
        where: filterObj,
      });

      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = FriendRepository;
