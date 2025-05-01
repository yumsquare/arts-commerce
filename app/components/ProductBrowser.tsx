"use client";

import { useEffect } from "react";
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

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <Sidebar
            onCategorySelect={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>

        {/* Main content */}
        <div className="md:w-3/4">
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
