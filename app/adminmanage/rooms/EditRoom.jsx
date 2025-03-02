"use client";

import { Fragment, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditRoom = ({ room, onClose, onSave }) => {
    const [roomNumber, setRoomNumber] = useState(room.roomNumber);
    const [roomType, setRoomType] = useState(room.roomType);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSaveChanges = async () => {
      setError("");
      setSuccess("");
  
      try {
          const response = await fetch(`/api/rooms?id=${room._id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ roomNumber, roomType }),
          });
  
          if (!response.ok) {
              throw new Error('Error updating room');
          }
  
          const result = await response.json();
          setSuccess(result.message);
          onSave();
      } catch (error) {
          setError('There was an error updating the room. Please try again.');
          console.error('Error updating room:', error);
      }
  };
  

    return (
        <Fragment>
            <Modal show={true} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Room</Modal.Title>
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
                                type="text"
                                placeholder="Enter room type"
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                                className="form-control-style w-100 mt-2"
                            />
                        </Form.Group>
                        {error && <p className="text-danger mt-2">{error}</p>}
                        {success && <p className="text-success mt-2">{success}</p>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default EditRoom;
