import { Booking } from "../models/booking.model.js";
import { Account } from "../models/account.model.js";
import { ApiError, asyncHandler } from "../middleware/error-handler.js";

// Create a new appointment booking
export const createBooking = asyncHandler(async (req, res) => {
  const {
    patientName,
    patientEmail,
    patientPhone,
    patientCnic,
    dateOfBirth,
    gender,
    scheduledDate,
    department,
    doctorId,
    address,
    remarks,
  } = req.body;

  if (
    !patientName ||
    !patientEmail ||
    !patientPhone ||
    !patientCnic ||
    !dateOfBirth ||
    !gender ||
    !scheduledDate ||
    !department ||
    !doctorId ||
    !address
  ) {
    throw new ApiError("Please fill in all required fields", 400);
  }

  // Verify the doctor exists and belongs to the correct department
  const doctor = await Account.findOne({
    _id: doctorId,
    role: "doctor",
    specialty: department,
  });

  if (!doctor) {
    throw new ApiError(
      "Selected doctor not found in this department",
      404
    );
  }

  const booking = await Booking.create({
    patientName,
    patientEmail,
    patientPhone,
    patientCnic,
    dateOfBirth,
    gender,
    scheduledDate,
    department,
    assignedDoctor: {
      name: doctor.fullName,
      doctorId: doctor._id,
    },
    bookedBy: req.account._id,
    address,
    remarks: remarks || "",
  });

  res.status(201).json({
    success: true,
    message: "Appointment booked successfully",
    booking,
  });
});

// Get all bookings (admin)
export const listBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, bookings });
});

// Update booking status (admin)
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);

  if (!booking) {
    throw new ApiError("Booking not found", 404);
  }

  const updated = await Booking.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Booking status updated",
    booking: updated,
  });
});

// Delete a booking (admin)
export const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);

  if (!booking) {
    throw new ApiError("Booking not found", 404);
  }

  await booking.deleteOne();

  res.status(200).json({
    success: true,
    message: "Booking deleted successfully",
  });
});
