import { useState } from "react"

import { FilterTracker } from "./components/FilterTracker"
import { FormTracker } from "./components/FormTracker"
import { ListTracker } from "./components/ListTracker"

import type { FormData } from "./components/FormTracker"
import type { Expense } from "./types"

export const categories = ["Groceries", "Utilities", "Entertainment"] as const

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  const handleSubmit = (expense: FormData) => {
    setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
  }

  const visibleExpenses = selectedCategory
    ? expenses.filter(e => e.category === selectedCategory)
    : expenses

  return (
    <div className="container my-12 flex flex-col gap-6">
      <FormTracker onSubmit={handleSubmit} />
      <FilterTracker
        onSelectCategory={category => setSelectedCategory(category)}
      />
      {visibleExpenses.length > 0 && <ListTracker expenses={visibleExpenses} />}
    </div>
  )
}

export default App
