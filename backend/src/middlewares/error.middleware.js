import { ApiError } from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
  let error = err;

  // If error is not an instance of ApiError, convert it into one
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;

    // Handle known Mongoose/JWT error types and map them to proper status codes
    let message = error.message || "Internal Server Error";

    if (error.name === "CastError") {
      message = `Invalid value for field: ${error.path}`;
    }

    if (error.name === "ValidationError") {
      message = Object.values(error.errors).map((val) => val.message).join(", ");
    }

    if (error.code === 11000) {
      // Mongo duplicate key error
      const field = Object.keys(error.keyValue)[0];
      message = `Duplicate value for field: ${field}`;
    }

    if (error.name === "JsonWebTokenError") {
      message = "Invalid token";
    }

    if (error.name === "TokenExpiredError") {
      message = "Token expired";
    }

    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    success: false,
    message: error.message,
    errors: error.errors,
    // only show stack trace in development
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {})
  };

  return res.status(error.statusCode).json(response);
};

export { errorHandler };