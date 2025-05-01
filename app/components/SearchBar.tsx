"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useProductStore } from "../store/useProductStore";
import { Product } from "../types";
import Link from "next/link";

export default function SearchBar() {
  const { allProducts, searchQuery, setSearchQuery, setSelectedCategory } =
    useProductStore();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionBoxRef = useRef<HTMLDivElement>(null);

  // Use useMemo instead of useState + useEffect for suggestions
  const suggestions = useMemo(() => {
    if (searchQuery.trim().length >= 2) {
      return allProducts
        .filter(
          (product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5); // Limit to 5 suggestions
    }
    return [];
  }, [searchQuery, allProducts]);

  // Update showSuggestions based on suggestions
  useEffect(() => {
    setShowSuggestions(
      suggestions.length > 0 && searchQuery.trim().length >= 2
    );
  }, [suggestions, searchQuery]);

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle search submission
  const handleSearchSubmit = () => {
    setShowSuggestions(false);
    setSelectedCategory(null); // Reset category to "All Products"
  };

  return (
    <div className="relative w-full" ref={suggestionBoxRef}>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchSubmit();
            }
          }}
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all duration-200 ease-in-out text-sm"
        />
        <button
          onClick={handleSearchSubmit}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-500 hover:bg-indigo-600 text-white p-1 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 max-h-60 overflow-auto">
          {suggestions.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              onClick={() => {
                setSearchQuery(product.title);
                setShowSuggestions(false);
              }}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm flex items-center"
            >
              <div className="w-8 h-8 relative mr-2 flex-shrink-0">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div>
                <p className="font-medium">{product.title}</p>
                <p className="text-xs text-gray-500 capitalize">
                  {product.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
