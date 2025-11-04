"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";
export default function Personalized() {
  const [personalizedName, setPersonalizedName] = useState("");
  useEffect(() => {
    sessionStorage.setItem("personalizedName", personalizedName);
  }, [personalizedName]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8 p-6 bg-amber-50 rounded-xl border border-amber-100"
    >
      <div className="flex items-center gap-3 mb-4">
        <Gift className="w-6 h-6 text-amber-600" />
        <h3 className="text-lg font-semibold text-amber-900">
          Personalize This Item
        </h3>
      </div>
      <p className="text-amber-700 mb-4">
        This item can be personalized with a name or special text. Please enter
        the text you'd like to be engraved/printed:
      </p>
      <div className="space-y-2">
        <label
          htmlFor="personalizedName"
          className="block text-sm font-medium text-amber-800"
        >
          Enter text to personalize (max 25 characters)
        </label>
        <input
          type="text"
          id="personalizedName"
          maxLength={25}
          value={personalizedName}
          onChange={(e) => setPersonalizedName(e.target.value)}
          placeholder="e.g., Love, Sarah"
          className="w-full px-4 py-2.5 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-white"
        />
        <p className="text-xs text-amber-600">
          Note: Personalization cannot be changed or removed once ordered.
        </p>
      </div>
    </motion.div>
  );
}
