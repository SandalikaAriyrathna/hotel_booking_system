"use client";

import SEO from "@/components/seo";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import Bookings from "../bookings/page";
import Rooms from "../rooms/page";
import NavbarTop from "../NavbarTop";
import Dash from "./dashboard";
import Users from "../user/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For client-side navigation

const Dashboard = () => {
  const [token, setToken] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Next.js router for client-side navigation

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      verifyToken(storedToken);
    } else {
      router.push("/adminmanage/signup"); // Redirect if no token
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch("/api/adminauth/login/checkadmin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        setIsVerified(true);
      } else {
        router.push("/adminmanage/signup"); // Redirect if token is invalid or expired
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      router.push("/adminmanage/signup"); // Redirect if there's an error
    } finally {
      setLoading(false); // Stop loading once the verification is done
    }
  };

  // Show loading spinner or empty screen while token is being verified
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render the dashboard only if the token is verified
  if (isVerified) {
    return (
      <>
        <SEO pageTitle="Dashboard" />
        <NavbarTop />
        <Tab.Container id="left-tabs-example" defaultActiveKey="dashboard">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="bookings">Bookings</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="rooms">Rooms</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="user">Users</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey="dashboard">
                  <Dash />
                </Tab.Pane>
                <Tab.Pane eventKey="bookings">
                  <Bookings />
                </Tab.Pane>
                <Tab.Pane eventKey="rooms">
                  <Rooms />
                </Tab.Pane>
                <Tab.Pane eventKey="user">
                  <Users />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </>
    );
  }

  // You could also render a "Not Authorized" message if needed, though redirection happens in most cases.
  return <p>Not authorized. Redirecting...</p>;
};

export default Dashboard;
