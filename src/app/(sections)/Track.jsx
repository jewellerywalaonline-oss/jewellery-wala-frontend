"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getOrderById } from "@/lib/orderService";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LoadingUi } from "./Cart";

export default function OrderTracking({ orderIdApi }) {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderId, setOrderId] = useState(orderIdApi);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOrderId(orderIdApi);
  }, [orderIdApi]);

  const handleTrackOrder = (e) => {
    e.preventDefault();
    // Fetch order status API call can go here
    setOrderId(orderNumber);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const details = await getOrderById(orderId);
      setOrderDetails(details);
      setLoading(false);
    };
    fetchOrder();
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [orderId]);

  if (loading) {
    return <LoadingUi hidden={loading} />;
  }
  console.log(orderDetails);
  return (
    <div className="min-h-[50vh]  p-4 md:p-10">
      {orderId == "" || !orderId ? (
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl  text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600 font-sans mb-6">
            Enter your order details to see its current status. <br />{" "}
            <span className="text-yellow-500 text-sm">
              or You Can Check your order status in Profile
            </span>
          </p>

          {/* Form */}
          <form
            onSubmit={handleTrackOrder}
            className="bg-white rounded-xl shadow-md p-6 mb-10"
          >
            <div className="mb-4">
              <Label className="block text-gray-700 font-medium mb-1">
                Order Number
              </Label>
              <Input
                type="text"
                placeholder="ORD-1234567890-ABC123"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <Button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Track Order
            </Button>
          </form>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Order Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 text-white">
            <h1 className="text-2xl md:text-3xl  font-bold mb-2">
              Order #{orderDetails?.order?.orderId}
            </h1>
            <p className="text-yellow-100">
              Placed on{" "}
              {new Date(orderDetails?.order?.createdAt).toLocaleDateString(
                "en-IN",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </p>
          </div>

          {/* Order Status */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-4">Order Status</h2>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                {["pending", "confirmed", "shipped", "delivered"].map(
                  (status, index) => {
                    const statusItem = orderDetails?.order?.statusHistory.find(
                      (s) => s.status === status
                    );
                    const isActive =
                      statusItem &&
                      statusItem.status === orderDetails?.order?.status;
                    const isCompleted = orderDetails?.order?.statusHistory.some(
                      (s) => s.status === status
                    );

                    return (
                      <div key={status} className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isActive
                              ? "bg-yellow-500 text-white"
                              : isCompleted
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {isCompleted ? "✓" : index + 1}
                        </div>
                        <span className="text-xs mt-2 capitalize">
                          {status}
                        </span>
                        {statusItem && (
                          <span className="text-xs text-gray-500">
                            {new Date(statusItem.timestamp).toLocaleDateString(
                              "en-IN"
                            )}
                          </span>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
              <div className="h-1 bg-gray-200  mx-5">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{
                    width: `${
                      orderDetails?.order?.status === "pending"
                        ? "25%"
                        : orderDetails?.order?.status === "confirmed"
                        ? "50%"
                        : orderDetails?.order?.status === "shipped"
                        ? "75%"
                        : "100%"
                    }`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* delivered on */}
         {orderDetails?.order?.status === "delivered" && <div className="bg-yellow-50 p-2 mx-auto flex items-center justify-between w-fit rounded-2xl">
            <h2 className="text-xl font-semibold ">Delivered On</h2>
            <p className="text-xl font-semibold ">
              {" "}
              {"  "} :{" "}
              {new Date(
                orderDetails?.order?.statusHistory?.find(
                  (s) => s.status === "delivered"
                )?.timestamp
              ).toLocaleDateString("en-IN")}
            </p>
          </div>}

          {/* Order Items */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            {orderDetails?.order?.items?.map((item) => (
              <div key={item._id} className="flex items-center py-4">
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden mr-4">
                  <Link href={`/product-details/${item.productId.slug}`}>
                    <Image
                      src={item.images?.[0] || "/placeholder.jpg"}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-yellow-600 font-medium">
                    ₹{item.priceAtPurchase.toLocaleString("en-IN")}
                  </p>
                  {item.isPersonalized && (
                    <p className="text-sm text-gray-500">
                      Personalized: Yes
                      <span> </span>
                      <span>{item.personalizedName}</span>
                    </p>
                  )}
                  {orderDetails?.order?.isGift && (
                    <p className="text-sm text-gray-500 flex flex-col">
                      Gift: Yes
                      <span className=" flex ">
                        <span> Gift Message : </span>
                        <span>{orderDetails?.order?.giftMessage}</span>
                      </span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>
                  ₹
                  {orderDetails?.order?.pricing?.subtotal?.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>
                  ₹
                  {orderDetails?.order?.pricing?.shipping?.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t mt-4">
                <span>Total</span>
                <span>
                  ₹
                  {orderDetails?.order?.pricing?.total?.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <address className="not-italic text-gray-700">
                  <p>{orderDetails?.order?.shippingAddress?.fullName}</p>
                  <p>{orderDetails?.order?.shippingAddress?.street}</p>
                  <p>{orderDetails?.order?.shippingAddress?.area}</p>
                  <p>
                    {orderDetails?.order?.shippingAddress?.city},{" "}
                    {orderDetails?.order?.shippingAddress?.state}
                  </p>
                  <p>India - {orderDetails?.order?.shippingAddress?.pincode}</p>
                  <p className="mt-2">
                    <span className="font-medium">Phone:</span>{" "}
                    {orderDetails?.order?.shippingAddress?.phone}
                  </p>
                </address>
              </div>
              {orderDetails?.order?.status !== "delivered" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Delivery Instructions
                  </h2>
                  <p className="text-gray-700">
                    {orderDetails?.order?.shippingAddress?.instructions ||
                      "No special instructions provided"}
                  </p>
                  <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400">
                    <p className="text-sm text-yellow-700">
                      <span className="font-medium">Package Id :</span>{" "}
                      {orderDetails?.order?.packageId}
                    </p>
                  </div>
                  {orderDetails?.order?.notes?.internal && (
                    <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400">
                      <p className="text-sm text-yellow-700">
                        <span className="font-medium">Note:</span>{" "}
                        {orderDetails?.order?.notes?.internal}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
