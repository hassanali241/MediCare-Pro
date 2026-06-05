import express from "express";
import {
  registerPatient,
  signIn,
  getProfile,
  signOut,
} from "../handlers/auth.handler.js";
import { verifySession } from "../middleware/verify-session.js";

const router = express.Router();

router.post("/register", registerPatient);
router.post("/sign-in", signIn);
router.get("/profile", verifySession(), getProfile);
router.get("/sign-out", verifySession(), signOut);

export default router;
