const errorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  // send error to console
  console.log(err.stack.red);

  // moongoose bad objectId
  if (err.name === 'CastError') {
    const message = `Resourse with id ${err.value} not found`;
    error = new errorResponse(message, 404);
  }

  // mongoose duplicate key error
  if (err.code === 11000) {
    const message = `A field with the input value already exists`;
    error = new errorResponse(message, 400);
  }
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new errorResponse(message, 400);
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' });
  next();
};

module.exports = errorHandler;

// TODO: handle errors more efficiently
