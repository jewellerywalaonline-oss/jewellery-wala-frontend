import SimpleLoading from "@/components/comman/SimpleLoading";
import { Suspense } from "react";
import Search from "./Search";

const getProducts = async (q) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/website/product/get-by-search?search=${q}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await response.json();
  if (!response.ok || !data._status) return null;
  return data._data;
};

export default async function Page({ searchParams }) {
  const q = await searchParams.q;

  return (
    <div>
      <Suspense fallback={<SimpleLoading type="page" />}>
        <SearchResults q={q} />
      </Suspense>
    </div>
  );
}

// async component that Suspense can handle
async function SearchResults({ q }) {
  const products = await getProducts(q);

  return <Search products={products} q={q} />;
}

