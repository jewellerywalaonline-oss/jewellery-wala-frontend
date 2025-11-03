"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { useSelector } from "react-redux";

// Import Swiper styles
import "swiper/css";
import Link from "next/link";

export default function RoundCategorySlider() {
  const categories = useSelector((state) => state.ui.navigation._data);

  return (
    <section className="w-full py-6">
      {/* Heading */}
      <div className="text-center mb-5 font-serif">
        <h2 className="text-2xl sm:text-3xl text-gray-800 relative inline-block">
          Discover Our Collection
          <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-[70%] h-[3px] bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-full shadow-lg"></span>
          <span className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-[50%] h-[2px] bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></span>
        </h2>
      </div>

      {/* Slider */}
      <div className="max-w-[1200px] mx-auto py-2">
        {categories.map(
          (cat) =>
            cat.subCategories.length > 0 && (
              <Swiper
                key={cat._id}
                modules={[Autoplay]}
                spaceBetween={10}
                slidesPerView={5}
                loop={true}
                autoplay={{
                  delay: 1200,
                  disableOnInteraction: false,
                }}
                speed={2000}
                breakpoints={{
                  320: {
                    slidesPerView: 2.5,
                    spaceBetween: 5,
                  },
                  480: {
                    slidesPerView: 3.1,
                    spaceBetween: 5,
                  },
                  768: {
                    slidesPerView: 4.5,
                    spaceBetween: 5,
                  },
                  1024: {
                    slidesPerView: 6,
                    spaceBetween: 10,
                  },
                  1280: {
                    slidesPerView: 6.5,
                    spaceBetween: 10,
                  },
                }}
              >
                {cat.subCategories.length > 0 &&
                  cat.subCategories.map((subCat) => (
                    <SwiperSlide
                      key={subCat._id}
                      className="!w-auto px-2 sm:px-4"
                    >
                      <Link href={`/category/${cat.slug}/${subCat.slug}`}>
                        <article
                          className="w-full h-full flex flex-col items-center group cursor-pointer"
                          itemScope
                          itemType="https://schema.org/Thing"
                        >
                          <div
                            className="rounded-full overflow-hidden border-[3px] border-[rgb(192,149,120)] flex items-center justify-center transition-all duration-300
        w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48
        group-hover:translate-y-[10px] group-hover:border-yellow-400 group-hover:scale-105 group-hover:shadow-2xl"
                          >
                            <Image
                              src={subCat.image}
                              alt={subCat.name}
                              width={200}
                              height={200}
                              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                              itemProp="image"
                            />
                          </div>
                          <p
                            className="mt-3 sm:mt-4 text-sm sm:text-base font-medium text-gray-700 text-center leading-tight max-w-[140px] sm:max-w-[160px]
        transition-all duration-300 group-hover:text-yellow-600 group-hover:scale-105"
                            itemProp="name"
                          >
                            {subCat.name}
                          </p>
                        </article>
                      </Link>
                    </SwiperSlide>
                  ))}
              </Swiper>
            )
        )}
      </div>
    </section>
  );
}
