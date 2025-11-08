"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { Home, User, Settings, ShoppingCartIcon } from "lucide-react";
import { useSelector } from "react-redux";
const tabs = [
  { id: "home", url: "/", label: "Home", icon: <Home size={24} /> },

  {
    id: "cart",
    url: "/cart",
    label: "Cart",
    icon: <ShoppingCartIcon size={24} />,
  },
  {
    id: "profile",
    url: "/profile",
    label: "Profile",
    icon: <User size={24} />,
  },
  {
    id: "settings",
    url: "/profile?tab=settings",
    label: "Settings",
    icon: <Settings size={24} />,
  },
];

export function BottomTabNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("home");
  const [scroll, setScroll] = useState(false);
  const cartCount = useSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    const currentTab = tabs.find(
      (tab) =>
        tab.url === pathname ||
        (pathname.startsWith(tab.url) && tab.url !== "/")
    );
    if (currentTab) {
      setActiveTab(currentTab.id);
    }
  }, [pathname]);

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    router.push(tab.url);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setScroll(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setScroll(false);
      }
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`block md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-100 duration-500 ${
        scroll ? "bottom-[-10%]" : "bottom-0"
      }`}
    >
      <div className="relative h-16">
        <div className="relative h-full flex items-center justify-around px-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className="relative flex flex-col items-center justify-center w-full h-full group"
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-50 rounded-t-lg"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </AnimatePresence>
                {/* {tab.id == "cart" && (
                  <span className="absoulte top-[100%] right-0">{cartCount}</span>
                )} */}
                <motion.div
                  className={`relative z-10 flex flex-col items-center p-2 ${
                    isActive ? "text-blue-600" : "text-gray-500"
                  }`}
                  animate={{
                    y: isActive ? -2 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <div className="relative">
                    {React.cloneElement(tab.icon, {
                      className: `w-6 h-6 transition-colors ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-blue-400"
                      }`,
                    })}
                  </div>
                  <motion.span
                    className={`text-xs font-medium mt-1 ${
                      isActive ? "text-blue-600" : "text-gray-500"
                    }`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{
                      opacity: isActive ? 1 : 0.8,
                      y: isActive ? 0 : 5,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {tab.label}
                  </motion.span>
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
