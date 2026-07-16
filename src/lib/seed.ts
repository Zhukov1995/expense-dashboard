import type { Transaction } from "@/types";

/** ISO-дата (YYYY-MM-DD) со сдвигом на N месяцев назад от сегодня и заданным днём. */
function dateMonthsAgo(monthsAgo: number, day: number): string {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth() - monthsAgo, day);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const dayStr = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${dayStr}`;
}

let seedCounter = 0;
function seedId(): string {
  seedCounter += 1;
  return `seed-${seedCounter}`;
}

type SeedInput = Omit<Transaction, "id">;

function tx(input: SeedInput): Transaction {
  return { id: seedId(), ...input };
}

/** Демо-транзакции за последние 4 месяца — чтобы графики были не пустыми. */
export const seedTransactions: Transaction[] = [
  // Текущий месяц
  tx({ type: "income", amount: 120000, category: "salary", date: dateMonthsAgo(0, 5), description: "Зарплата" }),
  tx({ type: "income", amount: 35000, category: "freelance", date: dateMonthsAgo(0, 12), description: "Проект на фрилансе" }),
  tx({ type: "expense", amount: 45000, category: "housing", date: dateMonthsAgo(0, 3), description: "Аренда квартиры" }),
  tx({ type: "expense", amount: 8200, category: "food", date: dateMonthsAgo(0, 7), description: "Продукты" }),
  tx({ type: "expense", amount: 3400, category: "transport", date: dateMonthsAgo(0, 8), description: "Проездной" }),
  tx({ type: "expense", amount: 2600, category: "entertainment", date: dateMonthsAgo(0, 14), description: "Кино и кафе" }),
  tx({ type: "expense", amount: 5900, category: "shopping", date: dateMonthsAgo(0, 16), description: "Одежда" }),
  tx({ type: "expense", amount: 1800, category: "health", date: dateMonthsAgo(0, 18), description: "Аптека" }),

  // Прошлый месяц
  tx({ type: "income", amount: 120000, category: "salary", date: dateMonthsAgo(1, 5), description: "Зарплата" }),
  tx({ type: "income", amount: 18000, category: "freelance", date: dateMonthsAgo(1, 20), description: "Небольшой заказ" }),
  tx({ type: "expense", amount: 45000, category: "housing", date: dateMonthsAgo(1, 3), description: "Аренда квартиры" }),
  tx({ type: "expense", amount: 9100, category: "food", date: dateMonthsAgo(1, 9), description: "Продукты" }),
  tx({ type: "expense", amount: 3400, category: "transport", date: dateMonthsAgo(1, 8), description: "Проездной" }),
  tx({ type: "expense", amount: 4200, category: "entertainment", date: dateMonthsAgo(1, 22), description: "Концерт" }),
  tx({ type: "expense", amount: 12500, category: "health", date: dateMonthsAgo(1, 15), description: "Стоматолог" }),

  // 2 месяца назад
  tx({ type: "income", amount: 120000, category: "salary", date: dateMonthsAgo(2, 5), description: "Зарплата" }),
  tx({ type: "income", amount: 27000, category: "freelance", date: dateMonthsAgo(2, 18), description: "Проект на фрилансе" }),
  tx({ type: "expense", amount: 45000, category: "housing", date: dateMonthsAgo(2, 3), description: "Аренда квартиры" }),
  tx({ type: "expense", amount: 7800, category: "food", date: dateMonthsAgo(2, 11), description: "Продукты" }),
  tx({ type: "expense", amount: 3400, category: "transport", date: dateMonthsAgo(2, 8), description: "Проездной" }),
  tx({ type: "expense", amount: 15900, category: "shopping", date: dateMonthsAgo(2, 25), description: "Техника" }),
  tx({ type: "expense", amount: 2200, category: "other-expense", date: dateMonthsAgo(2, 19), description: "Подписки" }),

  // 3 месяца назад
  tx({ type: "income", amount: 120000, category: "salary", date: dateMonthsAgo(3, 5), description: "Зарплата" }),
  tx({ type: "expense", amount: 45000, category: "housing", date: dateMonthsAgo(3, 3), description: "Аренда квартиры" }),
  tx({ type: "expense", amount: 8600, category: "food", date: dateMonthsAgo(3, 13), description: "Продукты" }),
  tx({ type: "expense", amount: 3400, category: "transport", date: dateMonthsAgo(3, 8), description: "Проездной" }),
  tx({ type: "expense", amount: 5100, category: "entertainment", date: dateMonthsAgo(3, 21), description: "Развлечения" }),
  tx({ type: "expense", amount: 3300, category: "health", date: dateMonthsAgo(3, 17), description: "Витамины и аптека" }),
];
