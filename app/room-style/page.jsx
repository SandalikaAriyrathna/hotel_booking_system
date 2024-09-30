"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "../footer/footer";
import ScrollToTopButton from "../scroll-to-top/scrollToTop";
import BreadCrumb from "../breadcrumb/breadcrumb";
import Link from "next/link";
import Sidebar from "../room-details/sidebar";
import HeaderOne from "../header/HeaderOne";
import SEO from "@/components/seo";

const Roomstyle = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms");
        const data = await response.json();
        setRooms(data);
        setIsLoading(false); // Data has been loaded
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setIsLoading(false); // Stop loading on error
      }
    };

    fetchRooms();
  }, []);

  return (
    <>
      <SEO pageTitle="Room Style" />
      <HeaderOne />
      <BreadCrumb
        title="Room Style"
        innerTitle="Room Style"
        bgImage="img/hotel/rooms/room1/room1-3.jpeg"
      />
      <div className="room__area section-padding">
        <div className="container">
          <div className="row">
            <Sidebar />
            <div className="col-xl-9 col-lg-8 order-first order-lg-1 lg-mb-30">
              <div className="row justify-content-center">
                {/* Show loading message when data is being fetched */}
                {isLoading ? (
                  <div className="text-center">
                    <p>Loading rooms, please wait...</p>
                  </div>
                ) : (
                  // If rooms are loaded, display them
                  rooms.map((item, index) => (
                    <div key={index} className="col-xl-4 col-md-6 mb-30">
                      <div className="deluxe__two-item">
                        <div className="deluxe__two-item-image">
                          <Image
                            src={`data:image/png;base64,${item.mainImage}`}
                            alt={item.roomType}
                            width={500}
                            height={500}
                          />
                        </div>
                        <div className="deluxe__two-item-content">
                          <span>Rs.{item.price}/AC-with breakfast</span>
                          <span>Rs.{item.price}/Non-AC-with breakfast</span>
                          <h4>{item.roomType}</h4>
                          <h8>Room Number : {item.roomNumber}</h8>
                          <p>{item.smallDesc}</p>
                          <div className="deluxe__two-item-content-meta">
                            <ul>
                              <li>
                                <i className="fal fa-bed-alt"></i> (
                                {item.bedCount}) bed's
                              </li>
                              <li>
                                <i className="fal fa-users"></i> (
                                {item.guestCount}) Guest's
                              </li>
                            </ul>
                          </div>
                          <div className="deluxe__two-item-content-bottom">
                            <Link
                              className="simple-btn"
                              href={`/room-details?id=${item._id}`}
                            >
                              <i className="far fa-chevron-right"></i> Read More
                            </Link>
                            <p>
                              <i className="fas fa-star"></i>
                              <span>2k</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Roomstyle;
