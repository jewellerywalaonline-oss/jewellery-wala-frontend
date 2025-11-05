"use client";
import React, { useState } from "react";
import { MessageCircle, Instagram } from "lucide-react";

const ToolBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_BUSINESS_PHONE || "1234567890";
  const instagram =
    "https://www.instagram.com/jewellery__wala_?igsh=MTBqdHI5cjYyMjZsMA==";
  const message = "Hello! I have a question about your products.";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const handleInstagramClick = () => {
    window.open(instagram, "_blank");
  };

  return (
    <div className="fixed bottom-20 right-6 z-50 flex flex-col gap-3 items-end">
      {/* Instagram Button */}
      <div
        className={`transform transition-all duration-500 ${
          isExpanded
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={handleInstagramClick}
          className="group relative bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full p-3 shadow-2xl transition-all duration-300 hover:shadow-pink-500/50 hover:scale-110 active:scale-95 overflow-hidden"
          aria-label="Chat on Instagram"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full bg-pink-400 animate-ping opacity-20" />

          <Instagram className="w-5 h-5 relative z-10" />
        </button>
      </div>

      {/* WhatsApp Button */}
      <div
        className={`transform transition-all duration-500 delay-75 ${
          isExpanded
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={handleWhatsAppClick}
          className="group relative bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-2xl transition-all duration-300 hover:shadow-green-500/50 hover:scale-110 active:scale-95 overflow-hidden"
          aria-label="Chat on WhatsApp"
        >
          {/* Ripple effect on hover */}
          <div className="absolute inset-0 rounded-full bg-green-400 scale-0 group-hover:scale-150 transition-transform duration-500 opacity-30" />

          <MessageCircle className="w-5 h-5 relative z-10" />
        </button>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full p-3 shadow-2xl transition-all duration-300 hover:shadow-purple-500/50 hover:scale-105 active:scale-95 ${
          isExpanded ? "rotate-45" : "rotate-0"
        }`}
        aria-label="Toggle social media menu"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />

        <div className="relative z-10">
          {isExpanded ? (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
        </div>

        {/* Rotating border animation */}
        <div
          className="absolute inset-0 rounded-full border-2 border-white/30 animate-spin"
          style={{ animationDuration: "3s" }}
        />
      </button>

      <style jsx>{`
        @keyframes ping {
          75%,
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ToolBar;
