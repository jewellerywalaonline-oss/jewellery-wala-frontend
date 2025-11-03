import AccountPage from "@/app/(sections)/Profile";
import React from "react";
import { cookies } from "next/headers";
import { siteConfig, defaultMetadata } from "@/lib/utils";

export async function generateMetadata() {
  const cookie = await cookies();
  const token = cookie.get("user");

  const baseTitle = "My Account";
  const baseDescription =
    "Manage your jewellery preferences, orders, and personal information at Jewellery Wala.";

  if (!token) {
    return {
      ...defaultMetadata,
      title: {
        default: `${baseTitle} | ${siteConfig.name}`,
        template: `%s | ${siteConfig.name}`,
      },
      description: baseDescription,
      keywords: [
        ...siteConfig.keywords,
        "jewellery wala",
        "my account",
        "account settings",
        "order history",
        "jewellery preferences",
        "wishlist",
        "address book",
        "profile management",
        "jewellery account",
        "personal information",
        "account security",
        "login",
        "sign in",
        "jewellery collection",
        "favorite items",
      ],
      openGraph: {
        ...defaultMetadata.openGraph,
        title: `${baseTitle} | ${siteConfig.name}`,
        description: baseDescription,
      },
      twitter: {
        ...defaultMetadata.twitter,
        title: `${baseTitle} | ${siteConfig.name}`,
        description: baseDescription,
      },
      robots: {
        ...defaultMetadata.robots,
        index: false,
        follow: true,
      },
    };
  }

  // For logged-in users, we'll update the metadata after fetching user data
  return {
    ...defaultMetadata,
    title: {
      default: `${baseTitle} | ${siteConfig.name}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: baseDescription,
    keywords: [
      ...siteConfig.keywords,
      "my account",
      "account settings",
      "order history",
      "jewellery preferences",
      "wishlist",
      "address book",
      "profile management",
      "jewellery account",
      "personal information",
      "account security",
      "my orders",
      "jewellery collection",
      "favorite items",
      "order tracking",
      "account dashboard",
      "jewellery wishlist",
      "saved items",
      "profile settings",
      "update profile",
      "manage account",
      "jewellery account settings",
    ],
    openGraph: {
      ...defaultMetadata.openGraph,
      title: `${baseTitle} | ${siteConfig.name}`,
      description: baseDescription,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: `${baseTitle} | ${siteConfig.name}`,
      description: baseDescription,
    },
    robots: {
      ...defaultMetadata.robots,
      index: false,
      follow: true,
    },
  };
}

async function getDetails() {
  const cookie = await cookies();
  const token = cookie.get("user");

  if (!token) return null;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/website/user/profile`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      method: "post",
    }
  );
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  if (!response.ok || !data._status) {
    return null;
  }
  return data._data;
}

export default async function page() {
  const details = await getDetails();
  return (
    <>
      <AccountPage data={details} />
    </>
  );
}
