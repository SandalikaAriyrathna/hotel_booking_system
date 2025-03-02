"use client";

import "./signup.css";
import React, { useState } from "react";
import { Container, Tab, Nav, Button, Form, Row, Col } from "react-bootstrap";

const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [activeTab, setActiveTab] = useState("login");
  const [message, setMessage] = useState(""); // For showing success/error messages

  const handleSelect = (key) => {
    setActiveTab(key);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/passwordreset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); // Parse the JSON response

      if (res.status === 200) {
        setMessage(data.message); // Expected message from backend
      } else {
        setMessage(data.message || "Registration failed."); // Handle errors
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error(error);
      console.log(data);
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
              <Form.Group controlId="formLoginEmail" className="mb-4">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="email" // Added name attribute
                  value={formData.email}
                  type="email"
                  placeholder="Enter email"
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
