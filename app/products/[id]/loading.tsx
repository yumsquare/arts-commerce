export default function ProductLoading() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Back button placeholder */}
      <div className="mb-6">
        <div className="w-36 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-12">
        {/* Product image section placeholder */}
        <div className="md:w-1/2 relative overflow-hidden rounded-xl bg-gray-100 border border-gray-100">
          {/* Main image placeholder */}
          <div className="aspect-square bg-gray-200 animate-pulse"></div>
          
          {/* Thumbnail gallery placeholder */}
          <div className="mt-4 grid grid-cols-4 gap-3 p-3">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="aspect-square rounded-lg bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        </div>
        
        {/* Product info section placeholder */}
        <div className="md:w-1/2">
          {/* Title placeholder */}
          <div className="h-10 bg-gray-200 rounded mb-3 animate-pulse"></div>
          
          {/* Rating and metadata placeholders */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-2 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-40 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-2 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-40 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          {/* Price placeholder */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          
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