// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slider from "./Slider";

const Banner = () => {
  return (
    <div className="min-h-[90vh] w-full ">
      <Swiper
        spaceBetween={30}
        centeredSlides={false}
        
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide >
          <Slider heading={"Exciting Opportunities Await You as Our Newest Employee"} path={"join-employee"} subHeading={"Join us as an employee and be part of a thriving team with exciting opportunities for growth and success!"} label={"Join as Employee"} image={"https://i.postimg.cc/26v2Zx65/SHOPIFY-Techmayntra.jpg"}/>
        </SwiperSlide>
		
        <SwiperSlide >
          <Slider heading={"Join Our Team as an Administrative Professional to Contribute Your Skills"} subHeading={"Join our team as an admin and be at the heart of organizational efficiency! Embrace a dynamic role where your organizational prowess and attention to detail are valued. As an integral part of our team"} path={"join-admin"} label={"Join as Admin"}  image={"https://i.postimg.cc/pdM5W5FQ/414964cd-bcd8-4353-809c-2c6991e0bf36.png"}/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
