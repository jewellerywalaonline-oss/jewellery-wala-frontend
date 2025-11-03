"use Client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

export default function OrederSummery({ cartItems, type, orderData }) {
  if (type === "direct" || type === "cart") {
    const [personalizedName, setPersonalizedName] = useState("");

    // Load personalized name from sessionStorage on component mount
    useEffect(() => {
      const storedName = sessionStorage.getItem("personalizedName");
      if (storedName) {
        setPersonalizedName(storedName);
      }
    }, []);

    // Update sessionStorage when personalizedName changes
    useEffect(() => {
      if (personalizedName) {
        sessionStorage.setItem("personalizedName", personalizedName);
      }
    }, [personalizedName]);

    const handleNameChange = (e) => {
      setPersonalizedName(e.target.value);
    };

    return (
      <div>
        {/* Order Items */}
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-start space-x-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Link
                  className="w-full h-full"
                  href={`/product-details/${item?.product?.slug}`}
                >
                  <Image
                    src={item?.product?.image || "/placeholder.svg"}
                    alt={item?.product?.name || "cart image"}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {item?.product?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Qty: {item?.quantity}{" "}
                  <span className="text-xs text-amber-500  font-medium">
                    ({type == "cart" && item?.color?.name})
                  </span>
                </p>

                <p className="text-sm font-medium text-gray-900 mt-1">
                  ₹{item?.product?.discount_price}
                  {item?.product?.discount_price && (
                    <span className="ml-2 text-xs text-gray-500 line-through">
                      ₹{item?.product?.price}
                    </span>
                  )}
                </p>
              </div>
              {item.isPersonalized && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    Personalized Name
                  </span>
                  <input
                    type="text"
                    value={personalizedName}
                    onChange={handleNameChange}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                    placeholder="Enter name"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Order Total */}
        <div className="border-t border-gray-200 pt-4 space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>
              ₹
              {cartItems.reduce(
                (sum, item) =>
                  sum +
                  (item?.product?.discount_price || item?.product?.price) *
                    item?.quantity,
                0
              )}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">
              {cartItems.reduce(
                (sum, item) =>
                  sum +
                  (item?.product?.discount_price || item?.product?.price) *
                    item?.quantity,
                0
              ) > 1000
                ? "Free"
                : "₹50"}
            </span>
          </div>

          {orderData.giftWrap && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>Gift Wrap</span>
              <span>₹50</span>
            </div>
          )}

          {orderData.couponCode && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount ({orderData.couponCode})</span>
              <span>-₹100</span>
            </div>
          )}

          <div className="border-t border-gray-200 pt-3 mt-2">
            <div className="flex justify-between font-medium text-gray-900">
              <span>Total</span>
              <span className="text-lg">
                ₹
                {cartItems.reduce(
                  (sum, item) =>
                    sum +
                    (item?.product?.discount_price || item?.product?.price) *
                      item?.quantity,
                  0
                ) +
                  (orderData.giftWrap ? 50 : 0) -
                  (orderData.couponCode ? 100 : 0) +
                  (cartItems.reduce(
                    (sum, item) =>
                      sum +
                      (item?.product?.discount_price || item?.product?.price) *
                        item?.quantity,
                    0
                  ) > 1000
                    ? 0
                    : 50)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
          </div>
        </div>
      </div>
    );
  }
  return <div>SomeThing went wrong </div>;
}
