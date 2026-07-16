import { describe, it, expect } from "vitest";
import type { Transaction } from "@/types";
import {
  totalIncome,
  totalExpense,
  balance,
  expenseThisMonth,
  sumByCategory,
  sumByMonth,
  applyFilters,
} from "./calculations";

const txns: Transaction[] = [
  { id: "1", type: "income", amount: 100000, category: "salary", date: "2026-05-10", description: "Зарплата" },
  { id: "2", type: "expense", amount: 20000, category: "housing", date: "2026-05-12", description: "Аренда" },
  { id: "3", type: "expense", amount: 5000, category: "food", date: "2026-06-03", description: "Продукты" },
  { id: "4", type: "income", amount: 30000, category: "freelance", date: "2026-06-15", description: "Проект" },
  { id: "5", type: "expense", amount: 3000, category: "food", date: "2026-06-20", description: "Кафе" },
];

describe("totalIncome / totalExpense / balance", () => {
  it("суммирует доходы", () => {
    expect(totalIncome(txns)).toBe(130000);
  });
  it("суммирует расходы", () => {
    expect(totalExpense(txns)).toBe(28000);
  });
  it("считает баланс как доходы минус расходы", () => {
    expect(balance(txns)).toBe(102000);
  });
});

describe("expenseThisMonth", () => {
  it("суммирует расходы только текущего месяца", () => {
    const now = new Date("2026-06-25");
    expect(expenseThisMonth(txns, now)).toBe(8000); // 5000 + 3000 за июнь
  });
});

describe("sumByCategory", () => {
  it("группирует и суммирует только расходы", () => {
    const result = sumByCategory(txns);
    const food = result.find((r) => r.category === "food");
    const housing = result.find((r) => r.category === "housing");
    expect(food?.total).toBe(8000);
    expect(housing?.total).toBe(20000);
    expect(result.find((r) => r.category === "salary")).toBeUndefined();
  });
});

describe("sumByMonth", () => {
  it("разбивает по месяцам с доходом и расходом", () => {
    const result = sumByMonth(txns);
    expect(result).toHaveLength(2);
    const may = result[0];
    const june = result[1];
    expect(may.income).toBe(100000);
    expect(may.expense).toBe(20000);
    expect(june.income).toBe(30000);
    expect(june.expense).toBe(8000);
  });
});

describe("applyFilters", () => {
  it("фильтрует по типу", () => {
    expect(applyFilters(txns, { type: "income" })).toHaveLength(2);
  });
  it("фильтрует по категории", () => {
    expect(applyFilters(txns, { category: "food" })).toHaveLength(2);
  });
  it("фильтрует по диапазону дат", () => {
    expect(applyFilters(txns, { from: "2026-06-01", to: "2026-06-30" })).toHaveLength(3);
  });
  it("'all' и пустой фильтр не отсекают ничего", () => {
    expect(applyFilters(txns, { type: "all", category: "all" })).toHaveLength(5);
    expect(applyFilters(txns, {})).toHaveLength(5);
  });
});
