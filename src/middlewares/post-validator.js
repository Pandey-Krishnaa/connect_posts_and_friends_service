const ApiError = require("../utils/errors/ApiError");
const { statusCodes, errors } = require("../utils/errors/errors");

const postValidator = (req, res, next) => {
  console.log("post validation");
  if (!req.body.title || req.body.title.length < 3)
    return next(
      new ApiError(
        "post title is required",
        statusCodes.BadRequest,
        errors.BadRequest
      )
    );
  if (req.files) {
    let attachments = [];
    if (!Array.isArray(req.files.attachments))
      attachments.push(req.files.attachments);
    else attachments = req.files.attachments;
    const validFormat = ["pdf", "image"];
    // checking the format of file
    attachments.forEach((attachment) => {
      if (
        !validFormat.includes(attachment.mimetype.split("/")[0]) &&
        !validFormat.includes(attachment.mimetype.split("/")[1])
      ) {
        return next(
          new ApiError(
            "invalid formart , the file should be pdf or image",
            statusCodes.BadRequest,
            errors.BadRequest
          )
        );
      }
    });
    // checking each file every file can have atmost size of 2mb
    attachments.forEach((attachment) => {
      const size_in_mb = parseInt(attachment.size / (1024 * 1024));
      if (size_in_mb > 2)
        return next(
          new ApiError(
            "file should be less than or equals to 2MB",
            statusCodes.BadRequest,
            errors.BadRequest
          )
        );
    });
  }

  next();
};
module.exports = postValidator;
