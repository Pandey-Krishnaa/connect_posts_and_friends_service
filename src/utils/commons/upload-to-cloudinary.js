const { v2: cloudinary } = require("cloudinary");

const uploader = async (path) => {
  try {
    const response = await cloudinary.uploader.upload(path);
    return response;
  } catch (err) {
    throw err;
  }
};

module.exports = uploader;
