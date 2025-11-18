import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import SliderOneImg from '../../assets/images/banner-1.jpg';
import SliderTwoImg from '../../assets/images/banner-2.jpg';
import "swiper/css";
import 'swiper/css/navigation';
const Hero = () => {
  return (
    <div className="section-1">
      <Swiper
        modules={[Autoplay , Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{
          1024: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
        navigation
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div
            className="content"
            style={{ backgroundImage: `url(${SliderOneImg})` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="content"
            style={{ backgroundImage: `url(${SliderTwoImg})` }}
          ></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
