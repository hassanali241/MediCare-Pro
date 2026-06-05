import mongoose from "mongoose";
import validator from "validator";

const inquirySchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters"],
    },
    senderEmail: {
      type: String,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    senderPhone: {
      type: String,
      required: [true, "Phone number is required"],
      minlength: [11, "Phone number must be 11 digits"],
      maxlength: [11, "Phone number must be 11 digits"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      minlength: [3, "Subject must be at least 3 characters"],
    },
    body: {
      type: String,
      required: [true, "Message body is required"],
      minlength: [10, "Message must be at least 10 characters"],
    },
  },
  {
    timestamps: true,
  }
);

export const Inquiry =
  mongoose.models.Inquiry || mongoose.model("Inquiry", inquirySchema);
