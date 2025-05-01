import ProductBrowserSkeleton from "./components/ProductBrowserSkeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero section with title and subtitle */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Discover Amazing Products</h1>
        <p className="text-gray-600">
          Shop our curated collection of high-quality items at competitive
          prices.
        </p>
      </div>

      {/* Product browser skeleton without duplicating the hero section */}
      <ProductBrowserSkeleton />
    </div>
  );
}
