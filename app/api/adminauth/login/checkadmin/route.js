import { NextResponse } from "next/server";
import connectDB from "@/lib/connect-db";
import { verifyToken } from "@/lib/verifyToken";
import Admin from "@/models/Admin";

// GET (Retrieve bookings)
export async function GET(req) {
  await connectDB();

  console.log("check logged request received");

  const { valid, decoded, message } = verifyToken(req);
  const email = decoded.email;
  // Find the user by email

  console.log("validity -", valid);

  if (!valid) {
    return new Response(JSON.stringify({ message }), { status: 404 });
  }
  const user = await Admin.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  return NextResponse.json({ message: "Admin is logged in" }, { status: 200 });
}
