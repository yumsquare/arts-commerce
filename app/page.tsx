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
    <div className="flex flex-col gap-10">
      <section className="text-center max-w-4xl mx-auto mb-6 min-h-[100px] flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Discover Amazing Products</h1>
        <p className="text-gray-600">Shop our curated collection of high-quality items at competitive prices.</p>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Featured Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
