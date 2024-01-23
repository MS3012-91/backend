const createHttpError = require("http-errors");
const {
  NEW_USER_VALIDATION_SCHEMA,
  UPDATE_USER_VALIDATION_SCHEMA,
} = require("../db/utils/validationSchemas");

module.exports.userValidationOnCreate = async (req, res, next) => {
  const birthdayDate = new Date(req.body.birthday);
  req.body.birthday = birthdayDate;
  try {
    const validatedUser = await NEW_USER_VALIDATION_SCHEMA.validate(req.body, {
      abortEarly: false,
    });
    req.body = validatedUser;
    next();
  } catch (err) {
     next(err);
  }
};

module.exports.userValidationOnUpdate = async (req, res, next) => {
  const birthdayDate = new Date(req.body.birthday);
  req.body.birthday = birthdayDate;
  try {
    const validatedUser = await UPDATE_USER_VALIDATION_SCHEMA.validate(
      req.body,
      {
        abortEarly: false,
      }
    );
    req.body = validatedUser;
    next();
  } catch (err) {
    next(err);
  }
};
