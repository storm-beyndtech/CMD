import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { testimonials } from "../lib/utils";
import { Autoplay, FreeMode } from "swiper/modules";

export default function Testimonials() {
  return (
    <section className="max-ctn py-[75px]">
      <h2 className="title mb-10 max-sm:max-w-72">What Our Members Are Saying</h2>
      <Swiper
        speed={2000}
        modules={[FreeMode, Autoplay]}
        spaceBetween={10}
        slidesPerView={3.5}
        autoplay={{ delay: 3000 }}
        loop={true}
        breakpoints={{
          1024: { slidesPerView: 3.5 },
          768: { slidesPerView: 2 },
          480: { slidesPerView: 1 },
          0: { slidesPerView: 1 },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="w-[335px] h-[375px] max-sm:w-[310px] max-sm:h-[350px] py-9 px-7 rounded-[14px] bg-[#4833800D] flex flex-col justify-between">
              <p className="desc pb-6">{testimonial.message}</p>
              <div className="pt-6 border-t border-[#E8E5EF]">
                <h3 className="text-[#2B2F38] font-semibold text-xl mb-2">
                  {testimonial.name}
                </h3>
                <p className="desc !text-secondary">{testimonial.role}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
