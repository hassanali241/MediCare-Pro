// Custom API error class for structured error responses
export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Async wrapper to eliminate try-catch boilerplate in handlers
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle Mongoose duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `An account with this ${field} already exists`;
    statusCode = 409;
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    message = messages.join(". ");
    statusCode = 422;
  }

  // Handle invalid MongoDB ObjectId
  if (err.name === "CastError") {
    message = `Invalid ${err.path}: ${err.value}`;
    statusCode = 400;
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    message = "Session is invalid. Please sign in again.";
    statusCode = 401;
  }

  if (err.name === "TokenExpiredError") {
    message = "Session has expired. Please sign in again.";
    statusCode = 401;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
