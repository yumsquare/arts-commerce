export default function ProductBrowserSkeleton() {
  return (
    <>
      {/* Search bar skeleton */}
      <div className="mb-8">
        <div className="h-10 bg-gray-200 rounded-lg w-full animate-pulse"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile toggle button skeleton */}
        <div className="md:hidden mb-4 h-10 bg-gray-200 rounded-lg w-40 animate-pulse"></div>

        {/* Sidebar skeleton - hidden on mobile */}
        <div className="md:w-1/4 hidden md:block">
          <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="md:w-3/4 w-full">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <div className="h-7 bg-gray-200 rounded w-40 mb-1 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
            <div className="flex items-center">
              <div className="h-9 bg-gray-200 rounded w-36 animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col">
                <div className="relative bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center h-[300px] mb-4">
                  <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-center z-10">
                    <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-14 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                  <div className="w-[200px] h-[200px] bg-gray-200 animate-pulse"></div>
                </div>
                <div className="text-left">
                  <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
