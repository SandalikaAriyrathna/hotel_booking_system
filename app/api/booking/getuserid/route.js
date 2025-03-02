import { NextResponse } from 'next/server';
import connectDB from '@/lib/connect-db';
import Booking from '@/models/Booking';
import { verifyToken } from '@/lib/verifyToken'; 



// GET (Retrieve bookings)
export async function GET(req) {
  await connectDB();

  
  console.log("create booking request received");

  const { valid, decoded, message } = verifyToken(req);

  console.log("validity -", valid);

  if (!valid) {
    return new Response(JSON.stringify({ message }), { status: 401 });
  }
  const userId = decoded.userId;

  try {
    if (userId) {
        const bookings = await Booking.find({ userId: userId });
        
        if (!bookings || bookings.length === 0) {
          return new Response(JSON.stringify({ message: "No bookings found for this user" }), { status: 404 });
        }
      
        return new Response(JSON.stringify({ message: "Bookings retrieved successfully", bookings }), { status: 200 });
      }
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching bookings', error: error.message }, { status: 500 });
  }
}

