import React from "react";
import { siteConfig } from "@/lib/utils";

export const metadata = {
  title: `Terms and Conditions - ${siteConfig.name}`,
  description: `Read the terms and conditions for shopping at ${siteConfig.name}. Understand your rights and responsibilities when purchasing jewellery from our store.`,
  keywords: `terms and conditions, jewellery store terms, ${siteConfig.name} terms of service, online shopping terms`,
  openGraph: {
    title: `Terms and Conditions - ${siteConfig.name}`,
    description:
      "Our terms and conditions for a transparent shopping experience.",
    url: `${siteConfig.url}/terms-and-condition`,
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/terms-and-condition`,
  },
};

export default function page() {
  return <div>No Code here create about component and import it</div>;
}
