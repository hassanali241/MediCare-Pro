import express from "express";
import {
  submitInquiry,
  listInquiries,
} from "../handlers/inquiry.handler.js";
import { verifySession } from "../middleware/verify-session.js";

const router = express.Router();

router.post("/", submitInquiry);
router.get("/", verifySession("admin"), listInquiries);

export default router;
