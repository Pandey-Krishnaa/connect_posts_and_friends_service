const sequelize = require("sequelize");
const { Requests } = require("./../models/index");
class RequestsRepository {
  static async create(data) {
    try {
      const req = await Requests.create(data);
      return req;
    } catch (err) {
      throw err;
    }
  }
  static async getOne(filter) {
    try {
      const req = await Requests.findOne({
        where: filter,
      });
      return req;
    } catch (err) {
      throw err;
    }
  }
  static async getMany(filter, pagination) {
    try {
      console.log(pagination);
      const response = Requests.findAll({ where: filter, ...pagination });
      return response;
    } catch (err) {
      throw err;
    }
  }
  static async deleteOne(request_id) {
    try {
      await Requests.destroy({
        where: {
          id: request_id,
        },
      });
      return null;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = RequestsRepository;
