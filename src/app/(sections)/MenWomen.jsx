"use client";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";

export default function GenderCategorySection() {
  const navigation = useSelector((state) => state?.ui?.navigation?._data);

  function getCategoryWithMensAndWomens(categories) {
    const categoryWithSubs = categories?.find(
      (cat) => cat?.subCategories && cat?.subCategories?.length > 0
    );

    if (!categoryWithSubs) {
      return [];
    }

    const filteredSubCategories = categoryWithSubs?.subCategories?.filter(
      (sub) => sub.name === "Mens" || sub.name === "Womens"
    );

    return [
      {
        ...categoryWithSubs,
        subCategories: filteredSubCategories,
      },
    ];
  }

  const result = getCategoryWithMensAndWomens(navigation);

  if (!result[0]?.subCategories) return null;

  return (
    <div className="w-full max-w-[100vw] mx-auto py-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          {result[0].name}
        </h2>
        <p className="text-gray-600">Explore our collection</p>
      </div>

      {result.map((category) => (
        <div
          key={category._id}
          className="grid grid-cols-1 md:grid-cols-2 h-[70vh]"
        >
          {category.subCategories.map((subCategory) => (
            <Link
              key={subCategory._id}
              className="h-full"
              href={`/category/${category.slug}/${subCategory.slug}`}
            >
              <div className="relative overflow-hidden cursor-pointer h-full">
                <Image
                  src={subCategory.image}
                  alt={subCategory.name}
                  fill
                  className="object-fit transition-transform duration-300 h-full"
                />
                
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
