/**
 * FilterPills — pill button group for filtering.
 *
 * Always scrollable horizontally so pills never wrap on any screen size.
 * On wider screens where all pills fit, they appear centered naturally.
 *
 * Props:
 * - items: array of { key, label } for each pill
 * - activeKey: currently selected key
 * - onSelect: callback when a pill is clicked
 */

interface FilterPillItem {
  key: string
  label: string
}

interface FilterPillsProps {
  items: FilterPillItem[]
  activeKey: string
  onSelect: (key: string) => void
}

export default function FilterPills({ items, activeKey, onSelect }: FilterPillsProps) {
  return (
    <div className="w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex justify-center gap-2 pb-2 min-w-max mx-auto px-1">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className={`px-5 py-2.5 border-2 rounded-full text-sm font-semibold cursor-pointer transition-all duration-300 whitespace-nowrap ${
              activeKey === item.key
                ? "bg-primary border-primary text-white"
                : "bg-white border-gray-200 text-text-light hover:border-primary hover:text-primary"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
