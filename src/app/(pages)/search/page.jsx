import SimpleLoading from "@/components/comman/SimpleLoading";
import { Suspense } from "react";
import Search from "./Search";

async function getProducts(q) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/website/product/get-by-search`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ search: q }), // send search text here
      cache: "no-store", // optional: disable caching
    }
  );
  const data = await response.json();
  if (!response.ok || !data._status) return null;
  return data._data;
}

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

export const dynamic = "force-dynamic";
