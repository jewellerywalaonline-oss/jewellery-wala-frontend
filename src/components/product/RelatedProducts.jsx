import React, { useState, useEffect } from "react";
import ProductCard from "../comman/ProductCard";
import { Skeleton } from "../ui/skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";

export default function RelatedProducts({ id, subCategory, subSubCategory }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getRelatedProducts = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          "api/website/product/get-related-products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            subCategoryIds: subCategory,
            subSubCategoryIds: subSubCategory,
          }),
        }
      );
      const data = await response.json();
      setRelatedProducts(data._data);
      setLoading(false);
    };
    getRelatedProducts();
  }, [id]);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="overflow-x-hidden">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-5">
        You Might Also Like
      </h2>
      <div className="">
        {loading ? (
          <div className=" grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : (
          <Swiper
            className="w-full max-w-[1200px] mx-auto !overflow-visible"
            modules={[Autoplay]}
            slidesPerView={4}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.7,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {relatedProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard key={product._id} data={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
