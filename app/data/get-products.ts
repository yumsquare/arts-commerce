import { Product } from "../types";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products?limit=500");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.products;
}
