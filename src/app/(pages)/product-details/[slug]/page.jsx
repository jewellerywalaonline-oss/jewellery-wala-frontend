import { siteConfig, defaultMetadata } from "@/lib/utils";
import ProductDetailsPage from "./ProductDetail";

export async function generateMetadata({ params }) {
  // First, get the slug from params
  const allParams = await params;
  const { slug } = await allParams;

  // Then fetch the product data
  const product = await getProducts(slug);

  if (!product) {
    return {
      title: "Product Not Found | Jewellery Walla",
      description: "The requested product could not be found.",
    };
  }

  const productUrl = `${siteConfig.url}/product-details/${slug}`;
  const productImage = product.image || `${siteConfig.url}/images/og-image.jpg`;
  const price = product.discount_price || product.price;
  const currency = "INR";
  const availability =
    product.stock > 0
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock";

  // Enhanced local SEO keywords for Jodhpur jewelry shop
  const categoryName = product.category?.[0]?.name || "jewellery";
  const localKeywords = [
    product.name,
    categoryName,
    `${categoryName} in Jodhpur`,
    `Jodhpur ${categoryName}`,
    "Jodhpur jewellery shop",
    "Rajasthani jewellery",
    "traditional jewellery Jodhpur",
    "gold jewellery Jodhpur",
    "silver jewellery Jodhpur",
    siteConfig.name,
    ...(product.tags || []),
  ].join(", ");

  const enhancedDescription =
    product.description ||
    `Buy authentic ${product.name} from ${
      siteConfig.name
    }, your trusted jewellery shop in Jodhpur, Rajasthan. ${
      product.short_description || ""
    } Shop premium quality ${categoryName} with traditional Rajasthani craftsmanship. Best prices in Jodhpur.`;

  return {
    title: `${product.name} | ${siteConfig.name}`,
    description: enhancedDescription,
    keywords: localKeywords,

    alternates: {
      canonical: productUrl,
    },

    openGraph: {
      ...defaultMetadata.openGraph,
      type: "website", // Fixed: Changed from "product" to "website"
      title: `${product.name} | ${siteConfig.name}`,
      description: enhancedDescription,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: `${product.name} - ${siteConfig.name} Jodhpur`,
        },
      ],
      site_name: siteConfig.name,
      url: productUrl,
      locale: "en_IN",
    },

    twitter: {
      ...defaultMetadata.twitter,
      card: "summary_large_image",
      title: `${product.name} | ${siteConfig.name}`,
      description:
        product.description ||
        `Buy ${product.name} from Jodhpur's trusted jewellery shop.`,
      images: [productImage],
    },

    // Robots meta tags for better indexing
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
  };
}

// Enhanced structured data for better SEO
export async function generateProductSchema(product, productUrl) {
  const productImage = product.image || `${siteConfig.url}/images/og-image.jpg`;
  const price = product.discount_price || product.price;
  const currency = "INR";
  const availability =
    product.stock > 0
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock";

  const schemas = [
    // Product Schema
    {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.name,
      image: productImage,
      description:
        product.description ||
        `Buy ${product.name} from ${siteConfig.name} in Jodhpur, Rajasthan. ${
          product.short_description || ""
        }`,
      sku: product.sku || product._id,
      mpn: product.sku || product._id,
      brand: {
        "@type": "Brand",
        name: siteConfig.name,
      },
      offers: {
        "@type": "Offer",
        url: productUrl,
        priceCurrency: currency,
        price: price,
        priceValidUntil: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        itemCondition: "https://schema.org/NewCondition",
        availability: availability,
        seller: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
      },
      aggregateRating: product.rating
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount || 1,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    },
    // Local Business Schema for Jodhpur shop
    {
      "@context": "https://schema.org",
      "@type": "JewelryStore",
      name: siteConfig.name,
      image: siteConfig.url + "/images/shop-image.jpg",
      "@id": siteConfig.url,
      url: siteConfig.url,
      telephone: siteConfig.contact.phone || "+91-XXXXXXXXXX", // Add your phone number
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.contact.address || "Your Street Address", // Add your address
        addressLocality: "Jodhpur",
        addressRegion: "Rajasthan",
        postalCode: "342001", // Update with your postal code
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 26.2389, // Update with your actual coordinates
        longitude: 73.0243,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "10:00",
          closes: "20:00",
        },
      ],
      sameAs: [
        siteConfig.social?.facebook || "",
        siteConfig.social?.instagram || "",
        siteConfig.social?.twitter || "",
      ].filter(Boolean),
    },
  ];

  return schemas;
}

async function getProducts(slug) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/website/product/details/${slug}`,
    {
      method: "post",
      next: {
        revalidate: 600,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data?._status ? data._data : null;
}

export default async function Page({ params }) {
  const allParams = await params;
  const { slug } = await allParams;
  const product = await getProducts(slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Product Not Found
        </h1>
        <p className="text-gray-600">
          The requested product could not be found. Browse our collection of
          authentic Jodhpur jewellery.
        </p>
      </div>
    );
  }

  const productUrl = `${siteConfig.url}/product-details/${slug}`;
  const schemas = await generateProductSchema(product, productUrl);

  return (
    <>
      {/* Inject structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas),
        }}
      />
      <ProductDetailsPage details={product} />
    </>
  );
}
