import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select"

interface FilterTrackerProps {
  onSelectCategory: (category: string) => void
}

const categories = ["Groceries", "Utilities", "Entertainment"] as const

export function FilterTracker({ onSelectCategory }: FilterTrackerProps) {
  return (
    <div className="grid w-1/3">
      <h2 className="mb-3 text-2xl">Expenses Filter</h2>
      <Select onValueChange={onSelectCategory}>
        <SelectTrigger>
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent onChange={e => console.log(e)}>
          {categories.map((category, index) => (
            <SelectItem value={category} key={`${category}-${index}`}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
