import bcrypt from "bcrypt";
import dbConnect from "@/lib/connect-db"; // A file where MongoDB connection is handled
import Admin from "@/models/Admin"; // Importing your User model

// Named export for the POST method (registration)
export async function POST(req) {
  try {
    const { name, email, password, contactNumber } = await req.json(); // Get data from request body

    console.log("Request received");

    // Connect to the database
    await dbConnect();

    // Check if the user already exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "Admin already exists" }), {
        status: 400,
      });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new Admin({
      name,
      email,
      password: hashedPassword,
      contactNumber,
    });

    // Save the new user in the database
    await newUser.save();

    // Return success response
    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during user registration:", error);

    // Return error response
    return new Response(
      JSON.stringify({ message: "Something went wrong", error }),
      { status: 500 }
    );
  }
}
