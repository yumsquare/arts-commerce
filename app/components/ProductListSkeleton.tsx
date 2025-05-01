export default function ProductListSkeleton() {
  return (
    <div>
      {/* Search bar skeleton */}
      <div className="mb-8">
        <div className="h-10 bg-gray-200 rounded-lg w-full animate-pulse"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar skeleton */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="md:w-3/4">
          <div className="mb-6 flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/6 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
