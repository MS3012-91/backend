const { object, string, date, mixed } = require("yup");

module.exports.userValidation = async (req, res, next) => {
  const birthdayDate = new Date(req.body.birthday);
  req.body.birthday = birthdayDate;
  const USER_VALIDATION_SCHEMA = object({
    firstName: string()
      .trim()
      .min(2)
      .max(64)
      .matches(/^[A-Z][a-z]+$/)
      .required(),
    lastName: string()
      .trim()
      .min(2)
      .max(64)
      .matches(/^[A-Z][a-z]+$/)
      .required(),
    email: string().email().required(),
    birthday: date().max(new Date()),
    gender: mixed().oneOf(["male", "female", "other"]),
    passwordHash: string()
      .min(8)
      .max(64)
      .matches(/^(?=.*?[A-Z])/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .matches(/^(?=.*[a-z])/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .matches(/\d/, { message: "Password must contain at least one digit." })
      .matches(/^(?=.*[!@#$%^&*-+\?/])/, {
        message: "Password must contain at least one special character.",
      })
      .required(),
  });
  try {
    const validatedUser = await USER_VALIDATION_SCHEMA.validate(req.body, {
      abortEarly: false,
    });
      req.body = validatedUser;
      console.log("req.body", req.body);
    next();
  } catch (err) {
    res.status(422).send(err.errors);
  }
};
