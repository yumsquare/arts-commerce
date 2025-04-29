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
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 h-[400px]">
              <div className="h-64 bg-gray-200 animate-pulse"></div>
              <div className="p-4 flex flex-col h-[136px]">
                <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="mt-auto flex justify-between items-center">
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 w-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 