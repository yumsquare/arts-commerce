import ProductCard from "./components/ProductCard";
import { Product } from "./types";

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://dummyjson.com/products');
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  
  const data = await res.json();
  return data.products;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
