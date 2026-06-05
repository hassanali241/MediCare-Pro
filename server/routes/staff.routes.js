import express from "express";
import {
  listDoctors,
  registerDoctor,
  registerAdmin,
  removeDoctor,
} from "../handlers/staff.handler.js";
import { verifySession } from "../middleware/verify-session.js";

const router = express.Router();

router.get("/doctors", listDoctors);
router.post("/doctor", verifySession("admin"), registerDoctor);
router.post("/admin", verifySession("admin"), registerAdmin);
router.delete("/doctor/:id", verifySession("admin"), removeDoctor);

export default router;
