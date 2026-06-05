import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const accountSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      minlength: [11, "Contact number must be 11 digits"],
      maxlength: [11, "Contact number must be 11 digits"],
    },
    cnic: {
      type: String,
      required: [true, "CNIC number is required"],
      minlength: [13, "CNIC must be exactly 13 digits"],
      maxlength: [13, "CNIC must be exactly 13 digits"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["Male", "Female", "Other"],
        message: "{VALUE} is not a valid gender option",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "patient", "doctor"],
      default: "patient",
    },
    specialty: {
      type: String,
      default: null,
    },
    profileImage: {
      publicId: { type: String, default: null },
      imageUrl: { type: String, default: null },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving to database
accountSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Verify password against stored hash
accountSchema.methods.verifyPassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const Account =
  mongoose.models.Account || mongoose.model("Account", accountSchema);
