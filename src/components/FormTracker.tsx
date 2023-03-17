import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Label } from "./ui/Label"
import { Input } from "./ui/Input"
import { buttonVariants } from "./ui/Button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select"

import { cn } from "../lib/utils"

import { categories } from "../App"

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be at least 3 characters" })
    .max(50),
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .min(0.01)
    .max(100_000),
  category: z.enum(["Groceries", "Utilities", "Entertainment"], {
    errorMap: () => ({ message: "Category is required" }),
  }),
})

export type FormData = z.infer<typeof schema>

interface FormTrackerProps {
  onSubmit: (data: FormData) => void
}

export function FormTracker({ onSubmit }: FormTrackerProps) {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  return (
    <div className="grid w-1/3">
      <h2 className="mb-3 text-2xl">Expenses Form</h2>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(data => {
          onSubmit(data)
          reset()
        })}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            id="description"
            placeholder="description..."
            aria-invalid={errors.description ? "true" : "false"}
            {...register("description")}
          />
          {errors.description && (
            <p className="px-1 text-xs text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="amount">Amount</Label>
          <Input
            type="number"
            id="amount"
            placeholder="amount"
            aria-invalid={errors.amount ? "true" : "false"}
            {...register("amount", { valueAsNumber: true })}
          />
          {errors.amount && (
            <p className="px-1 text-xs text-red-600">{errors.amount.message}</p>
          )}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="category">Category</Label>
          <Controller
            name="category"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select name={name} onValueChange={onChange} defaultValue={value}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent ref={ref}>
                  {categories.map((category, index) => (
                    <SelectItem value={category} key={`${category}-${index}`}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="px-1 text-xs text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>
        <button className={cn(buttonVariants())} type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}
