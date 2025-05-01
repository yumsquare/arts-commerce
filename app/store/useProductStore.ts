"use client";

import { create } from "zustand";
import { Product } from "../types";

interface ProductState {
  // Data
  allProducts: Product[];

  // Filters
  selectedCategory: string | null;
  searchQuery: string;
  sortOption: string;

  // Actions
  setProducts: (products: Product[]) => void;
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSortOption: (option: string) => void;
}

// Create selector functions outside the store for better memoization
const getFilteredProducts = (state: ProductState) => {
  const { allProducts, selectedCategory, searchQuery, sortOption } = state;

  // Start with all products
  let result = [...allProducts];

  // Apply category filter
  if (selectedCategory) {
    result = result.filter((product) => product.category === selectedCategory);
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
      return [...result].sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return [...result].sort((a, b) => b.title.localeCompare(a.title));
    case "rating-desc":
      return [...result].sort((a, b) => b.rating - a.rating);
    case "rating-asc":
      return [...result].sort((a, b) => a.rating - b.rating);
    default:
      return [...result].sort((a, b) => a.id - b.id);
  }
};

export const useProductStore = create<ProductState>((set, get) => ({
  // Initial state
  allProducts: [],
  selectedCategory: null,
  searchQuery: "",
  sortOption: "default",

  // Actions
  setProducts: (products) => set({ allProducts: products }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortOption: (option) => set({ sortOption: option }),
}));

// Create a selector hook for filtered products
export const useFilteredProducts = () => useProductStore(getFilteredProducts);
