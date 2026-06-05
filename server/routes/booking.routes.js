import express from "express";
import {
  createBooking,
  listBookings,
  updateBookingStatus,
  deleteBooking,
} from "../handlers/booking.handler.js";
import { verifySession } from "../middleware/verify-session.js";

const router = express.Router();

router.post("/", verifySession("patient"), createBooking);
router.get("/", verifySession("admin"), listBookings);
router.patch("/:id", verifySession("admin"), updateBookingStatus);
router.delete("/:id", verifySession("admin"), deleteBooking);

export default router;
