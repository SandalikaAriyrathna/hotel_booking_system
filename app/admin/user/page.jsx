"use client";
import { useEffect, useState } from "react";
import { Table, Button, Spinner, Alert, Pagination } from "react-bootstrap";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // You can change this number for different page sizes

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Get current users for the page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Pagination logic
  const totalPages = Math.ceil(users.length / usersPerPage);

  const renderPaginationItems = () => {
    const pages = [];
    const pageRange = 1; // Number of pages to show around the current page

    // Helper to create a Pagination.Item
    const createPageItem = (pageNumber, isActive = false) => (
      <Pagination.Item key={pageNumber} active={isActive} onClick={() => setCurrentPage(pageNumber)}>
        {pageNumber}
      </Pagination.Item>
    );

    if (totalPages <= 1) return null;

    pages.push(
      <Pagination.First key="first" onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />,
      <Pagination.Prev key="prev" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
    );

    // Always show the first page
    pages.push(createPageItem(1, currentPage === 1));

    if (currentPage > pageRange + 2) {
      pages.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
    }

    // Show current page, and a few pages before and after
    for (let i = Math.max(2, currentPage - pageRange); i <= Math.min(totalPages - 1, currentPage + pageRange); i++) {
      pages.push(createPageItem(i, currentPage === i));
    }

    if (currentPage < totalPages - pageRange - 1) {
      pages.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
    }

    // Always show the last page
    if (totalPages > 1) {
      pages.push(createPageItem(totalPages, currentPage === totalPages));
    }

    pages.push(
      <Pagination.Next key="next" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />,
      <Pagination.Last key="last" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
    );

    return pages;
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return <Alert variant="danger">Error fetching users: {error}</Alert>;
  }

  return (
    <>
      <Table striped bordered hover className="text-nowrap">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">User Email</th>
            <th scope="col">Contact No</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{indexOfFirstUser + index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contactNumber}</td>
                <td>
                  <Button variant="warning" className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Custom Pagination */}
      <Pagination className="justify-content-center mt-4">
        {renderPaginationItems()}
      </Pagination>
    </>
  );
};

export default UserTable;
