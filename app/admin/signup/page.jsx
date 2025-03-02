"use client";

import "./signup.css";
import React, { useState } from "react";
import { Container, Tab, Nav, Button, Form, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaGithub,
  FaHome,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2"; 
// Import the useRouter hook

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    contactNumber: "",
    email: "",
  });
  const [loginFormData, setloginFormData] = useState({
    email: "",
    password: "",
  });
  const [activeTab, setActiveTab] = useState("login");
  const [message, setMessage] = useState(""); // For showing success/error messages
  const router = useRouter(); // Initialize the router

  const handleSelect = (key) => {
    setActiveTab(key);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeLogin = (e) => {
    setloginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); // Parse the JSON response

      if (res.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: data.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          router.push("/room-style");
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Registration failed.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error(error);
    }
  };

  //Login API
  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginFormData), // Make sure loginFormData is an object containing email and password
      });

      const data = await res.json(); // Parse the JSON response

      if (res.status === 200) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          Swal.fire({
            title: 'Success!',
            text: 'Login successful!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            router.push("/");
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Login failed. No token received.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Login failed.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error("Login error:", error);
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
        <Nav
          variant="pills"
          className="mb-5 justify-content-between w-50 tab-between"
        >
          <Nav.Item>
            <Nav.Link eventKey="login">Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="register">Register</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Link href="/">
              <FaHome size={40} />
            </Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="w-50">
          <Tab.Pane eventKey="login">
            <div className="text-center mb-3">
              <p>Sign in with:</p>
              <div
                className="d-flex justify-content-between mx-auto"
                style={{ width: "40%" }}
              >
                <Button variant="link" className="m-1 text-primary">
                  <FaFacebookF />
                </Button>
                <Button variant="link" className="m-1 text-primary">
                  <FaTwitter />
                </Button>
                <Button variant="link" className="m-1 text-primary">
                  <FaGoogle />
                </Button>
                <Button variant="link" className="m-1 text-primary">
                  <FaGithub />
                </Button>
              </div>

              <p className="text-center mt-3">or:</p>
            </div>

            <Form onSubmit={handleSubmitLogin}>
              <Form.Group controlId="formLoginEmail" className="mb-4">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={handleChangeLogin}
                  name="email" // Added name attribute
                  value={loginFormData.email}
                  type="email"
                  placeholder="Enter email"
                  autocomplete="off"
                />
              </Form.Group>

              <Form.Group controlId="formLoginPassword" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={handleChangeLogin}
                  name="password" // Added name attribute
                  value={loginFormData.password}
                  type="password"
                  placeholder="Password"
                  autocomplete="off"
                />
              </Form.Group>

              <Row className="mb-4">
                <Col xs={6}>
                  <Form.Check type="checkbox" label="Remember me" />
                </Col>
                <Col xs={6} className="text-end">
                  <a href="/admin/forgotpassword/request">Forgot password?</a>
                </Col>
              </Row>

              <Button type="submit" variant="primary" className="w-100 mb-4">
                Sign in
              </Button>
              <p className="text-center">
                Not a member? <a href="#!">Register</a>
              </p>
              {message && <p className="text-center mt-3">{message}</p>}
            </Form>
          </Tab.Pane>

          <Tab.Pane eventKey="register">
            <div className="text-center mb-3">
              <p>Sign up with:</p>
              <div
                className="d-flex justify-content-between mx-auto"
                style={{ width: "40%" }}
              >
                <Button variant="link" className="m-1 text-primary">
                  <FaFacebookF />
                </Button>
                <Button variant="link" className="m-1 text-primary">
                  <FaTwitter />
                </Button>
                <Button variant="link" className="m-1 text-primary">
                  <FaGoogle />
                </Button>
                <Button variant="link" className="m-1 text-primary">
                  <FaGithub />
                </Button>
              </div>

              <p className="text-center mt-3">or:</p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className="mb-4">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="name" // Added name attribute
                  type="text"
                  value={formData.name}
                  placeholder="Enter name"
                />
              </Form.Group>

              <Form.Group controlId="formContactNumber" className="mb-4">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="contactNumber" // Added name attribute
                  type="text"
                  value={formData.contactNumber}
                  placeholder="Enter contact number"
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="email" // Added name attribute
                  type="email"
                  value={formData.email}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="password" // Added name attribute
                  type="password"
                  value={formData.password}
                  placeholder="Password"
                />
              </Form.Group>

              <Form.Group
                controlId="formTerms"
                className="d-flex justify-content-center mb-4"
              >
                <Form.Check
                  type="checkbox"
                  label="I have read and agree to the terms"
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100 mb-4">
                Sign up
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
