import { useState } from "react"

import { FormTracker } from "./components/FormTracker"
import { ListTracker } from "./components/ListTracker"

import type { FormData } from "./components/FormTracker"

export const categories = ["Groceries", "Utilities", "Entertainment"] as const

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Groceries", amount: 100, category: "Groceries" },
  ])

  const handleSubmit = (expense: FormData) => {
    setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
  }

  return (
    <div className="container my-12 flex flex-col gap-6">
      <FormTracker onSubmit={handleSubmit} />
      <ListTracker expenses={expenses} />
    </div>
  )
}

export default App
