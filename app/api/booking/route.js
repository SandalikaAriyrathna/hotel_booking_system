import { NextResponse } from 'next/server';
import connectDB from '@/lib/connect-db';
import Booking from '@/models/Booking';
import { verifyToken } from '@/lib/verifyToken'; 

// POST (Create a new booking)
export async function POST(req) {

  console.log("create booking request received");

  const { valid, decoded, message } = verifyToken(req);

  console.log("validity -", valid);

  if (!valid) {
    return new Response(JSON.stringify({ message }), { status: 401 });
  }

  try {
    await connectDB();

    // Parse the incoming request body
    const body = await req.json();
    const userId = decoded.userId;
    console.log("decoded from auth ", userId);

    const {
      roomNumber,
      roomType,
      
      contactNo,
      checkIn,
      checkOut,
      guestCount,
    } = body;

    // Create a new Booking with the parsed data
    const newBooking = new Booking({
      roomNumber,
      roomType,
      userId,
      
      contactNo,
      checkIn,
      checkOut,
      guestCount,
    });
    console.log("before save")

    // Save the booking to the database
    await newBooking.save();

    return NextResponse.json({ message: 'Booking created successfully', booking: newBooking }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating booking', error: error.message }, { status: 500 });
  }
}

// GET (Retrieve bookings)
export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const bookingId = searchParams.get('id');

  try {
    if (bookingId) {
      // Fetch a specific booking by ID
      const booking = await Booking.findById(bookingId);

      if (!booking) {
        return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
      }

      return NextResponse.json(booking);
    } else {
      // Fetch all bookings if no ID is provided
      const bookings = await Booking.find({});
      return NextResponse.json(bookings);
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching bookings', error: error.message }, { status: 500 });
  }
}

// PUT (Update a booking)
export async function PUT(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const bookingId = searchParams.get('id');

  if (!bookingId) {
    return NextResponse.json({ message: 'Booking ID not provided' }, { status: 400 });
  }

  try {
    const { roomNumber, roomType, checkIn, checkOut, guestCount } = await req.json();
    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, {
      roomNumber,
      roomType,
      checkIn,
      checkOut,
      guestCount
    }, { new: true });

    if (!updatedBooking) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Booking updated successfully', booking: updatedBooking });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating booking', error: error.message }, { status: 500 });
  }
}

// DELETE (Delete a booking)
export async function DELETE(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const bookingId = searchParams.get('id');

  if (!bookingId) {
    return NextResponse.json({ message: 'Booking ID not provided' }, { status: 400 });
  }

  try {
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting booking', error: error.message }, { status: 500 });
  }
}
