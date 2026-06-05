import { Account } from "../models/account.model.js";
import { ApiError, asyncHandler } from "../middleware/error-handler.js";
import cloudinary from "cloudinary";

// Fetch all doctors
export const listDoctors = asyncHandler(async (req, res) => {
  const doctors = await Account.find({ role: "doctor" }).select("-password");
  res.status(200).json({ success: true, doctors });
});

// Register a new doctor (admin only)
export const registerDoctor = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    contactNumber,
    cnic,
    dateOfBirth,
    gender,
    password,
    specialty,
  } = req.body;

  if (
    !fullName ||
    !email ||
    !contactNumber ||
    !cnic ||
    !dateOfBirth ||
    !gender ||
    !password ||
    !specialty
  ) {
    throw new ApiError("All fields are required to register a doctor", 400);
  }

  const existingAccount = await Account.findOne({ email });
  if (existingAccount) {
    throw new ApiError("A doctor with this email already exists", 409);
  }

  let imageData = {
    publicId: "default",
    imageUrl:
      "https://res.cloudinary.com/dqc58m1ch/image/upload/v1714472061/default_doctor_avatar_z7m2t1.png",
  };

  if (req.files && req.files.avatar) {
    const { avatar } = req.files;
    const validTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!validTypes.includes(avatar.mimetype)) {
      throw new ApiError(
        "Invalid image format. Only PNG, JPEG, and WebP are supported.",
        400
      );
    }

    if (
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_KEY !== "your-cloudinary-api-key"
    ) {
      try {
        const uploadResult = await cloudinary.uploader.upload(
          avatar.tempFilePath
        );
        if (uploadResult && !uploadResult.error) {
          imageData = {
            publicId: uploadResult.public_id,
            imageUrl: uploadResult.secure_url,
          };
        }
      } catch (uploadErr) {
        console.error("Image upload failed, using default:", uploadErr.message);
      }
    }
  }

  const doctor = await Account.create({
    fullName,
    email,
    contactNumber,
    cnic,
    dateOfBirth,
    gender,
    password,
    role: "doctor",
    specialty,
    profileImage: imageData,
  });

  res.status(201).json({
    success: true,
    message: "Doctor registered successfully",
    doctor,
  });
});

// Register a new admin (admin only)
export const registerAdmin = asyncHandler(async (req, res) => {
  const { fullName, email, contactNumber, cnic, dateOfBirth, gender, password } =
    req.body;

  if (
    !fullName ||
    !email ||
    !contactNumber ||
    !cnic ||
    !dateOfBirth ||
    !gender ||
    !password
  ) {
    throw new ApiError("All fields are required to register an admin", 400);
  }

  const existingAccount = await Account.findOne({ email });
  if (existingAccount) {
    throw new ApiError("An admin with this email already exists", 409);
  }

  const admin = await Account.create({
    fullName,
    email,
    contactNumber,
    cnic,
    dateOfBirth,
    gender,
    password,
    role: "admin",
  });

  res.status(201).json({
    success: true,
    message: "Admin registered successfully",
    admin,
  });
});

// Remove a doctor (admin only)
export const removeDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const doctor = await Account.findById(id);

  if (!doctor) {
    throw new ApiError("Doctor not found", 404);
  }

  if (doctor.role !== "doctor") {
    throw new ApiError("This account is not a doctor", 400);
  }

  // Clean up cloud image if it's not the default
  if (doctor.profileImage?.publicId && doctor.profileImage.publicId !== "default") {
    try {
      await cloudinary.v2.uploader.destroy(doctor.profileImage.publicId);
    } catch (err) {
      console.error("Failed to remove cloud image:", err.message);
    }
  }

  await doctor.deleteOne();

  res.status(200).json({
    success: true,
    message: "Doctor removed successfully",
  });
});
