export const revalidate = 3600;
import ProductListing from "../ProductListing";
import React, { cache } from "react";
import { siteConfig } from "@/lib/utils";
import FilterSidebar from "../FilterSidebar";

export const metadata = {
  title: `Shop Jewellery Online - ${siteConfig.name} | Gold, Silver & Diamond Collection`,
  description: `Browse our extensive collection of premium jewellery in Jodhpur. Shop rings, necklaces, earrings, bracelets, bangles, and more. Gold, silver, and diamond jewellery with traditional Rajasthani craftsmanship.`,
  keywords: `buy jewellery online jodhpur, gold jewellery collection, silver jewellery shop, diamond jewellery store, bridal jewellery, traditional jewellery, ${siteConfig.categories.join(
    ", "
  )}`,
  openGraph: {
    title: `Shop Premium Jewellery - ${siteConfig.name}`,
    description:
      "Explore our curated collection of exquisite jewellery pieces. From traditional to contemporary designs.",
    url: `${siteConfig.url}/category`,
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/category`,
  },
};

const getColor = cache(async () => {
  const color = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/website/color`,
    {
      next: {
        revalidate: 600,
      },
    }
  );

  const data = await color.json();
  if (!color.ok || !data._status) {
    return [];
  }
  return data._data;
});

const getMaterial = cache(async () => {
  const material = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/website/material`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  const data = await material.json();
  if (!material.ok || !data._status) {
    return [];
  }
  return data._data;
});

export default async function page({ params }) {
  const allParams = await params;
  const slug = await allParams.slug;

  const categorySlug = slug[0];
  const subCategorySlug = slug[1] || "";
  const subSubCategorySlug = slug[2] || "";

  const color = await getColor();
  const material = await getMaterial();

  return (
    <div className="">
      <div className="max-w-[100%] mx-auto px-2 md:px-4 ">
        {/* top bar */}
        <div className="text-center py-8 space-y-3">
          {/* MAIN TITLE */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#8B4513] capitalize tracking-wide">
            {subSubCategorySlug
              ? subSubCategorySlug.replace(/[-0-9]/g, " ")
              : subCategorySlug
              ? subCategorySlug.replace(/[-0-9]/g, " ")
              : categorySlug.replace(/[-0-9]/g, " ")}
          </h1>

          {/* SUBTEXT — only show if deeper category exists */}
          {(subSubCategorySlug || subCategorySlug) && (
            <div className="flex justify-center items-center gap-2 text-sm sm:text-base text-gray-600">
              <span>From</span>
              <span className="font-medium text-gray-800 capitalize">
                {subSubCategorySlug
                  ? subCategorySlug.replace(/[-0-9]/g, " ")
                  : categorySlug.replace(/[-0-9]/g, " ")}
              </span>
            </div>
          )}

          <div className="w-16 h-[2px] bg-[#8B4513] mx-auto mt-4 rounded-full opacity-70"></div>
        </div>

        {/* main content */}
        <div className="flex  lg:gap-8 py-8">
          <div className="">
            <FilterSidebar color={color} material={material} />
          </div>
          <main className="flex-1">
            <ProductListing />
          </main>
        </div>
      </div>
    </div>
  );
}
