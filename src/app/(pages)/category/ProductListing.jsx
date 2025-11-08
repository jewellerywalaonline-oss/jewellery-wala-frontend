"use client";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import ProductCard from "@/components/comman/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { openSidebar, toggleSidebar } from "@/redux/features/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function ProductListing() {
  const searchParams = useParams();
  const categorySlug =
    searchParams.slug[0] === "shop-by-category" ? "" : searchParams.slug[0];
  const subCategorySlug = searchParams.slug[1];
  const subSubCategorySlug = searchParams.slug[2];

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedSort, setSelectedSort] = useState();
  const [isScrolled, setIsScrolled] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const observerTarget = useRef(null);
  const isOpen = useSelector((state) => state.ui.isSidebarOpen);
  const dispatch = useDispatch();
  const { category, color, material, priceFrom, priceTo } = useSelector(
    (state) => state.filters
  );

  const PRODUCTS_PER_PAGE = 15;

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sorting effect
  useEffect(() => {
    if (!filteredProducts.length) return;

    const sorted = [...filteredProducts];
    if (selectedSort === "newest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (selectedSort === "low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "high") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "atoz") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort === "ztoa") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFilteredProducts(sorted);
  }, [selectedSort]);

  // Fetch products function
  const fetchProducts = async (page = 1, append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    try {
      const requestBody = {
        categorySlug,
        subCategorySlug: category.length > 0 ? category : subCategorySlug,
        subSubCategorySlug: category.length > 0 ? "" : subSubCategorySlug,
        colorIds: color,
        materialIds: material,
        priceFrom,
        priceTo,
        page,
        limit: PRODUCTS_PER_PAGE,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/website/product/get-by-filter`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          next: {
            revalidate: 600, 
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (!response.ok || !data._status) {
        toast.error(data._message || "Something went wrong");
        setHasMore(false);
        return;
      }

      const newProducts = data._data || [];

      if (append) {
        setFilteredProducts((prev) => {
          return [...prev, ...newProducts];
        });
      } else {
        setFilteredProducts(newProducts);
      }

      // Determine if there are more products
      const total = data.totalCount || data.total || data._total;
      if (total) {
        setTotalProducts(total);
        const hasMoreProducts = page * PRODUCTS_PER_PAGE < total;
        setHasMore(hasMoreProducts);
      } else {
        // Fallback: if we got fewer products than requested, we've reached the end
        const hasMoreProducts = newProducts.length === PRODUCTS_PER_PAGE;

        setHasMore(hasMoreProducts);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Initial fetch and filter changes
  useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
    setFilteredProducts([]);
    fetchProducts(1, false);
  }, [
    categorySlug,
    subCategorySlug,
    subSubCategorySlug,
    color,
    material,
    priceFrom,
    priceTo,
    category,
  ]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting;

        if (isVisible && hasMore && !loadingMore && !loading) {
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);
          fetchProducts(nextPage, true);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loadingMore, loading, currentPage]);

  const toggle = () => {
    dispatch(openSidebar());
  };

  if (loading) {
    return (
      <div className="text-center flex items-center justify-center py-16">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Top bar */}
      <div className="lg:flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-3">
        <div>
          <h2 className="text-2xl font-serif text-[#8B4513]">
            All Found Products
          </h2>
          <p className="text-gray-500 text-sm">
            {totalProducts || filteredProducts?.length} product
            {(totalProducts || filteredProducts?.length) !== 1 ? "s" : ""}
          </p>
        </div>
        <div className={`flex items-center gap-3`}>
          <Button
            variant="outline"
            className={`lg:hidden ${
              isScrolled && !isOpen
                ? "block animate-slide-in fixed top-[18%] z-[500] left-[10px]"
                : "hidden animate-slide-out"
            }`}
            onClick={toggle}
          >
            Filter
          </Button>
          <Button
            variant="outline"
            className={`block lg:hidden`}
            onClick={toggle}
          >
            Filter
          </Button>
          <Select value={selectedSort} onValueChange={setSelectedSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Sort: Newest</SelectItem>
              <SelectItem value="low">Price: Low → High</SelectItem>
              <SelectItem value="high">Price: High → Low</SelectItem>
              <SelectItem value="atoz">A to Z</SelectItem>
              <SelectItem value="ztoa">Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts?.length > 0 ? (
        <div className="">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-3 lg:gap-5 animate-fade-in duration-100 sm:px-0">
            {filteredProducts.map((p, index) => (
              <ProductCard data={p} key={`${p._id}-${index}`} {...p} />
            ))}
          </div>

          {/* Observer target for infinite scroll */}
          {hasMore && (
            <div
              ref={observerTarget}
              className="h-20 mt-8 flex items-center justify-center"
              style={{ border: "2px dashed #ccc", background: "#f9f9f9" }}
            >
              {loadingMore ? (
                <div className="text-center flex items-center justify-center gap-2">
                  <Loader className="animate-spin" size={20} />
                  <span className="text-sm text-gray-500">
                    Loading more products...
                  </span>
                </div>
              ) : hasMore ? (
                <span className="text-xs text-gray-400"></span>
              ) : null}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            No products found matching your filters.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Try adjusting your filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}
