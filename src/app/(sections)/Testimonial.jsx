"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const Testimonial = ({ data  }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-base sm:text-lg ${
          index < rating ? "text-amber-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));

  return (
    <section
      className="max-w-[1300px] mx-auto w-full overflow-x-hidden   py-10"
      itemScope
      itemType="https://schema.org/Review"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif text-gray-800 mb-2">
            What Our Customers Say
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          <p className="text-gray-500 mt-3 text-sm sm:text-base">
            Real experiences from our valued customers
          </p>
        </div>

        {/* Slider */}
        <div className="py-5">
          {isMounted && (
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={600}
              loop={true}
              observer={true}
              observeParents={true}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              className="!overflow-visible"
            >
              {data.map((t) => (
                <SwiperSlide key={t.id}>
                  <article
                    className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg 
                               transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col items-center text-center"
                    itemScope
                    itemType="https://schema.org/Review"
                  >
                    {/* Avatar */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-4 border border-gray-200">
                      <figure>
                        <Image
                          width={200}
                          height={200}
                          loading="lazy"
                          src={t.image}
                          alt={`Customer ${t.title}`}
                          className="w-full h-full object-cover"
                          itemProp="image"
                        />
                      </figure>
                    </div>

                    {/* Review Text */}
                    <blockquote className="flex-1">
                      <p
                        className="text-gray-600 text-sm sm:text-base leading-relaxed"
                        itemProp="reviewBody"
                      >
                        {t.description}
                      </p>
                    </blockquote>

                    {/* Stars */}
                    <div className="flex justify-center mt-4">
                      {renderStars(t.rating)}
                    </div>
                    <p
                      aria-hidden="true"
                      className="sr-only text-gray-500 mt-3 text-sm sm:text-base"
                    >
                      position - User
                    </p>
                    {/* Name & Location */}
                    <figcaption className="mt-2">
                      <p
                        className="font-semibold text-gray-800 text-sm sm:text-base"
                        itemProp="author"
                      >
                        {t.title}
                      </p>
                    </figcaption>
                  </article>
                </SwiperSlide>
              ))}

            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
