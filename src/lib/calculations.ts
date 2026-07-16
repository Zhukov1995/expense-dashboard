import type { Transaction, TransactionType } from "@/types";

export function totalIncome(txns: Transaction[]): number {
  return txns
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function totalExpense(txns: Transaction[]): number {
  return txns
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function balance(txns: Transaction[]): number {
  return totalIncome(txns) - totalExpense(txns);
}

/** Сумма расходов за месяц переданной даты (по умолчанию — текущий). */
export function expenseThisMonth(txns: Transaction[], now: Date = new Date()): number {
  const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  return txns
    .filter((t) => t.type === "expense" && t.date.startsWith(prefix))
    .reduce((sum, t) => sum + t.amount, 0);
}

export type CategorySum = { category: string; total: number };

/** Суммы расходов по категориям, по убыванию суммы. */
export function sumByCategory(txns: Transaction[]): CategorySum[] {
  const totals = new Map<string, number>();
  for (const t of txns) {
    if (t.type !== "expense") continue;
    totals.set(t.category, (totals.get(t.category) ?? 0) + t.amount);
  }
  return [...totals.entries()]
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
}

export type MonthSum = { month: string; income: number; expense: number };

/** Доходы и расходы по месяцам (ключ YYYY-MM), по возрастанию месяца. */
export function sumByMonth(txns: Transaction[]): MonthSum[] {
  const byMonth = new Map<string, { income: number; expense: number }>();
  for (const t of txns) {
    const month = t.date.slice(0, 7);
    const entry = byMonth.get(month) ?? { income: 0, expense: 0 };
    entry[t.type] += t.amount;
    byMonth.set(month, entry);
  }
  return [...byMonth.entries()]
    .map(([month, sums]) => ({ month, ...sums }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export type Filters = {
  type?: TransactionType | "all";
  category?: string | "all";
  from?: string;
  to?: string;
};

export function applyFilters(txns: Transaction[], filters: Filters): Transaction[] {
  return txns.filter((t) => {
    if (filters.type && filters.type !== "all" && t.type !== filters.type) return false;
    if (filters.category && filters.category !== "all" && t.category !== filters.category)
      return false;
    if (filters.from && t.date < filters.from) return false;
    if (filters.to && t.date > filters.to) return false;
    return true;
  });
}
