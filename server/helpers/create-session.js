import jwt from "jsonwebtoken";

// Creates a JWT session and sets it as an httpOnly cookie
const createSession = (account, message, statusCode, res) => {
  const payload = {
    accountId: account._id,
    role: account.role,
  };

  const token = jwt.sign(payload, process.env.SESSION_SECRET, {
    expiresIn: process.env.SESSION_LIFETIME || "7d",
  });

  const cookieMaxAge =
    parseInt(process.env.COOKIE_DAYS || "7") * 24 * 60 * 60 * 1000;

  res
    .status(statusCode)
    .cookie("session", token, {
      httpOnly: true,
      maxAge: cookieMaxAge,
      sameSite: "lax",
    })
    .json({
      success: true,
      message,
      account: {
        _id: account._id,
        fullName: account.fullName,
        email: account.email,
        role: account.role,
      },
    });
};

export default createSession;
