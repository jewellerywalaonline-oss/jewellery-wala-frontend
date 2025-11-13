import Wishlist from "@/app/(sections)/Wishlist";
import React, { Suspense } from "react";
import { siteConfig } from "@/lib/utils";
import { cookies } from "next/headers";

export const metadata = {
  title: `My Wishlist - ${siteConfig.name}`,
  description:
    "Save your favorite jewellery pieces to your wishlist for easy access later.",
  robots: {
    index: false,
    follow: true,
  },
};

async function getWishlist() {
  const cookie = await cookies();
  const token = cookie.get("user");

  if (!token) return null;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/website/wishlist/view`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      method: "post",
    }
  );
  const data = await response.json();

  if (!response.ok || !data._status) {
    return null;
  }
  return data;
}

export default async function page() {
  const wishlist = await getWishlist();
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        }
      >
        <Wishlist wishlist={wishlist._data} />
      </Suspense>
    </div>
  );
}
