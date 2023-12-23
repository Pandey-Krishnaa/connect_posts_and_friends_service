const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRY } = require("./../../config/index");
const signJwt = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY }, (err, token) => {
      if (err) reject(err.message);
      else resolve(token);
    });
  });
};
const verifyJWTToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signJwt,
  verifyJWTToken,
};
