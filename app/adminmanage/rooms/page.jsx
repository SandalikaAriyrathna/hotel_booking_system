"use client";

import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import AddRoom from "./AddRoom";
import EditRoom from "./EditRoom";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('/api/rooms');
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    const handleDelete = async (roomId) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            try {
                const response = await fetch(`/api/rooms?id=${roomId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Error deleting room');
                }

                // Remove the room from the state
                setRooms(rooms.filter(room => room._id !== roomId));
                alert('Room deleted successfully');
            } catch (error) {
                console.error('Error deleting room:', error);
            }
        }
    };

    const handleEdit = (room) => {
        setSelectedRoom(room);
        setShowEditModal(true);
    };

    const handleSaveEdit = () => {
        setShowEditModal(false);
        // Refresh the room list after editing
        const fetchRooms = async () => {
            try {
                const response = await fetch('/api/rooms');
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };
        fetchRooms();
    };

    return (
        <>
            <AddRoom />
            <Table variant="success" className="text-nowrap">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Room Number</th>
                        <th scope="col">Room Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room, index) => (
                        <tr key={room._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{room.roomNumber}</td>
                            <td>{room.roomType}</td>
                            <td>
                                <Button 
                                    variant="warning" 
                                    onClick={() => handleEdit(room)}
                                    className="me-2"
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant="danger" 
                                    onClick={() => handleDelete(room._id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {showEditModal && (
                <EditRoom 
                    room={selectedRoom} 
                    onClose={() => setShowEditModal(false)} 
                    onSave={handleSaveEdit} 
                />
            )}
        </>
    );
};

export default Rooms;
