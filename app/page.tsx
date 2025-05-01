import { getProducts } from "./data";
import ProductBrowser from "./components/ProductBrowser";
import ProductBrowserSkeleton from "./components/ProductBrowserSkeleton";
import { Suspense } from "react";

// Add for page caching
export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  // Fetch products on the server
  const products = await getProducts();

  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero section with title and subtitle - outside suspense boundary */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Discover Amazing Products</h1>
          <p className="text-gray-600">
            Shop our curated collection of high-quality items at competitive
            prices.
          </p>
        </div>

        {/* Use ProductBrowserSkeleton which doesn't include the hero section */}
        <Suspense fallback={<ProductBrowserSkeleton />}>
          <ProductBrowser initialProducts={products} />
        </Suspense>
      </div>
    </main>
  );
}
