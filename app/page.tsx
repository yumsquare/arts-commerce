import { getProducts } from "./data";
import ProductList from "./components/ProductList";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="flex flex-col gap-10">
      <section className="text-center max-w-4xl mx-auto mb-6 min-h-[100px] flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Discover Amazing Products
        </h1>
        <p className="text-gray-600">
          Shop our curated collection of high-quality items at competitive
          prices.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Featured Products
        </h2>
        <ProductList products={products} />
      </section>
    </div>
  );
}
