"use client";

import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

const Bookings = () => {
  const [bookings, setBookings] = useState([]); // State to hold booking data
  const [loading, setLoading] = useState(true); // State to handle loading status

  // Function to fetch bookings from API
  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/booking"); // Assuming this is the correct API endpoint
      const data = await response.json();
      setBookings(data); // Set the booking data in the state
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
  };

  // Fetch bookings when component mounts
  useEffect(() => {
    fetchBookings();
  }, []);

  // Function to handle deleting a booking
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/booking?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setBookings(bookings.filter((booking) => booking._id !== id)); // Remove the deleted booking from the state
      } else {
        console.error("Error deleting booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  if (loading) {
    return <div>Loading bookings...</div>; // Display loading message while fetching data
  }

  return (
    <>
      <Table variant="success" className="text-nowrap">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Room No</th>
            <th scope="col">Room Type</th>
            {/* <th scope="col">User Id</th> */}
            <th scope="col">User Contact</th>
            <th scope="col">Check In</th>
            <th scope="col">Check Out</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <tr key={booking._id}>
                <th scope="row">{index + 1}</th>
                <td>{booking.roomNumber}</td>
                <td>{booking.roomType}</td>
                {/* <td>{booking.userId}</td> */}
                <td>{booking.contactNo || "N/A"}</td> {/* Add userContact if available */}
                <td>{booking.checkIn}</td>
                <td>{booking.checkOut}</td>
                <td>
                  <Button variant="warning" className="me-2">
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Bookings;
