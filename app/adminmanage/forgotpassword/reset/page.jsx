"use client";

import "./signup.css";
import React, { useState } from "react";
import { Container, Tab, Nav, Button, Form, Row, Col } from "react-bootstrap";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams(); // Hook to get query params
  const token = searchParams.get("token"); // Extract the "token" from the URL
  console.log(token);
  const router = useRouter(); // Initialize the router

  const [activeTab, setActiveTab] = useState("login");
  const [message, setMessage] = useState(""); // For showing success/error messages
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSelect = (key) => {
    setActiveTab(key);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both password fields match
    if (newPassword !== reEnterPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      alert("Passwords do not match. Please try again.");
      setNewPassword("");
      setReEnterPassword("");
      return; // Stop form submission if passwords don't match
    }
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/passwordreset/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json(); // Parse the JSON response
      if (res.status === 404) {
        setMessage(data.message); // Expected message from backend
      }
      if (res.status === 200) {
        setMessage(data.message);
        router.push("/admin/signup"); // Redirect to
      } else {
        setMessage(
          data.message || "Password reset failed try again in shortly"
        ); // Handle errors
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <Container
      className="p-3 my-5 d-flex flex-column"
      style={{
        minHeight: "90vh",
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
      }}
    >
      <Tab.Container activeKey={activeTab} onSelect={handleSelect}>
        <Tab.Content className="w-50">
          <Tab.Pane eventKey="login">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formPassword" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => setNewPassword(e.target.value)}
                  name="newPassword" // Added name attribute
                  type="password"
                  value={newPassword}
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-4">
                <Form.Label>Re enter Password</Form.Label>
                <Form.Control
                  onChange={(e) => setReEnterPassword(e.target.value)}
                  name="reEnterPassword" // Added name attribute
                  type="password"
                  value={reEnterPassword}
                  placeholder="Password"
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100 mb-4">
                Reset Password
              </Button>

              {message && <p className="text-center mt-3">{message}</p>}
            </Form>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default Page;
