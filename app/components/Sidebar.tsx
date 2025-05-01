import { Product } from "../types";

interface SidebarProps {
  products: Product[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export default function Sidebar({
  products,
  selectedCategory,
  onCategorySelect,
}: SidebarProps) {
  // Get unique categories and their counts
  const categories = products.reduce<{ [key: string]: number }>(
    (acc, product) => {
      const category = product.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>

      <div className="space-y-2">
        <button
          onClick={() => onCategorySelect(null)}
          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-gray-100 flex justify-between items-center ${
            selectedCategory === null
              ? "bg-indigo-50 text-indigo-600 font-medium"
              : ""
          }`}
        >
          <span>All Products</span>
          <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1">
            {products.length}
          </span>
        </button>

        {Object.entries(categories)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([category, count]) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-gray-100 flex justify-between items-center ${
                selectedCategory === category
                  ? "bg-indigo-50 text-indigo-600 font-medium"
                  : ""
              }`}
            >
              <span className="capitalize">{category}</span>
              <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1">
                {count}
              </span>
            </button>
          ))}
      </div>
    </div>
  );
}
