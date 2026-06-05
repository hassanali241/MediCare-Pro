import jwt from "jsonwebtoken";
import { Account } from "../models/account.model.js";
import { ApiError, asyncHandler } from "./error-handler.js";

// Unified session verification — checks the single 'session' cookie
// and validates user role in one middleware
export const verifySession = (...allowedRoles) => {
  return asyncHandler(async (req, res, next) => {
    const token = req.cookies.session;

    if (!token) {
      throw new ApiError("Please sign in to access this resource", 401);
    }

    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    const account = await Account.findById(decoded.accountId);

    if (!account) {
      throw new ApiError("Account not found. Please sign in again.", 401);
    }

    // Check if the user's role is authorized
    if (allowedRoles.length > 0 && !allowedRoles.includes(account.role)) {
      throw new ApiError(
        "You do not have permission to access this resource",
        403
      );
    }

    req.account = account;
    next();
  });
};
