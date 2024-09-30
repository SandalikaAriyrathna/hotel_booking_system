import dbConnect from "@/lib/connect-db"; // MongoDB connection
import Admin from "@/models/Admin"; // User model
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Generate a random token and send it via email
export async function POST(req) {
  try {
    const { email } = await req.json();

    // Connect to the database
    await dbConnect();

    // Check if the user exists
    const user = await Admin.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "Admin not found" }), {
        status: 404,
      });
    }

    // Create a password reset token (expires in 1 hour)
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Create a transporter to send the email
    const transporter = nodemailer.createTransport({
      service: "Gmail", // You can use any email service provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/?token=${resetToken}`;

    // Send the email with the reset link
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    return new Response(
      JSON.stringify({
        message:
          "Password reset email sent please check your email inbox and click the link to set the new password!..",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset request error:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error }),
      { status: 500 }
    );
  }
}
