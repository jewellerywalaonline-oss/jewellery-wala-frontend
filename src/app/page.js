import Banner from "./(sections)/Banner";
import RoundCategorySlider from "./(sections)/RoundCategorySlider";
import MenWomen from "./(sections)/MenWomen";
import ShopByPrice from "./(sections)/ShopbyPrice";
import TabProducts from "./(sections)/TabProducts";
import Slider from "./(sections)/Slider";
import WhyChooseUs from "./(sections)/WhyChooseUs";
import Testimonial from "./(sections)/Testimonial";
import FullVideoSection from "./(sections)/video";
import GiftItems from "./(sections)/GiftItems";
import { siteConfig } from "@/lib/utils";
import { cache } from "react";

export const metadata = {
  title: `Jewellery Wala in Jodhpur | Best Gold & Silver Jewellery Shop | ${siteConfig.name}`,
  description: `Best Jewellery Wala in Jodhpur - ${siteConfig.name} offers exquisite collection of Gold, Silver, Diamond & Polki jewellery. Visit our store in Jodhpur for traditional & modern designs. Free Shipping & Lifetime Exchange.`,
  keywords: [
    "Jewellery Wala Jodhpur",
    "Best Jewellery Shop in Jodhpur",
    "Gold Jewellery Jodhpur",
    "Silver Jewellery Jodhpur",
    "Diamond Jewellery Jodhpur",
    "Traditional Jewellery Jodhpur",
    "Jewellery Store Near Me",
    "Jodhpur Jewellery Market",
    "Jewellery Wholesale Jodhpur",
    "Bridal Jewellery Jodhpur",
    ...siteConfig.keywords,
  ].join(", "),
  openGraph: {
    title: `Jewellery Wala in Jodhpur | Best Gold & Silver Jewellery | ${siteConfig.name}`,
    description: `Discover the finest collection of traditional and contemporary jewellery at ${siteConfig.name}, the leading Jewellery Wala in Jodhpur. Best prices on Gold, Silver, Diamond & Polki jewellery.`,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Premium Jewellery Collection in Jodhpur - " + siteConfig.name,
      },
    ],
    locale: "en_IN",
    type: "website",
    address: {
      streetAddress: "Your Store Address",
      addressLocality: "Jodhpur",
      addressRegion: "Rajasthan",
      postalCode: "342001",
      addressCountry: "IN",
    },
    phone: "+91-XXXXXXXXXX",
    email: "contact@yourjewellerywala.com",
  },
  twitter: {
    card: "summary_large_image",
    title: `Jewellery Wala in Jodhpur | ${siteConfig.name} | Best Jewellery Store`,
    description: `Explore our exclusive collection of Gold, Silver & Diamond jewellery in Jodhpur. Best prices & latest designs at ${siteConfig.name}. Visit us today!`,
    images: [`${siteConfig.url}/og-image.jpg`],
    site: "@yourjewellerywala",
    creator: "@yourjewellerywala",
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
    yandex: "YANDEX_VERIFICATION_CODE",
  },
};

// Structured Data for Local Business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: siteConfig.name,
  image: `${siteConfig.url}/og-image.jpg`,
  description: `Best Jewellery Wala in Jodhpur offering Gold, Silver, Diamond & Polki jewellery. Visit our store in Jodhpur for traditional & modern designs.`,
  url: siteConfig.url,
  telephone: "+91-XXXXXXXXXX",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Your Store Address",
    addressLocality: "Jodhpur",
    addressRegion: "Rajasthan",
    postalCode: "342001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "26.2389",
    longitude: "73.0243",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "10:00",
    closes: "21:00",
  },
  priceRange: "₹₹₹",
  sameAs: [
    "https://www.facebook.com/yourjewellerywala",
    "https://www.instagram.com/yourjewellerywala",
    "https://twitter.com/yourjewellerywala",
  ],
};

// import TraditionalJewellery from "./(sections)/Traditional";
const GetTestimonials = cache(async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "api/website/testimonial",
    {
      revalidate: 86400,
    }
  );
  const data = await response.json();

  return data._data;
});

const getTabsData = cache(async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "api/website/product/tab-products",
    {
      method: "POST",
      revalidate: 86400,
    }
  );
  const data = await response.json();
  return data._data;
});

// new arrivals
const getNewArrivals = cache(async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "api/website/product/new-arrivals",
    {
      method: "POST",
      revalidate: 86400,
    }
  );
  const data = await response.json();
  return data._data;
});

// get trending products
const getTrendingProducts = cache(async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "api/website/product/trending-products",
    {
      method: "POST",
      revalidate: 86400,
    }
  );
  const data = await response.json();

  return data._data;
});

export default async function Home() {
  const [testimonials, tabsData, newArrivals, trendingProducts] =
    await Promise.all([
      GetTestimonials(),
      getTabsData(),
      getNewArrivals(),
      getTrendingProducts(),
    ]);

  return (
    <>
      {/* Add Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Banner />
      <RoundCategorySlider />
      <MenWomen />
      {/* <TraditionalJewellery/> */}
      <ShopByPrice bg="bg-[#f8f8f8]" />
      <TabProducts data={tabsData} />
      <WhyChooseUs bg="bg-[#f8f8f8]" />
      <Slider data={newArrivals} heading="New Arrivals" />
      <FullVideoSection />
      <Slider data={newArrivals} heading="Perfect Gift Items" />

      <Slider data={trendingProducts} heading="Trending Products" bg="bg-[#f8f8f8]" />
      <Testimonial data={testimonials}  />
    </>
  );
}
