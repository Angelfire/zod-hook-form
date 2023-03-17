interface Expense {
  id: number
  description: string
  amount: number
  category: string
}

interface ListTrackerProps {
  expenses: Expense[]
}

export function ListTracker({ expenses }: ListTrackerProps) {
  return (
    <div className="w-1/3">
      <h2 className="mb-3 text-2xl">Expenses</h2>
      <table className="w-full text-left text-sm text-gray-500 shadow-md dark:text-gray-400 sm:rounded-lg">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr
              key={expense.id}
              className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td className="whitespace-nowrap px-6 py-4">
                {expense.description}
              </td>
              <td className="whitespace-nowrap px-6 py-4">{expense.amount}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {expense.category}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
