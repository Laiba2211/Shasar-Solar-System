import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  Navigation,
  Pagination,
  Keyboard,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import testimonialsData from "../../../data/testimonialsData";
import TestimonialCard from "./TestimonialCard";

const TestimonialSlider = () => {
  return (
    <motion.div
      className="testimonial-slider"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <Swiper
        modules={[
          Autoplay,
          Navigation,
          Pagination,
          Keyboard,
        ]}
        className="testimonial-swiper"
        loop={true}
        grabCursor={true}
        centeredSlides={false}
        watchOverflow={true}
        watchSlidesProgress={true}
        observer={true}
        observeParents={true}
        speed={6500}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          waitForTransition: false,
        }}
        navigation={{
          nextEl: ".testimonial-next",
          prevEl: ".testimonial-prev",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 18,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },

          1200: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {testimonialsData.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation */}

      <div className="testimonial-navigation d-flex justify-content-center align-items-center mt-5">

        <button
          className="testimonial-prev"
          aria-label="Previous testimonial"
        >
          ←
        </button>

        <button
          className="testimonial-next"
          aria-label="Next testimonial"
        >
          →
        </button>

      </div>
    </motion.div>
  );
};

export default TestimonialSlider;