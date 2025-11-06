"use client";
import { useState, useEffect } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  ShoppingBag,
  AlertCircle,
  Package,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import ProductReviews from "@/components/product/product-reviews";
import ImageSlider from "@/components/product/image-slider";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { addToCart, setBuyNowItem } from "@/redux/features/cart";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { openLoginModal, openRequirementModal } from "@/redux/features/uiSlice";
import { useIsMobile } from "@/hooks/use-mobile";
import RelatedProducts from "@/components/product/RelatedProducts";
import Breadcrumb from "./Breadcrumb";
import Personalized from "@/components/product/Personalized";

export default function ProductDetailsPage({ details }) {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(details);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(
    details?.colors?.[0]?._id || ""
  );
  const isMobile = useIsMobile();

  const user = useSelector((state) => state.auth.details);
  const isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    if (details && Object.keys(details).length > 0) {
      setProduct(details);
    }
  }, [details]);

  // Error state - when product data is empty or invalid
  if (!product || Object.keys(product).length === 0 || !product.name) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center py-12 px-4 gradient-golden"
      >
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full mb-6 shadow-lg"
          >
            <AlertCircle className="w-10 h-10 text-amber-600" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 mb-3"
          >
            Product Not Found
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8"
          >
            We couldn't find the product you're looking for. It might have been
            removed or is temporarily unavailable.
          </motion.p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Back to Home
          </motion.button>
        </div>
      </motion.div>
    );
  }
  const isWishlisted = useSelector((state) =>
    state?.wishlist?.wishlistItems?.find((item) => item._id === product?._id)
  );

  const handleWishlist = async () => {
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
            product?._id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("user")}`,
            },
            body: JSON.stringify({
              productId: product?._id,
            }),
          }
        );
        const responseData = await response.json();
        if (response.ok || responseData._status) {
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
              productId: product?._id,
            }),
          }
        );
        const responseData = await response.json();
        if (response.ok || responseData._status) {
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

  const handleIncrement = () =>
    setQuantity((prev) => Math.min(prev + 1, product.stock || 10));
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleBuyNow = async () => {
    if (isLogin) {
      if (!user?.isEmailVerified) {
        dispatch(openRequirementModal());
      } else if (!user?.address) {
        dispatch(openRequirementModal());
      } else {
        const buyNowItem = {
          productId: product._id,
          quantity: quantity,
          colorId: selectedColor,
          product: product,
        };
        dispatch(setBuyNowItem(buyNowItem));
        router.push("/checkout?type=direct");
      }
    } else {
      dispatch(openLoginModal());
    }
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1 }}
      >
        <Star
          size={16}
          className={
            i < Math.floor(rating || 4)
              ? "fill-amber-400 text-amber-400"
              : "text-gray-300"
          }
        />
      </motion.div>
    ));

  const allImages =
    product.images?.length > 0
      ? [product.image, ...product.images]
      : [product.image];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cartObj = {
    productId: product._id,
    quantity: quantity,
    colorId: selectedColor,
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

  return (
    <main className="py-8 sm:py-12 ">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Gallery */}
          <motion.div variants={itemVariants} className="space-y-4">
            <ImageSlider
              images={allImages}
              productName={product.name}
              isNewArrival={product.isNewArrival}
              isMobile={isMobile}
            />
          </motion.div>

          {/* Product Info */}
          <motion.div variants={itemVariants}>
            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                {
                  label: product.category?.[0]?.name || "Jewelry",
                  href: `/category/${product.category?.[0]?.slug || ""}`,
                },
                ...(product.subCategory?.[0]?.name
                  ? [
                      {
                        label: product.subCategory[0].name,
                        href: `/category/${product.category?.[0]?.slug || ""}/${
                          product.subCategory[0].slug
                        }`,
                      },
                    ]
                  : []),
              ]}
            />

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent mb-4 leading-tight"
            >
              {product.name}
            </motion.h1>

            {product.rating ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 mb-6"
                role="group"
                aria-label="Product rating"
              >
                <div
                  className="flex items-center gap-1"
                  role="img"
                  aria-label={`Rated ${product.rating} out of 5 stars`}
                >
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  ({product.reviewCount || 0} Reviews)
                </span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center "
                role="group"
                aria-label="Product rating"
              >
                <span className="text-sm text-gray-600 font-medium">
                  No Rating Available
                </span>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <div
                className="flex items-baseline gap-4"
                role="group"
                aria-label="Product pricing"
              >
                {product.discount_price ? (
                  <>
                    <span
                      className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"
                      aria-label={`Sale price: ${product.discount_price} rupees`}
                    >
                      <span aria-hidden="true">
                        ₹{product.discount_price.toLocaleString()}
                      </span>
                    </span>
                    <span
                      className="text-gray-400 text-2xl line-through"
                      aria-label={`Original price: ${product.price} rupees`}
                    >
                      <span aria-hidden="true">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                      className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold rounded-full shadow-md"
                      role="status"
                      aria-label={`${Math.round(
                        ((product.price - product.discount_price) /
                          product.price) *
                          100
                      )} percent discount`}
                    >
                      {Math.round(
                        ((product.price - product.discount_price) /
                          product.price) *
                          100
                      )}
                      % OFF
                    </motion.span>
                  </>
                ) : (
                  <span
                    className="text-4xl font-bold text-gray-900"
                    aria-label={`Price: ${product.price} rupees`}
                  >
                    <span aria-hidden="true">
                      ₹{product.price?.toLocaleString() || "N/A"}
                    </span>
                  </span>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-6 mb-6 border-t border-amber-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {product.material?.length > 0 && (
                  <div className="flex items-start gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-amber-100/50">
                    <Package
                      className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-gray-500 block text-xs">
                        Material
                      </span>
                      <span className="font-semibold text-gray-900">
                        {product.material.map((m) => m.name).join(", ")}
                      </span>
                    </div>
                  </div>
                )}
                {product.purity && (
                  <div className="flex items-start gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-amber-100/50">
                    <Package
                      className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-gray-500 block text-xs">
                        Purity
                      </span>
                      <span className="font-semibold text-gray-900">
                        {product.purity}
                      </span>
                    </div>
                  </div>
                )}
                {product.weight && (
                  <div className="flex items-start gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-amber-100/50">
                    <Package
                      className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-gray-500 block text-xs">
                        Weight
                      </span>
                      <span className="font-semibold text-gray-900">
                        {product.weight}
                      </span>
                    </div>
                  </div>
                )}
                {product.stone && (
                  <div className="flex items-start gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-amber-100/50">
                    <Package
                      className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-gray-500 block text-xs">Stone</span>
                      <span className="font-semibold text-gray-900">
                        {product.stone}
                      </span>
                    </div>
                  </div>
                )}
                {product.estimated_delivery_time && (
                  <div className="flex items-start gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-amber-100/50">
                    <Truck
                      className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-gray-500 block text-xs">
                        Delivery
                      </span>
                      <span className="font-semibold text-gray-900">
                        {product.estimated_delivery_time}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Quantity & Color */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4 mb-6"
            >
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Quantity
                </h3>
                <div
                  className="flex items-center"
                  role="group"
                  aria-label="Product quantity"
                >
                  <motion.button
                    type="button"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Decrease quantity"
                    className="w-10 h-10 flex items-center justify-center border-2 border-amber-300 rounded-l-lg text-amber-600 hover:bg-amber-50 hover:border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-colors"
                  >
                    -
                  </motion.button>
                  <div
                    className="w-16 h-10 flex items-center justify-center border-t-2 border-b-2 border-amber-300 text-gray-900 font-semibold bg-white/60"
                    role="status"
                    aria-live="polite"
                    aria-label={`Quantity: ${quantity}`}
                  >
                    {quantity}
                  </div>
                  <motion.button
                    type="button"
                    onClick={handleIncrement}
                    disabled={quantity >= (product.stock || 10)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Increase quantity"
                    className="w-10 h-10 flex items-center justify-center border-2 border-amber-300 rounded-r-lg text-amber-600 hover:bg-amber-50 hover:border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-colors"
                  >
                    +
                  </motion.button>
                </div>
              </div>

              {product.colors?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Color
                  </h3>
                  <div
                    className="flex gap-3"
                    role="group"
                    aria-label="Color options"
                  >
                    {product.colors.map((color) => (
                      <div
                        key={color._id}
                        className="flex flex-col items-center"
                      >
                        <motion.button
                          key={color._id}
                          type="button"
                          onClick={() => setSelectedColor(color._id)}
                          whileHover={{ scale: 1.15, rotate: 360 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          aria-label={`Select ${color.name || "color"}`}
                          aria-pressed={selectedColor === color._id}
                          className={`w-10 h-10 flex items-center justify-center rounded-full border-3 ${
                            selectedColor === color._id
                              ? "border-amber-600 shadow-lg ring-2 ring-amber-200"
                              : "border-amber-200 hover:border-amber-400"
                          }`}
                        >
                          <span
                            className="w-7 h-7 rounded-full shadow-inner"
                            style={{ backgroundColor: color.code }}
                            aria-hidden="true"
                          />
                        </motion.button>
                        <span className="text-xs font-semibold">
                          {color.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-3"
            >
              <div className="flex gap-3">
                <motion.button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!product.stock || loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={product.stock ? "Add to cart" : "Out of stock"}
                  aria-disabled={!product.stock || loading}
                  className="flex-1 bg-white border-2 border-amber-600 text-amber-600 py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-50 transition-all shadow-md hover:shadow-lg"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      aria-label="Adding to cart"
                    >
                      <ShoppingCart size={18} aria-hidden="true" />
                    </motion.div>
                  ) : (
                    <>
                      <ShoppingBag size={18} aria-hidden="true" />
                      <span>
                        {product.stock ? "Add to Cart" : "Out of Stock"}
                      </span>
                    </>
                  )}
                </motion.button>
                <motion.button
                  type="button"
                  disabled={wishlistLoading}
                  onClick={handleWishlist}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={
                    isWishlisted
                      ? `Remove ${product.name} from wishlist`
                      : `Add ${product.name} to wishlist`
                  }
                  aria-pressed={isWishlisted}
                  className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-all shadow-md hover:shadow-lg ${
                    isWishlisted
                      ? "text-red-500 border-red-300 bg-red-50"
                      : "border-amber-300 hover:bg-amber-50 hover:border-amber-400"
                  }`}
                >
                  <motion.div
                    animate={isWishlisted ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart
                      size={20}
                      fill={isWishlisted ? "currentColor" : "none"}
                      aria-hidden="true"
                    />
                  </motion.div>
                </motion.button>
              </div>

              <motion.button
                type="button"
                onClick={handleBuyNow}
                disabled={!product.stock}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(217, 119, 6, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                aria-label="Buy now"
                aria-disabled={!product.stock}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                <span>Buy Now</span>
                <ShoppingCart size={18} aria-hidden="true" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Personalized Item Section */}
        {product?.isPersonalized && <Personalized />}

        {/* Description Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-12"
        >
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-amber-100/50 glass-effect">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Product Description
            </h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {product.description}
            </div>
          </div>
        </motion.div>

        {/* Related Products */}
        <RelatedProducts
          id={product._id}
          subCategory={product.subCategory}
          subSubCategory={product.subSubCategory}
        />
        {/* Reviews */}
        <ProductReviews productId={product._id} />
      </motion.div>
    </main>
  );
}
