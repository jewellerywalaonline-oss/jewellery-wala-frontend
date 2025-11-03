"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Data for categories (for cleaner rendering)
const categories = [
  {
    id: "men",
    title: "MEN",
    subtitle: "Shop the Classic Collection",
    image: "/images/men-banner.jpg",
  },
  {
    id: "women",
    title: "WOMEN",
    subtitle: "Discover the New Trend",
    image: "/images/women-banner.jpg",
  },
];

export default function GenderCategorySection() {
  const [active, setActive] = useState("men");
  const inactiveId = active === "men" ? "women" : "men";

  // Use a refined, rich gold/bronze color
  const ACCENT_COLOR = "rgb(184, 134, 11)"; // Goldenrod / Rich Bronze

  return (
    <div className="w-full bg-white py-10">
      <div className="max-w-[1300px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              onClick={() => setActive(category.id)}
              className="relative w-full md:w-1/2 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 shadow-xl"
              // Motion properties for the container based on active state
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                // Make the active card slightly larger and more opaque
                scale: active === category.id ? 1.01 : 0.95,
                opacity: active === category.id ? 1 : 0.7,
                // Add a stronger ring and elevation for the active card
                boxShadow:
                  active === category.id
                    ? `0 10px 20px rgba(0, 0, 0, 0.2), 0 0 0 5px ${ACCENT_COLOR}`
                    : "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              whileHover={{ scale: active === category.id ? 1.01 : 1 }} // Only scale non-active on hover
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              style={{
                height: "450px", // Increased height for a more imposing look
                zIndex: active === category.id ? 10 : 1, // Bring active item to front
              }}
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700"
              />
              <div
                className={`absolute inset-0 transition-all duration-500 flex flex-col justify-center items-center text-white p-6 ${
                  active === category.id ? "bg-black/10" : "bg-black/20"
                }`}
              >
                <h2 className="text-6xl font-serif font-light tracking-widest text-shadow-lg">
                  {category.title}
                </h2>
                <p className="mt-4 text-sm uppercase font-sans tracking-widest border-b-2 border-white/50 pb-1">
                  {category.subtitle}
                </p>

                <div
                  className={`mt-8 py-3 px-8 text-sm font-semibold uppercase tracking-widest rounded-full transition-all duration-300 transform 
                               ${
                                 active === category.id
                                   ? `bg-white text-gray-900 hover:bg-gray-100`
                                   : `bg-[${ACCENT_COLOR}] text-white hover:bg-opacity-80`
                               }`}
                >
                  Explore
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
