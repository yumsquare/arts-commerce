export default function Loading() {
  return (
    <div className="flex flex-col gap-10">
      <section className="text-center max-w-4xl mx-auto mb-6 h-[100px] flex flex-col justify-center">
        <div className="h-10 w-80 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
        <div className="h-6 w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
      </section>
      
      <section>
        <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="h-[400px] w-full">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col">
                <div className="h-64 bg-gray-200 animate-pulse flex-shrink-0"></div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-5 w-12 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 