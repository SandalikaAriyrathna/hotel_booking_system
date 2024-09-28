"use client";
import { useSearchParams } from 'next/navigation';
import SEO from "@/components/seo";
import BreadCrumb from "../breadcrumb/breadcrumb";
import Footer from "../footer/footer";
import HeaderOne from "../header/HeaderOne";
import ScrollToTopButton from "../scroll-to-top/scrollToTop";
import Roomdetailscontainer from "./room-details-container";

const Roomdetails = () => {

  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  return (
    <>
      <SEO pageTitle='Room Details' />
        <HeaderOne />
        <BreadCrumb title='Room Details' innerTitle='Room Details' bgImage='img/hotel/rooms/room1/room1-2.jpeg' />
        <Roomdetailscontainer roomId = {id} />
        <Footer />
        <ScrollToTopButton />
    </>
  );
};

export default Roomdetails;
