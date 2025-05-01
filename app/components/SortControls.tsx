interface SortControlsProps {
  sortOption: string;
  onSortChange: (option: string) => void;
}

export default function SortControls({
  sortOption,
  onSortChange,
}: SortControlsProps) {
  const options = [
    { value: "default", label: "Default" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
    { value: "rating-desc", label: "Rating: High to Low" },
    { value: "rating-asc", label: "Rating: Low to High" },
  ];

  return (
    <div className="flex items-center">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2">
        Sort by:
      </label>
      <select
        id="sort"
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-white border border-gray-200 text-sm rounded-lg focus:ring-indigo-300 focus:border-indigo-400 block p-2 pr-8"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
