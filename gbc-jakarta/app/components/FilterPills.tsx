/**
 * FilterPills — horizontal pill button group for filtering.
 * Auto-detects layout: centered (≤5 items) or scrollable (>5 items).
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
  const isScrollable = items.length > 5

  return (
    <div
      className={`flex gap-2 pb-2 ${
        isScrollable
          ? "overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          : "justify-center flex-wrap"
      }`}
    >
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => onSelect(item.key)}
          className={`px-5 py-2.5 border-2 rounded-full text-[0.85rem] font-semibold cursor-pointer transition-all duration-300 shrink-0 ${
            activeKey === item.key
              ? "bg-primary border-primary text-white"
              : "bg-white border-gray-200 text-text-light hover:border-primary hover:text-primary"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
