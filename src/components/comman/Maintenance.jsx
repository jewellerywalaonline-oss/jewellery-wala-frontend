"use client";

import { motion } from "framer-motion";
import { Wrench, CalendarClock } from "lucide-react";
import { siteConfig } from "@/lib/utils";

export default function Maintenance() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-2xl w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            className="mx-auto flex items-center justify-center h-24 w-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full text-white mb-6"
            animate={{
              rotate: [0, -8, 8, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Wrench className="h-12 w-12" />
          </motion.div>

          <motion.h1
            className="text-4xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            Site Under Maintenance
          </motion.h1>

          <motion.p
            className="text-gray-600 mb-6 text-lg"
            variants={itemVariants}
          >
            {
              "We're busy polishing our collections to give you the best experience."
            }
          </motion.p>

          <motion.p
            className="text-gray-500 text-sm mb-8 flex items-center justify-center gap-2"
            variants={itemVariants}
          >
            <CalendarClock className="h-4 w-4" />
            Please check back soon. We'll be right back!
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-16 text-gray-400 text-sm"
          variants={itemVariants}
        >
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}