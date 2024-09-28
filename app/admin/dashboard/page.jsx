"use client";

import SEO from "@/components/seo";
import { Col, Nav, Row, Tab, Table } from "react-bootstrap";
import Bookings from "../bookings/page";
import Rooms from "../rooms/page";
import NavbarTop from "../NavbarTop";
import Dash from "./dashboard";
import Users from "../user/page";



const Dashboard = () => {
  return (
    <>
      <SEO pageTitle="Dashboard" />
      <NavbarTop/>
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
                   <Dash/>
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
};

export default Dashboard;
