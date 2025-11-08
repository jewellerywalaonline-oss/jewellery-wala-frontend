"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ChevronRight } from "lucide-react";
import Image from "next/image";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { LoadingUi } from "./Cart";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setWishlist } from "@/redux/features/wishlist";

export default function Wishlist({ wishlist }) {
  const items = wishlist;

  const [wishlistLoading, setWishlistLoading] = useState(false);
  const router = useRouter();

  const removeFromWishlist = async (id) => {
    setWishlistLoading(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "api/website/wishlist/remove/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("user")}`,
          },
          body: JSON.stringify({
            productId: id,
          }),
        }
      );
      const responseData = await response.json();
      if (response.ok || responseData._status) {
        router.push("/wishlist");
        return toast.success(responseData._message);
      } else {
        return toast.error(responseData._message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setWishlistLoading(false);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWishlist(items));
  }, [wishlist]);

  if (!wishlist || items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 space-y-4 min-h-[50vh]"
      >
        <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
          <AnimatedHeart />
        </div>
        <p className="text-gray-800 text-md capitalize py-2">
          Your wishlist is currently empty. Start adding items you love!
        </p>

        <Link
          href="/category/all"
          className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 flex items-center gap-2 w-fit mx-auto"
        >
          Continue Shopping <ChevronRight size={16} />
        </Link>
      </motion.div>
    );
  }

  return (
    <>
      <section id="wishlist" className="py-8 md:py-12 ">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-gray-900 mb-4">
              Your Wishlist
            </h1>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              {items.length > 0
                ? "Your favorite jewelry pieces are waiting for you!"
                : "Your wishlist is currently empty. Start adding items you love!"}
            </p>
          </motion.div>

          {
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      transition: { duration: 0.2 },
                    }}
                    whileHover={{
                      y: -5,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                    }}
                    className="bg-white border border-amber-500 rounded-lg shadow-md overflow-hidden group relative"
                  >
                    <div className="relative h-64 w-full">
                      <Image
                        onClick={() =>
                          router.push(`/product-details/${item.slug}`)
                        }
                        src={item.image}
                        alt={item.name}
                        fill
                        className="cursor-pointer object-cover border-b border-gray-200"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <button
                        onClick={() => removeFromWishlist(item._id)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                        aria-label="Remove from wishlist"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                      {item.stock < 0 ? (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                          Out of Stock
                        </div>
                      ) : (
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                          In Stock
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center mb-3">
                        <span className="text-lg font-bold text-gray-900">
                          {" "}
                          ₹ {item.price.toFixed(2)}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            {" "}
                            ₹ {item.originalPrice.toFixed(2)}
                          </span>
                        )}
                        {item.originalPrice > item.price && (
                          <span className="ml-2 text-sm font-medium text-amber-600">
                            {Math.round(
                              (1 - item.price / item.originalPrice) * 100
                            )}
                            % OFF
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          }
        </div>
      </section>

      <LoadingUi hidden={wishlistLoading} />
    </>
  );
}

const AnimatedHeart = () => {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Outer border animation */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-amber-400"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Inner border animation */}
      <motion.div
        className="absolute inset-2 rounded-full border-2 border-amber-500"
        animate={{
          scale: [0.9, 1.2, 0.9],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />
      {/* Heart icon with animation */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          animate={{
            color: ["#F59E0B", "#F97316", "#F59E0B"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart className="w-12 h-12" strokeWidth={1.5} fill="currentColor" />
        </motion.div>
      </motion.div>
    </div>
  );
};
