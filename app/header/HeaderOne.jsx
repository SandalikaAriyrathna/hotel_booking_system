"use client";

import React, { useEffect, useState } from "react";
import { Blog, Home, Page, Room } from "./Menu";
import DropDown from "./DropDown";
import { Modal, Button, Form } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeaderOne({ variant }) {
  const router = useRouter(); // Initialize the router
  const [showModal, setShowModal] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    });
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Submit form data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/booking/getuserid", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        //alert("Booking info retrieved  successful" + data);
        handleShow();
      }
      if (response.status === 401) {
        alert("You must be logged in first: ");
        router.push("/admin/signup");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  return (
    <div
      className={`header__sticky ${variant ? variant : ""} ${
        isSticky ? "header__sticky-sticky-menu" : ""
      }`}
    >
      <div className="header__area">
        <div className="container custom__container">
          <div className="header__area-menubar">
            <div className="header__area-menubar-left">
              <div className="header__area-menubar-left-logo">
                <Link href="/">
                  <img src="/logo.png" alt="logo" />
                </Link>
                <span
                  className={
                    mobileToggle
                      ? "mobile-menu mobile-menu-active"
                      : "mobile-menu"
                  }
                  onClick={() => setMobileToggle(!mobileToggle)}
                >
                  <span></span>
                </span>
              </div>
            </div>
            <div className="header__area-menubar-right">
              <div className="header__area-menubar-right-menu menu-responsive">
                <ul
                  className="mobile__menu"
                  style={{ display: `${mobileToggle ? "block" : "none"}` }}
                >
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  {/* 
								<li className="menu-item-has-children"><a href="#">About</a>
                                    <DropDown />
                                    <ul className="sub-menu">
                                        <Page />
                                    </ul>                                    
								</li> */}

                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/room-style">Rooms</Link>
                  </li>

                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="header__area-menubar-right-box">
              <div
                className="header__area-menubar-right-box-btn"
                onClick={handleSubmit}
              >
                <Link className="theme-btn" href="">
                  My Booking<i className="fal fa-long-arrow-right"></i>
                </Link>
              </div>
            </div>
            <Button>
              <Link href="/admin/signup">Login/Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Modal for booking */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Your Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
