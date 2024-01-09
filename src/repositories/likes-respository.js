const { Like } = require("./../models/index");
class LikesRepository {
  static async create(data) {
    try {
      const response = await Like.create(data);
      return response;
    } catch (err) {
      throw err;
    }
  }
  static async getLike(filter) {
    try {
      console.log(filter);
      const likes = await Like.findAll({ where: filter });
      return likes;
    } catch (err) {
      throw err;
    }
  }
  static async destroyOne(filter) {
    try {
      await Like.destroy({ where: filter });
      return null;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = LikesRepository;
