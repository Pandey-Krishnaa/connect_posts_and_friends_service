const errorObj = {
  BadRequest: "BadRequest",
  TooManyRequests: "TooManyRequests",
  ServerError: "ServerError",
  UnauthorizedRequest: "UnauthorizedRequest",
  NotFound: "NotFound",
};
const statusCodesObj = {
  BadRequest: 400,
  TooManyRequests: 429,
  ServerError: 500,
  UnauthorizedRequest: 401,
  NotFound: 404,
};
Object.freeze(errorObj);
Object.freeze(statusCodesObj);
module.exports = { errors: errorObj, statusCodes: statusCodesObj };
