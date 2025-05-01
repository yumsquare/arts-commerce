"use client";

import { create } from "zustand";
import { Product } from "../types";

interface ProductState {
  // Data
  allProducts: Product[];
  filteredProducts: Product[];

  // Filters
  selectedCategory: string | null;
  searchQuery: string;
  sortOption: string;

  // Actions
  setProducts: (products: Product[]) => void;
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSortOption: (option: string) => void;
  applyFilters: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  // Initial state
  allProducts: [],
  filteredProducts: [],
  selectedCategory: null,
  searchQuery: "",
  sortOption: "default",

  // Actions
  setProducts: (products) => {
    set({ allProducts: products });
    get().applyFilters();
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    get().applyFilters();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  setSortOption: (option) => {
    set({ sortOption: option });
    get().applyFilters();
  },

  applyFilters: () => {
    const { allProducts, selectedCategory, searchQuery, sortOption } = get();

    // Start with all products
    let result = [...allProducts];

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

    set({ filteredProducts: result });
  },
}));
