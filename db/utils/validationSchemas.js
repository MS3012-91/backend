const yup = require("yup");

const EMAIL_VALIDATION_SCHEMA = yup.string().email();

const NAME_VALIDATION_SCHEMA = yup.string()
  .trim()
  .min(2)
  .max(64)
  .matches(/^[A-Z][a-z]+$/);

const BIRTHDAY_VALIDATION_SCHEMA = yup.date().max(new Date());

const GENDER_VALIDATION_SCHEMA = yup.mixed().oneOf(["male", "female", "other"]);

const PASSWORD_VALIDATION_SCHEMA = yup.string()
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
  });

module.exports.NEW_USER_VALIDATION_SCHEMA = yup.object({
  firstName: NAME_VALIDATION_SCHEMA.required(),
  lastName: NAME_VALIDATION_SCHEMA.required(),
  email: EMAIL_VALIDATION_SCHEMA.required(),
  passwordHash: PASSWORD_VALIDATION_SCHEMA.required(),
  birthday: BIRTHDAY_VALIDATION_SCHEMA,
  gender: GENDER_VALIDATION_SCHEMA,
});


module.exports.UPDATE_USER_VALIDATION_SCHEMA = yup.object({
  firstName: NAME_VALIDATION_SCHEMA,
  lastName: NAME_VALIDATION_SCHEMA,
  email: EMAIL_VALIDATION_SCHEMA,
  passwordHash: PASSWORD_VALIDATION_SCHEMA,
  birthday: BIRTHDAY_VALIDATION_SCHEMA,
  gender: GENDER_VALIDATION_SCHEMA,
});