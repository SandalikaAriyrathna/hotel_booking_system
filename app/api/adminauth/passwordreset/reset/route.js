import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/connect-db"; // MongoDB connection
import Admin from "@/models/Admin"; // User model

// Handle password reset with the token
export async function POST(req) {
  console.log("password reset request received ");

  try {
    const { token, newPassword } = await req.json();
    console.log("newPass", newPassword);
    console.log("token from backend ", token);

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Connect to the database
    await dbConnect();

    // Find the user by ID
    const user = await Admin.findById(decoded.userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return new Response(
      JSON.stringify({ message: "Password reset successful" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return new Response(
      JSON.stringify({ message: "Invalid or expired token" }),
      { status: 400 }
    );
  }
}
