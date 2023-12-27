const ApiError = require("../utils/errors/ApiError");
const { statusCodes, errors } = require("../utils/errors/errors");
const { RequestRepository } = require("./../repositories/index");
const FriendService = require("./friends-service");
// const { Op } = require("sequelize");
class RequestService {
  static async sendRequest(from, to) {
    try {
      const filter = {
        from,
        to,
      };
      const response = await RequestRepository.getOne(filter);
      if (response)
        throw new ApiError(
          "you have already sent the request",
          statusCodes.BadRequest,
          errors.BadRequest
        );
      const data = { from, to };
      const result = await RequestRepository.create(data);
      return result;
    } catch (err) {
      throw err;
    }
  }
  static async acceptRequest(request_id, my_id) {
    try {
      const filter = { id: request_id, to: my_id };
      const response = await RequestRepository.getOne(filter);
      if (!response)
        throw new ApiError(
          "invalid request id or you're not authorized to accept this request"
        );
      const result = await FriendService.acceptRequest(response.from, my_id);
      console.log(request_id);
      await RequestRepository.deleteOne(request_id);
      return result;
    } catch (err) {
      throw err;
    }
  }
  static async withdrawRequest(request_id, my_id) {
    // user who sent the request only he/she will able to withdraw request
    try {
      const filter = {
        id: request_id * 1,
        from: my_id * 1,
      };
      const response = await RequestRepository.getOne(filter);
      if (!response)
        throw new ApiError(
          "failed to withdraw request",
          statusCodes.BadRequest,
          errors.BadRequest
        );
      await RequestRepository.deleteOne(request_id);
    } catch (err) {
      throw err;
    }
  }
  static async ignoreRequest(request_id, my_id) {
    // only the user to them the request has sent will able to ignore request
    try {
      const filter = { id: request_id, to: my_id };
      const response = await RequestRepository.getOne(filter);
      if (!response)
        throw new ApiError(
          "failed to ignore request",
          statusCodes.BadRequest,
          errors.BadRequest
        );
      await RequestRepository.deleteOne(request_id);
    } catch (err) {
      throw err;
    }
  }
  static async getAllRequestsForUser(my_id, queryObj) {
    try {
      const filter = { to: my_id };
      const pagination = {
        offset: queryObj.page * 1 - 1 || 0,
        limit: queryObj.requests_per_page * 1 || 10,
      };
      const response = await RequestRepository.getMany(filter, pagination);
      return response;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = RequestService;
