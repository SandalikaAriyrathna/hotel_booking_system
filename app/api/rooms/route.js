// app/api/rooms/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/connect-db";
import Room from "@/models/Room";
import multer from "multer";

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store images in memory as buffer
const upload = multer({ storage });

export async function POST(req) {
  try {
    await connectDB();

    // Parse the incoming request body
    const body = await req.json();

    const {
      roomNumber,
      roomType,
      price,
      acType,
      smallDesc,
      longDesc,
      bedCount,
      guestCount,
      mainImage,
      images,
      amenities,
    } = body;

    // Create new Room with the parsed data
    const newRoom = new Room({
      roomNumber,
      roomType,
      price,
      acType,
      smallDesc,
      longDesc,
      bedCount,
      guestCount,
      mainImage,
      images,
      amenities,
    });

    // Save the room to the database
    await newRoom.save();

    return NextResponse.json({
      message: "Room added successfully",
      room: newRoom,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding room", error: error.message },
      { status: 500 }
    );
  }
}


export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get('id'); 

  try {
    if (roomId) {
      // Fetch the room by ID
      const room = await Room.findById(roomId);

      if (!room) {
        return NextResponse.json({ message: 'Room not found' }, { status: 404 });
      }

      return NextResponse.json(room);
    } else {
      // Fetch all rooms if no ID is provided
      const rooms = await Room.find({});
      return NextResponse.json(rooms);
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching rooms", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("id");

  if (!roomId) {
    return NextResponse.json(
      { message: "Room ID not provided" },
      { status: 400 }
    );
  }

  try {
    const { roomNumber, roomType } = await req.json();
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { roomNumber, roomType },
      { new: true }
    );

    if (!updatedRoom) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Room updated successfully",
      room: updatedRoom,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating room", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("id");

  if (!roomId) {
    return NextResponse.json(
      { message: "Room ID not provided" },
      { status: 400 }
    );
  }

  try {
    const deletedRoom = await Room.findByIdAndDelete(roomId);

    if (!deletedRoom) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Room deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting room", error: error.message },
      { status: 500 }
    );
  }
}
