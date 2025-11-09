"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { updateFullCart } from "@/redux/features/cart";


export default function Cart({ cart }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    setLoading(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `api/website/cart/items/update/${id}`,
        {
          body: JSON.stringify({
            quantity: newQuantity,
          }),
          headers: {
            Authorization: `Bearer ${Cookies.get("user")}`,
            "Content-Type": "application/json",
          },
          method: "put",
        }
      );
      const updatedCart = await response.json();
      if (!response.ok || !updatedCart._status) {
        toast.error(updatedCart._message || "Failed to update cart");
      }
      router.push("/cart");
    } catch (error) {
      toast.error(error.message || "Failed to update cart");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `api/website/cart/items/remove/${id}`,
        {
          body: JSON.stringify({ itemId: id }),
          headers: {
            Authorization: `Bearer ${Cookies.get("user")}`,
            "Content-Type": "application/json",
          },
          method: "put",
        }
      );
      const updatedCart = await response.json();
      if (!response.ok || !updatedCart._status) {
        toast.error(updatedCart._message || "Failed to remove item from cart");
      }
      router.push("/cart");
    } catch (error) {
      toast.error(error.message || "Failed to remove item from cart");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cart?._data?.totalPrice || 0;
  const discountAmount = subtotal * 0;
  const finalSubtotal = subtotal - discountAmount;
  const shipping = finalSubtotal > 1000 ? 0 : 50;
  const estimatedTotal = finalSubtotal + shipping;

  const updateCart = async (id, quantity) => {
    if (quantity < 1) return;
    setLoading(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `api/website/cart/items/update/${id}`,
        {
          body: JSON.stringify({
            quantity: quantity,
          }),
          headers: {
            Authorization: `Bearer ${Cookies.get("user")}`,
            "Content-Type": "application/json",
          },
          method: "put",
        }
      );
      const updatedCart = await response.json();
      if (!response.ok || !updatedCart._status) {
        toast.error(updatedCart._message || "Failed to update cart");
      }
      router.push("/cart");
    } catch (error) {
      toast.error(error.message || "Failed to update cart");
    } finally {
      setLoading(false);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateFullCart(cart._data));
  }, [cart]);

  if (cart === null || cart?._data?.items.length === 0) {
    return (
      <div className="bg-white rounded-lg p-12 text-center shadow-md">
        <ShoppingCart size={56} className="mx-auto text-gray-700 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Start shopping to add items to your cart
        </p>
        <button
          onClick={() => router.push("/category/all")}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 px-6 rounded-lg transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <>
      <main className=" py-10 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <a href="#" className="text-amber-600 hover:underline">
              Shopping Bag
            </a>
            <ChevronRight size={14} />
            <span className="text-gray-900">Checkout</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Shopping Bag{" "}
            <span className="text-amber-600">
              ({cart?._data?.totalItems || 0})
            </span>
          </h1>

          {cart?._data?.items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart?._data?.items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
                  >
                    <div className="flex gap-4 sm:gap-6 items-center">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border border-gray-200">
                        <Link href={`/product-details/${item.product.slug}`}>
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={112}
                            height={112}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                              {item.product.name}
                            </h3>
                            <p className="text-lg sm:text-xl font-bold text-amber-600">
                              ₹
                              {item.product.discount_price ||
                                item.product.price}
                              <span className="text-gray-600 ms-2 text-lg">
                                ({item.color.name})
                              </span>
                              <span
                                style={{ backgroundColor: item.color.code }}
                                className="w-2 h-2 rounded-2xl"
                              ></span>
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item._id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <X size={18} />
                          </button>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            disabled={loading || item.quantity === 1}
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                            className="p-1.5 hover:bg-gray-100 rounded"
                          >
                            <Minus size={16} className="text-gray-600" />
                          </button>
                          <span className="w-12 text-center border border-gray-300 rounded text-sm">
                            {item.quantity}
                          </span>
                          <button
                            disabled={
                              loading || item.quantity === item.product.stock
                            }
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                            className="p-1.5 hover:bg-gray-100 rounded"
                          >
                            <Plus size={16} className="text-gray-600" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 ">
                          Stock: {item.product.stock}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button onClick={updateCart}>Update Cart</Button>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Order Summary
                  </h2>

                  {/* Coupon */}
                  {/* <div className="mb-6 pb-6 border-b border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Coupon Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-600"
                      />
                      <button
                        onClick={applyCoupon}
                        className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition text-sm font-medium"
                      >
                        Apply
                      </button>
                    </div>
                    {appliedCoupon && (
                      <p className="text-green-600 text-sm mt-2">
                        ✓ {appliedCoupon} applied
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">Try: SAVE20</p>
                  </div> */}

                  {/* Price Summary */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">
                        ₹{subtotal.toFixed(2)}
                      </span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                        <span className="font-semibold">
                          -₹{discountAmount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold text-gray-900">
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `₹${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-base">
                      <span className="font-bold text-gray-900">
                        Estimated Total
                      </span>
                      <span className="text-xl font-bold text-amber-600">
                        ₹{estimatedTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 space-y-3">
                    <Link href="/checkout?type=cart">
                      {" "}
                      <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition">
                        Proceed to Checkout
                      </button>
                    </Link>
                    <Link href="/">
                      {" "}
                      <button className="w-full bg-white mt-2 border border-gray-300 text-gray-700 hover:border-amber-500 font-medium py-3 rounded-lg transition">
                        Continue Shopping
                      </button>
                    </Link>
                  </div>

                  
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-12 text-center shadow-md">
              <ShoppingCart size={56} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6 text-sm">
                Start shopping to add items to your cart
              </p>
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 px-6 rounded-lg transition">
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </main>

      <LoadingUi hidden={loading} />
    </>
  );
}

export const LoadingUi = ({ hidden }) => {
  return (
    <div
      className={
        !hidden
          ? "hidden"
          : "fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center h-screen bg-white/50 z-[1800]"
      }
    >
      <Loader2 className="animate-spin" />
    </div>
  );
};
