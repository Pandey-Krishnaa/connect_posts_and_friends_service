class ApiError extends Error {
  constructor(msg, statusCode, name) {
    super(msg);
    this.statusCode = statusCode;
    this.name = name;
  }
}
module.exports = ApiError;
