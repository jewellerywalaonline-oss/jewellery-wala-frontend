"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ImageZoom from "./image-zoom"



export default function ImageSlider({ images, productName, isNewArrival, isMobile }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 10 : -10,
      opacity: 1,
    }),
    center: {
      zIndex: 1,
      x: 1,
      opacity: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 10 : -10,
      opacity: 1,
    }),
  }

  const paginate = (newDirection) => {
    setDirection(newDirection)
    setCurrentImage((prev) => {
      const next = prev + newDirection
      if (next < 0) return images.length - 1
      if (next >= images.length) return 0
      return next
    })
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div
        className="relative bg-gradient-to-br from-amber-50/50 to-yellow-50/50 rounded-3xl overflow-hidden h-96 sm:h-[500px] shadow-2xl border border-amber-100/50 glass-effect"
        whileHover={!isMobile ? { scale: 1.01 } : {}}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentImage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 20 },
              opacity: { duration: 0.4 },
            }}
            className="absolute inset-0"
          >
            <ImageZoom
              src={images[currentImage] || "/placeholder.svg"}
              alt={`${productName} - ${currentImage + 1}`}
              isMobile={isMobile}
            />
          </motion.div>
        </AnimatePresence>

        {/* New Arrival Badge */}
        {isNewArrival && (
          <motion.span
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm"
          >
            NEW
          </motion.span>
        )}

        {/* Navigation Arrows - Desktop Only */}
        {!isMobile && images.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-amber-600 p-3 rounded-full shadow-lg backdrop-blur-md transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-amber-600 p-3 rounded-full shadow-lg backdrop-blur-md transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </>
        )}

        {/* Image Counter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 bg-black/40 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-md"
        >
          {currentImage + 1} / {images.length}
        </motion.div>
      </motion.div>

      {/* Thumbnail Slider */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto overflow-y-hidden pb-2 scroll-smooth">
          {images.map((img, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentImage ? 1 : -1)
                setCurrentImage(index)
              }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-3 transition-all ${
                currentImage === index
                  ? "border-amber-500 shadow-lg ring-2 ring-amber-200"
                  : "border-amber-100 hover:border-amber-300"
              }`}
            >
              <Image
                src={img || "/placeholder.svg"}
                alt={`${productName} - ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}
