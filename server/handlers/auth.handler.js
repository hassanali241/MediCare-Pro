import { Account } from "../models/account.model.js";
import { ApiError, asyncHandler } from "../middleware/error-handler.js";
import createSession from "../helpers/create-session.js";

// Register a new patient account
export const registerPatient = asyncHandler(async (req, res) => {
  const { fullName, email, contactNumber, cnic, dateOfBirth, gender, password } =
    req.body;

  if (
    !fullName ||
    !email ||
    !contactNumber ||
    !cnic ||
    !dateOfBirth ||
    !gender ||
    !password
  ) {
    throw new ApiError("All fields are required to create an account", 400);
  }

  const existingAccount = await Account.findOne({ email });
  if (existingAccount) {
    throw new ApiError("An account with this email already exists", 409);
  }

  const account = await Account.create({
    fullName,
    email,
    contactNumber,
    cnic,
    dateOfBirth,
    gender,
    password,
    role: "patient",
  });

  createSession(account, "Account created successfully", 201, res);
});

// Sign in to an existing account
export const signIn = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    throw new ApiError("Email, password and role are required", 400);
  }

  const account = await Account.findOne({ email }).select("+password");
  if (!account) {
    throw new ApiError("Invalid email or password", 401);
  }

  const passwordValid = await account.verifyPassword(password);
  if (!passwordValid) {
    throw new ApiError("Invalid email or password", 401);
  }

  if (account.role !== role) {
    throw new ApiError(`No ${role} account found with this email`, 403);
  }

  createSession(account, "Signed in successfully", 200, res);
});

// Get current account profile
export const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    account: req.account,
  });
});

// Sign out — clear session cookie
export const signOut = asyncHandler(async (req, res) => {
  res
    .status(200)
    .cookie("session", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .json({
      success: true,
      message: "Signed out successfully",
    });
});
