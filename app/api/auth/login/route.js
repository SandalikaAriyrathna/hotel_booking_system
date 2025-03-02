import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/connect-db"; // MongoDB connection file
import User from "@/models/User"; // User model

// Named export for the POST method (login)
export async function POST(req) {
  try {
    const { email, password } = await req.json(); // Extract email and password from the request body
    console.log("Login request received");
    console.log("email", email);
    // Connect to the database
    await dbConnect();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ message: "Invalid password" }), {
        status: 401,
      });
    }

    // Create a JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET, // Make sure to add this environment variable in .env.local
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Return the token to the user
    return new Response(
      JSON.stringify({ message: "Login successful", token }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error }),
      { status: 500 }
    );
  }
}
