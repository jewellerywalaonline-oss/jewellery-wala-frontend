"use client";
import { Button } from "@/components/ui/button";
import { setPriceRange } from "@/redux/features/filters";
import { Gift, Heart, IndianRupee, Star } from "lucide-react";
import Link from "next/link";

import { useDispatch } from "react-redux";

const ShopByPrice = () => {
  const priceCategories = [
    {
      icon: (
        <IndianRupee
          size={30}
          className="text-amber-500 group-hover:text-amber-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
        />
      ),
      label: "Under ₹599",
      priceFrom: 0,
      priceTo: 599,
      url: "/category/shop-by-category",
      className:
        "text-amber-500 group-hover:text-amber-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300",
    },
    {
      icon: (
        <Star
          size={30}
          className="text-purple-500 group-hover:text-purple-600 group-hover:animate-pulse group-hover:rotate-12 transition-all duration-300"
        />
      ),
      label: "₹600 - ₹999",
      priceFrom: 600,
      priceTo: 999,
      url: "/category/shop-by-category",
      className:
        "text-purple-500 group-hover:text-purple-600 group-hover:animate-pulse group-hover:rotate-12 transition-all duration-300",
    },
    {
      icon: (
        <Gift
          size={30}
          className="text-rose-500 group-hover:text-rose-600 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500"
        />
      ),
      label: "₹1000 - ₹1999",
      priceFrom: 1000,
      priceTo: 1999,
      url: "/category/shop-by-category",
      className:
        "text-rose-500 group-hover:text-rose-600 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500",
    },
    {
      icon: (
        <Heart
          size={30}
          className="text-emerald-500 group-hover:text-emerald-600 group-hover:scale-110 group-hover:animate-pulse transition-all duration-300"
        />
      ),
      label: "₹2000 & Above",
      priceFrom: 2000,
      priceTo: 100000,
      url: "/category/shop-by-category",
      className:
        "text-emerald-500 group-hover:text-emerald-600 group-hover:scale-110 group-hover:animate-pulse transition-all duration-300",
    },
  ];

  const dispatch = useDispatch();

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-serif text-slate-800 mb-3 tracking-wide">
            Shop by Price
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-slate-400 to-slate-600 mx-auto rounded-full"></div>
        </div>

        {/* Price Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 px-2">
          {priceCategories.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer
                         border border-slate-200 hover:border-slate-300 overflow-hidden hover:-translate-y-1 p-4 flex flex-col items-center justify-center min-h-[140px]"
            >
              <div className="mb-2 p-3 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-sm group-hover:shadow-md transition-all duration-300">
                {item.icon}
              </div>
              <p className="text-base font-semibold text-slate-800 group-hover:text-slate-900 text-center">
                {item.label}
              </p>
              <div
                className="mt-2 w-0 h-0.5 bg-gradient-to-r from-slate-400 to-slate-600 mx-auto rounded-full
                            group-hover:w-12 transition-all duration-300"
              ></div>
              <Link href={item.url}>
                <Button
                  onClick={() =>
                    dispatch(
                      setPriceRange({
                        priceFrom: item.priceFrom,
                        priceTo: item.priceTo,
                      })
                    )
                  }
                  className={`${item.className} bg-transparent border border-slate-200 hover:border-slate-300 hover:bg-slate-100  text-sm mt-2`}
                >
                  Shop Now
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Decorative bottom border */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mt-6"></div>
      </div>
    </div>
  );
};

export default ShopByPrice;
