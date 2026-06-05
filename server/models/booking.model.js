import mongoose from "mongoose";
import validator from "validator";

const bookingSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      minlength: [3, "Patient name must be at least 3 characters"],
    },
    patientEmail: {
      type: String,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    patientPhone: {
      type: String,
      required: [true, "Phone number is required"],
      minlength: [11, "Phone number must be 11 digits"],
      maxlength: [11, "Phone number must be 11 digits"],
    },
    patientCnic: {
      type: String,
      required: [true, "CNIC is required"],
      minlength: [13, "CNIC must be 13 digits"],
      maxlength: [13, "CNIC must be 13 digits"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female"],
    },
    scheduledDate: {
      type: String,
      required: [true, "Appointment date is required"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
    },
    assignedDoctor: {
      name: {
        type: String,
        required: [true, "Doctor name is required"],
      },
      doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Doctor ID is required"],
      },
    },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Patient reference is required"],
    },
    visitCompleted: {
      type: Boolean,
      default: false,
    },
    remarks: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
