import { Inquiry } from "../models/inquiry.model.js";
import { ApiError, asyncHandler } from "../middleware/error-handler.js";

// Submit a new inquiry/contact message
export const submitInquiry = asyncHandler(async (req, res) => {
  const { senderName, senderEmail, senderPhone, subject, body } = req.body;

  if (!senderName || !senderEmail || !senderPhone || !subject || !body) {
    throw new ApiError("All fields are required to submit an inquiry", 400);
  }

  await Inquiry.create({ senderName, senderEmail, senderPhone, subject, body });

  res.status(201).json({
    success: true,
    message: "Your inquiry has been submitted. We will get back to you soon.",
  });
});

// Get all inquiries (admin)
export const listInquiries = asyncHandler(async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, inquiries });
});
