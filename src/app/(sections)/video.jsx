"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FullVideoSection = () => {
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "api/website/banner"
        );
        const data = await res.json();
        setImage(data?.[3]?.image);
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };
    fetchBanner();
  }, []);
  return (
    <div
      className="relative w-full h-[300px] lg:h-[500px] overflow-hidden bg-center bg-cover"
      style={{
        backgroundImage: image
          ? `url('${image}')`
          : "url('/images/poster.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-md text-white text-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl  mb-4 leading-[1.2]">
              New Trending Collection
            </h2>
            <p className="text-[16px] md:text-[17px] mb-6 text-[#ccc]">
              We Believe that Good Design is Always in Season
            </p>
            <Link
              href="/category/new-arrivals"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FullVideoSection;
