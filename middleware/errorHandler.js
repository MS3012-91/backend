const createHttpError = require('http-errors');
const {ValidationError, BaseError} = require ('sequelize');

module.exports.errorHandler = (err, req, res, next) => {
  if (req.headersSent) {
    return;
  }
  const status = err.status ?? 500;
  const message = err.message ?? "Server Error";
  res.status(status).send(message);
};

module.exports.dbErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(422).send(err.errors[0].message)
  }
  if (err instanceof BaseError) {
     return next (createHttpError(500, 'Database Error'))
  }
  next(err)
};