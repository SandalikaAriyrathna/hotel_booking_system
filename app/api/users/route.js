import { NextResponse } from 'next/server';
import connectDB from '@/lib/connect-db';
import User from '@/models/User';


export async function GET() {
    await connectDB();
  
    try {
      const users = await User.find({});
      return NextResponse.json(users);
    } catch (error) {
      return NextResponse.json({ message: 'Error fetching rooms', error: error.message }, { status: 500 });
    }
}