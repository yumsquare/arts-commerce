export default function Loading() {
  return (
    <div className="flex flex-col gap-10">
      <section className="text-center max-w-4xl mx-auto mb-6 min-h-[100px] flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Discover Amazing Products</h1>
        <p className="text-gray-600">Shop our curated collection of high-quality items at competitive prices.</p>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Featured Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col h-[400px]">
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
      </section>
    </div>
  );
} 