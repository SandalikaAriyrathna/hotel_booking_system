import mongoose from 'mongoose';


const BookingSchema = new mongoose.Schema({
    roomNumber: {
      type: String,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    userId : {
      type: String,
      required: true,
    },
    contactNo : {
      type: String,
      required: true,
    },
    checkIn : {
      type: String,
      required: true,
    },
    checkOut : {
      type: String,
      required: true,
    },
    guestCount : {
      type: String,
      required: true,
    }
  });
  
  export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
  