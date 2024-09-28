"use client";

import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import styles for react-toastify

const Sidebar = () => {
  const router = useRouter(); // Initialize the router
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    roomNumber: "",
    roomType: "",
    userId: "",
    contactNo: "",
    checkIn: "",
    checkOut: "",
    guestCount: "",
  });

  // Fetch room data from the API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms");
        const data = await response.json();
        setRooms(data); // Store the fetched rooms in the state
      } catch (error) {
        console.error("Error fetching rooms:", error);
        toast.error("Error fetching rooms. Please try again.");
      }
    };

    fetchRooms();
  }, []);

  // Handle modal open and close
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmitForLogged = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/auth/login/checklogged", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        // alert("You must be logged in first: ");
        toast.error("You must be logged in first.");
        router.push("/admin/signup");
      }
      if (response.status === 200) {
        handleShow();
      }
    } catch (error) {
      toast.error("Error checking login status.");
      console.error("Error submitting booking:", error);
    }
  };

  // Submit form data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingDetails),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Booking successful");
        handleClose();
        // Clear form inputs by resetting formData to initial state
        setFormData({
          roomNumber: "",
          roomType: "",
          userId: "",
          checkIn: "",
          checkOut: "",
          guestCount: "",
        });
      }
      if (response.status === 401) {
        toast.error("You must be logged in first.");
        router.push("/admin/signup");
      } else {
        toast.error("Error creating booking: " + data.message);
      }
    } catch (error) {
      toast.error("Error submitting booking.");
      console.error("Error submitting booking:", error);
    }
  };

  return (
    <div className="col-xl-3 col-lg-4 lg-mb-30">
      <div className="all__sidebar">
        <div className="all__sidebar-item">
          <h5>Your Price</h5>
          <div className="all__sidebar-item-price">
            <ul>
              <li>
                <i className="fal fa-bed-alt"></i>(3) bed's
              </li>
              <li>
                <i className="fal fa-users"></i>(6) Guest's
              </li>
            </ul>
            <br />
            {/* <h4>
              $219<span>/Night</span>
            </h4> */}
            {/* Trigger modal */}
            <Button className="theme-btn" onClick={handleSubmitForLogged}>
              Book Now<i className="fal fa-long-arrow-right"></i>
            </Button>
          </div>
        </div>

        {/* Other sidebar items here... */}

        {/* Modal for booking */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Book Your Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Room Number</Form.Label>
                <Form.Select
                  name="roomNumber"
                  value={bookingDetails.roomNumber}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Room Number</option>
                  {rooms.map((room) => (
                    <option key={room._id} value={room.roomNumber}>
                      {room.roomNumber}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Room Type</Form.Label>
                <Form.Select
                  name="roomType"
                  value={bookingDetails.roomType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Room Type</option>
                  {rooms.map((room) => (
                    <option key={room._id} value={room.roomType}>
                      {room.roomType}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  name="userId"
                  value={bookingDetails.userId}
                  onChange={handleInputChange}
                  placeholder="Enter user ID"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>User Contact No</Form.Label>
                <Form.Control
                  type="text"
                  name="contactNo"
                  value={bookingDetails.contactNo}
                  onChange={handleInputChange}
                  placeholder="Enter Contact Number"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Check In</Form.Label>
                <Form.Control
                  type="date"
                  name="checkIn"
                  value={bookingDetails.checkIn}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Check Out</Form.Label>
                <Form.Control
                  type="date"
                  name="checkOut"
                  value={bookingDetails.checkOut}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Guest Count</Form.Label>
                <Form.Control
                  type="number"
                  name="guestCount"
                  value={bookingDetails.guestCount}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Sidebar;
