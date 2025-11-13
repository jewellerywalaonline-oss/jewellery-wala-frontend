export default async function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://jewellerywalla.com";

  // Fetch dynamic routes (products, categories, etc.)
  let products = [];
  try {
    const productsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/website/product/all`,
      {
        method: "post",
        next: { revalidate: 86400 }, // Revalidate daily
      }
    );
    if (productsRes.ok) {
      const data = await productsRes.json();

      products =
        data?._data?.map((product) => ({
          url: `${baseUrl}product-details/${product.slug}`,
          lastModified: product.updatedAt || new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        })) || [];
    }
  } catch (error) {
  }

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}terms-and-condition`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  /// categories sitemap
  let categoryUrls = [];
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}api/website/nav`;

  try {
    // Fetch navigation data from API
    const response = await fetch(apiUrl, {
      method: "post",
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch navigation data");
    }

    const categoriesData = await response.json();
    const categories = categoriesData._data;

    const urls = [];

    // Helper function to determine URL prefix
    const urlPrefix = (slug) => {
      if (slug === "home") return "";
      else if (slug === "track-your-order") return "order-track";
      else if (slug === "contact-us") return "contact-us";
      return "category/" + slug;
    };

    // Helper function to check if it's a product category
    const isProductCategory = (slug) => {
      const nonProductSlugs = [
        "home",
        "track-your-order",
        "contact-us",
        "new-arrivals",
        "gift-items",
        "personalized-jewellery",
      ];
      return !nonProductSlugs.includes(slug);
    };

    // Process main categories
    categories.forEach((category) => {
      if (!category.status || category.deletedAt) return;

      const categorySlug = category.slug;
      const isProduct = isProductCategory(categorySlug);

      // Add main category
      urls.push({
        url: `${baseUrl}${urlPrefix(categorySlug)}`,
        lastModified: new Date(category.updatedAt),
        changeFrequency: "weekly",
        priority: categorySlug === "home" ? 1.0 : 0.8,
      });

      // Process subcategories (only for product categories)
      if (
        isProduct &&
        category.subCategories &&
        category.subCategories.length > 0
      ) {
        category.subCategories.forEach((subCategory) => {
          if (!subCategory.status || subCategory.deletedAt) return;

          urls.push({
            url: `${baseUrl}category/${categorySlug}/${subCategory.slug}`,
            lastModified: new Date(subCategory.updatedAt),
            changeFrequency: "weekly",
            priority: 0.8,
          });

          // Process sub-subcategories
          if (
            subCategory.subSubCategories &&
            subCategory.subSubCategories.length > 0
          ) {
            subCategory.subSubCategories.forEach((subSubCategory) => {
              if (!subSubCategory.status || subSubCategory.deletedAt) return;

              urls.push({
                url: `${baseUrl}category/${categorySlug}/${subCategory.slug}/${subSubCategory.slug}`,
                lastModified: new Date(subSubCategory.updatedAt),
                changeFrequency: "weekly",
                priority: 0.8,
              });
            });
          }
        });
      }
    });
    categoryUrls = urls;
  } catch (error) {
  }

  return [...staticRoutes, ...products, ...categoryUrls];
}
