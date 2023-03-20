export interface Expense {
  id: number
  description: string
  amount: number
  category: string
}

export interface ListTrackerProps {
  expenses: Expense[]
}
