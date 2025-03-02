import { NextResponse } from "next/server";
import connectDB from "@/lib/connect-db";
import { verifyToken } from "@/lib/verifyToken";

// GET (Retrieve bookings)
export async function GET(req) {
  await connectDB();

  console.log("check logged request received");

  const { valid, decoded, message } = verifyToken(req);

  console.log("validity -", valid);

  if (!valid) {
    return new Response(JSON.stringify({ message }), { status: 401 });
  }

  return NextResponse.json({ message: "User is logged in" }, { status: 200 });
}
