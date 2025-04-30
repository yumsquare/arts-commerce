import Link from "next/link";

export default function ProductLoading() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Use Link instead of a */}
      <div className="mb-6">
        <Link
          href="/"
          className="text-indigo-500 hover:text-indigo-600 flex items-center gap-1 font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back to Products
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Product image section placeholder */}
        <div className="md:w-1/2 relative overflow-hidden rounded-xl bg-gray-100 border border-gray-100">
          {/* Top section with rating placeholder */}
          <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-center z-10">
            {/* Tag placeholder */}
            <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>

            {/* Rating placeholder */}
            <div className="w-14 h-5 bg-gray-200 rounded-full animate-pulse"></div>
          </div>

          {/* Main image placeholder */}
          <div className="aspect-square bg-gray-200 animate-pulse"></div>

          {/* Thumbnail gallery placeholder */}
          <div className="mt-4 grid grid-cols-4 gap-3 p-3">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="aspect-square rounded-lg bg-gray-200 animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Product info section placeholder */}
        <div className="md:w-1/2">
          {/* Title placeholder */}
          <div className="h-10 bg-gray-200 rounded mb-3 animate-pulse"></div>

          {/* Price placeholder */}
          <div className="w-24 h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>

          {/* Description placeholder - multiple lines */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Add to cart button placeholder */}
          <div className="mb-6">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Product details section placeholder */}
          <div className="border-t border-gray-200 pt-4">
            <div className="h-6 w-36 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <ul className="space-y-2">
              <li className="h-4 bg-gray-200 rounded animate-pulse"></li>
              <li className="h-4 bg-gray-200 rounded animate-pulse"></li>
              <li className="h-4 bg-gray-200 rounded animate-pulse"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
