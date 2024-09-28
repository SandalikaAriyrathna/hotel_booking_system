"use client";

import { Fragment, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const AddRoom = () => {
  const [scrollShow, setScrollShow] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [acType, setAcType] = useState("");
  const [smallDesc, setSmallDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [bedCount, setBedCount] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([]); // State for multiple images
  const [amenities, setAmenities] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  // Convert single image to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setMainImage(reader.result.split(",")[1]); // Get only the Base64 data
    };
    reader.readAsDataURL(file);
  };

  // Handle multiple images input and convert them to Base64
  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const promises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result.split(",")[1]); // Base64 encoding without prefix
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((base64Images) => {
      setImages(base64Images); // Set multiple images as an array of Base64
    });
  };

  const handleSaveChanges = async () => {
    setError("");
    setSuccess("");
    setLoading(true); // Start loading

    // Basic validation
    if (
      !roomNumber ||
      !roomType ||
      !price ||
      !acType ||
      !smallDesc ||
      !longDesc ||
      !bedCount ||
      !guestCount
    ) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomNumber,
          roomType,
          price,
          acType,
          smallDesc,
          longDesc,
          bedCount,
          guestCount,
          mainImage, // Base64 encoded main image
          images, // Array of Base64 encoded images
          amenities: amenities.split(",").map((item) => item.trim()), // Convert string to array
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Error adding room");
      }

      setSuccess(result.message);

      // Clear all fields
      setRoomNumber("");
      setRoomType("");
      setPrice("");
      setAcType("");
      setSmallDesc("");
      setLongDesc("");
      setBedCount("");
      setGuestCount("");
      setMainImage(null);
      setImages([]); // Clear multiple images
      setAmenities("");
      setScrollShow(false);
    } catch (error) {
      setError(error.message);
      console.error("Error adding room:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Fragment>
      <Button
        className="mb-5"
        variant="primary"
        onClick={() => setScrollShow(true)}
      >
        Add Room
      </Button>
      <Modal
        className="modal-dialog-scrollable"
        show={scrollShow}
        onHide={() => setScrollShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRoomNumber">
              <Form.Label className="mt-2">Room Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter room number"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="form-control-style w-100 mt-2"
              />
            </Form.Group>
            <Form.Group controlId="formRoomType">
              <Form.Label className="mt-2">Room Type</Form.Label>
              <Form.Control
                as="select" // Change from type="text" to as="select"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="form-control-style w-100 mt-2"
              >
                <option value="">Select a room type</option>{" "}
                {/* Default option */}
                <option value="Luxury Room">Luxury Room</option>
                <option value="Double">Double</option>
                <option value="Family">Family</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label className="mt-2">Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control-style w-100 mt-2"
              />
            </Form.Group>
            <Form.Group controlId="formAcType">
              <Form.Label className="mt-2">AC Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter AC type"
                value={acType}
                onChange={(e) => setAcType(e.target.value)}
                className="form-control-style w-100 mt-2"
              />
            </Form.Group>
            <Form.Group controlId="formSmallDesc">
              <Form.Label className="mt-2">Short Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter short description"
                value={smallDesc}
                onChange={(e) => setSmallDesc(e.target.value)}
                className="form-control-style w-100 mt-2"
              />
            </Form.Group>
            <Form.Group controlId="formLongDesc">
              <Form.Label className="mt-2">Long Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter long description"
                value={longDesc}
                onChange={(e) => setLongDesc(e.target.value)}
                className="form-control-style w-100 mt-2"
              />
            </Form.Group>
            <Form.Group controlId="formBedCount">
              <Form.Label className="mt-2">Bed Count</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter bed count"
                value={bedCount}
                onChange={(e) => setBedCount(e.target.value)}
                className="form-control-style w-100 mt-2"
              />
            </Form.Group>
            <Form.Group controlId="formGuestCount">
              <Form.Label className="mt-2">Guest Count</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter guest count"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="form-control-style w-100 mt-2"
              />
            </Form.Group>
            <Form.Group controlId="formMainImage">
              <Form.Label className="mt-2">Main Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control-style w-100 mt-2"
              />
              {mainImage && <p className="mt-2">Main image ready to upload</p>}
            </Form.Group>
            <Form.Group controlId="formImages">
              <Form.Label className="mt-2">Other Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={handleMultipleImagesChange}
                className="form-control-style w-100 mt-2"
              />
              {images.length > 0 && (
                <p className="mt-2">{images.length} images ready to upload</p>
              )}
            </Form.Group>
            <Form.Group controlId="formAmenities">
              <Form.Label className="mt-2">
                Amenities (comma separated)
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter amenities"
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
                className="form-control-style w-100 mt-2"
              />
            </Form.Group>
            {error && <p className="text-danger mt-2">{error}</p>}
            {success && <p className="text-success mt-2">{success}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setScrollShow(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveChanges}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default AddRoom;
