import type { TransactionType } from "@/types";

export type Category = {
  id: string;
  label: string;
  type: TransactionType;
  color: string;
};

export const categories: Category[] = [
  // Расходы
  { id: "food", label: "Еда", type: "expense", color: "#ef4444" },
  { id: "transport", label: "Транспорт", type: "expense", color: "#f59e0b" },
  { id: "housing", label: "Жильё", type: "expense", color: "#3b82f6" },
  { id: "entertainment", label: "Развлечения", type: "expense", color: "#a855f7" },
  { id: "health", label: "Здоровье", type: "expense", color: "#10b981" },
  { id: "shopping", label: "Покупки", type: "expense", color: "#ec4899" },
  { id: "other-expense", label: "Прочее", type: "expense", color: "#64748b" },
  // Доходы
  { id: "salary", label: "Зарплата", type: "income", color: "#22c55e" },
  { id: "freelance", label: "Фриланс", type: "income", color: "#14b8a6" },
  { id: "other-income", label: "Прочее", type: "income", color: "#94a3b8" },
];

export const expenseCategories = categories.filter((c) => c.type === "expense");
export const incomeCategories = categories.filter((c) => c.type === "income");

const categoryById = new Map(categories.map((c) => [c.id, c]));

const fallbackCategory: Category = {
  id: "unknown",
  label: "Без категории",
  type: "expense",
  color: "#94a3b8",
};

export function getCategory(id: string): Category {
  return categoryById.get(id) ?? fallbackCategory;
}

export function categoriesFor(type: TransactionType): Category[] {
  return type === "income" ? incomeCategories : expenseCategories;
}
