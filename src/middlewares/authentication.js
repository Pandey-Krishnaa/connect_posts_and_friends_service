const { GET_USER_BY_ID_URL } = require("../config");
const ApiError = require("../utils/errors/ApiError");
const { statusCodes, errors } = require("../utils/errors/errors");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token)
      return next(
        new ApiError(
          "login again",
          statusCodes.UnauthorizedRequest,
          errors.UnauthorizedRequest
        )
      );
    const response = await fetch(`${GET_USER_BY_ID_URL}/profile/me`, {
      method: "GET",
      headers: {
        "x-auth-token": token,
      },
    });

    if (!response.ok)
      return next(
        new ApiError(
          "login again",
          statusCodes.UnauthorizedRequest,
          errors.UnauthorizedRequest
        )
      );

    const data = await response.json();

    req.user = data.user;
  } catch (err) {
    return next(err);
  }
  next();
};

module.exports = isAuthenticated;
