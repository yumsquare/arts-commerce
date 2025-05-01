"use client";

import { useState, useEffect } from "react";
import { Product } from "../types";
import ProductList from "./ProductList";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import SortControls from "./SortControls";

interface ProductBrowserProps {
  initialProducts: Product[];
}

export default function ProductBrowser({
  initialProducts,
}: ProductBrowserProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    // Apply filters whenever dependencies change
    let result = [...products];

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "rating-asc":
        result.sort((a, b) => a.rating - b.rating);
        break;
      default:
        // Default sort (by id)
        result.sort((a, b) => a.id - b.id);
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, searchQuery, sortOption]);

  return (
    <>
      {/* Search bar */}
      <div className="mb-8">
        <SearchBar products={products} onSearch={setSearchQuery} />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <Sidebar
            products={products}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
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
