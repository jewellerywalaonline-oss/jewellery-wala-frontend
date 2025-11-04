"use client";
import React from "react";
import { MessageCircle } from "lucide-react";

const ToolBar = () => {
  const whatsappNumber = "+1234567890"; // Replace with your WhatsApp number
  const message = "Hello! I have a question about your products."; // Default message

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </button>
    </div>
  );
};

export default ToolBar;
