"use client";

import { useEffect, useState } from "react";
import { Product } from "../types";
import ProductList from "./ProductList";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import SortControls from "./SortControls";
import { useProductStore } from "../store/useProductStore";

interface ProductBrowserProps {
  initialProducts: Product[];
}

export default function ProductBrowser({
  initialProducts = [],
}: ProductBrowserProps) {
  // Get values and actions from the store
  const {
    filteredProducts,
    selectedCategory,
    sortOption,
    setProducts,
    setSelectedCategory,
    setSortOption,
  } = useProductStore();

  // State for sidebar visibility on mobile
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Initialize store with products on component mount
  useEffect(() => {
    if (initialProducts.length > 0) {
      setProducts(initialProducts);
    }
  }, [initialProducts, setProducts]);

  return (
    <>
      {/* Search bar */}
      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="flex flex-col md:flex-row gap-8 relative">
        {/* Mobile sidebar toggle button */}
        <button
          onClick={() => setSidebarVisible(!sidebarVisible)}
          className="md:hidden mb-4 bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          {sidebarVisible ? "Hide Categories" : "Show Categories"}
        </button>

        {/* Sidebar - hidden on mobile by default but can be toggled */}
        <div
          className={`md:w-1/4 ${sidebarVisible ? "block" : "hidden"} md:block`}
        >
          <Sidebar
            onCategorySelect={(category) => {
              setSelectedCategory(category);
              // Auto-hide sidebar after selection on mobile
              if (window.innerWidth < 768) {
                setSidebarVisible(false);
              }
            }}
            selectedCategory={selectedCategory}
          />
        </div>

        {/* Main content */}
        <div className="md:w-3/4 w-full">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">
                {selectedCategory
                  ? `${
                      selectedCategory.charAt(0).toUpperCase() +
                      selectedCategory.slice(1)
                    } Products`
                  : "All Products"}
              </h2>
              <p className="text-sm text-gray-500">
                {filteredProducts.length} items
              </p>
            </div>

            <SortControls
              sortOption={sortOption}
              onSortChange={setSortOption}
            />
          </div>

          <ProductList products={filteredProducts} />
        </div>
      </div>
    </>
  );
}
