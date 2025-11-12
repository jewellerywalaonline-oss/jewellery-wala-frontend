import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/comman/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const getProducts = async (q) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/website/product/get-by-search?search=${q}&limit=8`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      //   next: {
      //     revalidate: 600,
      //   },
    }
  );
  const data = await response.json();
  if (!response.ok || !data._status) return [];
  return data._data;
};

export default async function ProductsTab() {
  const [payalData, necklaceData, braceletData] = await Promise.all([
    getProducts("payal"),
    getProducts("necklace"),
    getProducts("bracelet"),
  ]);

  const tabItems = [
    { value: "payal", label: "Payal", data: payalData },
    { value: "necklace", label: "Necklaces", data: necklaceData },
    { value: "bracelet", label: "Bracelets", data: braceletData },
  ];

  return (
    <section className="py-8 bg-gray-50/70">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-amber-800 mb-2 capitalize">
          Our Products Collection
        </h2>
        <div className="w-24 h-1 bg-amber-500 mx-auto mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Discover our exquisite collection of handcrafted jewellery, designed
          to add elegance to your every moment.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <Tabs defaultValue={tabItems[0].value} className="w-full">
          <div className="overflow-x-auto pb-2">
            <TabsList className=" w-full md:w-auto grid grid-cols-3 mx-auto bg-transparent border-b border-gray-200 h-auto p-0 rounded-none gap-0">
              {tabItems.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="py-3 px-2 text-sm md:text-base font-medium text-gray-500 hover:text-amber-600 transition-colors duration-200 border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:text-amber-600"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="mt-8">
            {tabItems.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="m-0">
                {tab.data && tab.data.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {tab.data.map((product) => (
                      <div key={product._id} className="group">
                        <ProductCard data={product} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    No {tab.label.toLowerCase()} found.
                  </div>
                )}
                {tab.data && tab.data.length > 0 && (
                  <div className="text-center mt-8">
                    <Link href={`/search?q=${tab.value}`}>
                      <Button
                        variant="outline"
                        className="border-amber-500 text-amber-600 hover:bg-amber-50"
                      >
                        View All {tab.label}
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
