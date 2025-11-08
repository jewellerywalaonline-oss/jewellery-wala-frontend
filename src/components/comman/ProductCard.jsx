"use client";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart";
import { useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "@/redux/features/wishlist";

export default function ProductCard({
  slug,
  subCategory,
  name,
  price,
  image,
  images,
  id,
  data,
}) {
  const cartItem = useSelector((state) =>
    state?.cart?.cartItems?.find((item) => item.productId === data?._id)
  );

  const cartObj = {
    productId: data?._id,
    quantity:
      cartItem && typeof cartItem.quantity === "number" ? cartItem.quantity : 1,
    colorId: data?.colors[0]?._id,
  };

  const [loading, setLoading] = useState(false);
  const [src, setSrc] = useState(data?.image);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const isWishlisted = useSelector((state) =>
    state?.wishlist?.wishlistItems?.find((item) => item._id === data?._id)
  );

  const [slideDirection, setSlideDirection] = useState(1);
  const dispatch = useDispatch();

  const displayPrice = data?.price;
  const displayCurrentPrice = data?.discount_price;
  const discountPercentage =
    displayPrice && displayCurrentPrice
      ? Math.round(((displayPrice - displayCurrentPrice) / displayPrice) * 100)
      : 0;
  const savings =
    displayPrice && displayCurrentPrice
      ? displayPrice - displayCurrentPrice
      : 0;

  const handleImageHover = (hovered) => {
    if (hovered && data?.images && data?.images.length > 0) {
      setSlideDirection(1);
      setSrc(data?.images[0]);
    } else if (!hovered) {
      setSlideDirection(-1);
      setSrc(data?.image);
    }
  };

  const handleWishlistToggle = async () => {
    if (!Cookies.get("user")) {
      toast.error("Please login to add to wishlist");
      return;
    }
    setWishlistLoading(true);
    if (isWishlisted) {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL +
            "api/website/wishlist/remove/" +
            data?._id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("user")}`,
            },
            body: JSON.stringify({
              productId: data?._id,
            }),
          }
        );
        const responseData = await response.json();
        if (response.ok || responseData._status) {
          dispatch(
            removeFromWishlist({
              _id: data?._id,
              name: data?.name,
              image: data?.image,
              price: data?.price,
              discount_price: data?.discount_price,
            })
          );
          return toast.success(responseData._message);
        } else {
          return toast.error(responseData._message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setWishlistLoading(false);
      }
    } else {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "api/website/wishlist/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("user")}`,
            },
            body: JSON.stringify({
              productId: data?._id,
            }),
          }
        );
        const responseData = await response.json();
        if (response.ok || responseData._status) {
          dispatch(
            addToWishlist({
              _id: data?._id,
              name: data?.name,
              image: data?.image,
              price: data?.price,
              discount_price: data?.discount_price,
            })
          );
          return toast.success(responseData._message);
        } else {
          return toast.error(responseData._message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setWishlistLoading(false);
      }
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!Cookies.get("user")) {
      toast.error("Please login to add to cart");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "api/website/cart/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("user")}`,
          },
          body: JSON.stringify(cartObj),
        }
      );
      const data = await response.json();
      if (response.ok || data._status) {
        dispatch(addToCart(cartObj));
        return toast.success(data._message);
      } else {
        return toast.error(data._message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.1,
        ease: "easeOut",
      },
    },
  };

  const imageSlideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 10 : -10,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "tween", stiffness: 500, damping: 40, mass: 0.8 },
        opacity: { duration: 0.1 },
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -10 : 10,
      opacity: 1,
      transition: {
        x: { type: "tween", stiffness: 1000, damping: 40, mass: 0.8 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const heartVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
    liked: {
      scale: [1, 1.3, 1],
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.article
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 relative group"
      itemScope
      itemType="https://schema.org/Product"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      role="article"
      aria-label={`Product: ${data.name}`}
    >
      {/* Schema.org structured data */}
      <meta itemProp="productID" content={data._id} />
      <meta itemProp="url" content={`/product-details/${data.slug}`} />
      {data.subCategory && data.subCategory.length > 0 && (
        <meta
          itemProp="category"
          content={data.subCategory.map((cat) => cat.name).join(", ")}
        />
      )}

      {/* Offers schema */}
      <div
        itemProp="offers"
        itemScope
        itemType="https://schema.org/Offer"
        style={{ display: "none" }}
      >
        <meta itemProp="price" content={displayCurrentPrice} />
        <meta itemProp="priceCurrency" content="INR" />
        <meta itemProp="availability" content="https://schema.org/InStock" />
        <meta itemProp="url" content={`/product-details/${data.slug}`} />
      </div>

      {/* Discount Badge */}
      <AnimatePresence>
        {discountPercentage > 0 && (
          <motion.div
            className="absolute top-3 left-3 z-10 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-md group-hover:animate-bounce"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            role="status"
            aria-label={`${discountPercentage} percent discount`}
          >
            {discountPercentage}% OFF
          </motion.div>
        )}
      </AnimatePresence>

      <Link
        href={`/product-details/${data.slug}`}
        aria-label={`View details for ${data.name}`}
        title={data.name}
      >
        <div
          className="overflow-hidden relative h-56 bg-amber-50"
          onMouseEnter={() => handleImageHover(true)}
          onMouseLeave={() => handleImageHover(false)}
        >
          <AnimatePresence initial={false} custom={slideDirection} mode="wait">
            <motion.div
              key={src}
              custom={slideDirection}
              variants={imageSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                width={500}
                height={500}
                src={src}
                alt={`${data.name} - Product image`}
                className="w-full h-full object-cover cursor-pointer"
                itemProp="image"
                title={data.name}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </Link>

      <div className="p-4">
        {data.subCategory && data.subCategory.length > 0 && (
          <motion.p
            className="text-[11px] uppercase tracking-wide text-amber-700 font-medium mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            <span itemProp="category">
              {data.subCategory.map((cat) => cat.name).join(", ")}
            </span>
          </motion.p>
        )}

        <motion.h3
          className="text-base font-semibold text-gray-900 mb-2 line-clamp-2"
          itemProp="name"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {data.name}
        </motion.h3>

        <motion.div
          className="flex items-center gap-2 mb-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          role="group"
          aria-label="Product pricing"
        >
          {displayPrice && (
            <span
              className="text-xs text-red-500 line-through"
              aria-label={`Original price: ${displayPrice} rupees`}
            >
              <span aria-hidden="true">₹{displayPrice}</span>
            </span>
          )}
          {displayCurrentPrice && (
            <span
              className="text-lg font-bold text-amber-600"
              itemProp="price"
              aria-label={`Current price: ${displayCurrentPrice} rupees`}
            >
              <span aria-hidden="true">₹{displayCurrentPrice}</span>
            </span>
          )}
          {savings > 0 && (
            <span
              className="text-xs text-green-600 font-semibold ml-auto"
              aria-label={`You save: ${savings} rupees`}
            >
              Save ₹{savings}
            </span>
          )}
        </motion.div>

        <motion.div
          className="flex gap-2 items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          role="group"
          aria-label="Product actions"
        >
          <motion.div
            variants={heartVariants}
            whileHover="hover"
            whileTap="tap"
            animate={isWishlisted ? "liked" : "initial"}
          >
            <Button
              disabled={wishlistLoading}
              aria-label={
                isWishlisted
                  ? `Remove ${data.name} from wishlist`
                  : `Add ${data.name} to wishlist`
              }
              aria-pressed={isWishlisted}
              className={`w-9 h-9 rounded-full border border-gray-300 hover:border-amber-500 hover:text-amber-500 flex items-center justify-center transition-colors bg-white hover:bg-amber-50 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleWishlistToggle}
              type="button"
            >
              <Heart
                size={16}
                fill={isWishlisted ? "currentColor" : "none"}
                className={isWishlisted ? "text-amber-500" : "text-black"}
                aria-hidden="true"
              />
            </Button>
          </motion.div>

          <motion.div
            className="flex-1"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              disabled={loading || data.stock === 0}
              className="w-full bg-gradient-to-r from-amber-800 to-amber-700 text-white py-2 rounded text-xs font-semibold uppercase flex items-center justify-center gap-1.5 "
              onClick={handleAddToCart}
              aria-label={`Add ${data.name} to cart`}
              type="button"
            >
              <ShoppingCart size={14} aria-hidden="true" />
              <span className="text-xs sm:text-sm ">
                {loading ? "Adding..." : data.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  );
}
