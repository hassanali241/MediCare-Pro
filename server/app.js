import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { config } from "dotenv";

import connectDatabase from "./config/db.js";
import errorHandler from "./middleware/error-handler.js";

import authRoutes from "./routes/auth.routes.js";
import staffRoutes from "./routes/staff.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";

// Load environment variables
config({ path: "./config/.env" });

const app = express();

// Connect to MongoDB
connectDatabase();

// Middleware stack
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/inquiries", inquiryRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Global error handler (must be last)
app.use(errorHandler);

export default app;
