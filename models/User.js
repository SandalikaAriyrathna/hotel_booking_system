import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
    },
    password: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String, // Changed from Number to String
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures uniqueness of email
      match: [/.+@.+\..+/, "Please enter a valid email address"], // Email validation using regex
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields automatically

// Exporting the model (checks if the model exists, else creates a new one)
export default mongoose.models.User || mongoose.model("User", UserSchema);
