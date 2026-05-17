/**
 * SearchBar — reusable search input with icon.
 *
 * Props:
 * - value: current search value
 * - onChange: callback when value changes
 * - placeholder: input placeholder text
 * - maxWidth: optional max width class (default: "max-w-md")
 */

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxWidth?: string
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  maxWidth = "max-w-md",
}: SearchBarProps) {
  return (
    <div className={`relative ${maxWidth}`}>
      <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-full text-sm focus:outline-none focus:border-accent transition-all"
      />
    </div>
  )
}
