"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "@/components/comman/ProductCard";
import Link from "next/link";

const Slider = ({ data, heading, bg }) => {
  return (
    <section className={`py-12 ${bg}`} id={heading}>
      <div className="max-w-[100vw] w-full overflow-x-hidden mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif text-[#8B4513] mb-3">{heading}</h2>
          <div className="w-20 h-1 bg-[#8B4513] mx-auto rounded-full"></div>
        </div>

        {/* Swiper Slider */}
        <div className="py-5">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={600}
            loop={true}
            observer={true}
            observeParents={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              450: {
                slidesPerView: 1.8,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
              1440: {
                slidesPerView: 9,
                spaceBetween: 24,
              },
            }}
            className="!overflow-visible"
          >
            {data?.map((item) => (
              <SwiperSlide key={item._id}>
                <ProductCard key={item._id} data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* View More Button */}
        <div className="text-center mt-10">
          <Link href="/category/shop-by-category">
            <button className="bg-[#8B4513] hover:bg-[#a05d2b] text-white px-8 py-3 rounded-full text-[15px] transition-all duration-300">
              VIEW MORE
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Slider;
