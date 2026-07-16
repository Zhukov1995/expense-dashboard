import { describe, it, expect } from "vitest";
import type { Transaction } from "@/types";
import { buildCsv } from "./exportCsv";

const txns: Transaction[] = [
  { id: "1", type: "expense", amount: 5000, category: "food", date: "2026-06-03", description: "Продукты" },
  { id: "2", type: "income", amount: 30000, category: "freelance", date: "2026-06-15", description: 'Проект "Альфа", этап 1' },
];

describe("buildCsv", () => {
  it("начинается со строки заголовка", () => {
    const csv = buildCsv(txns);
    expect(csv.split("\n")[0]).toBe("Дата,Тип,Категория,Описание,Сумма");
  });

  it("создаёт по строке на транзакцию", () => {
    const lines = buildCsv(txns).trim().split("\n");
    expect(lines).toHaveLength(3); // заголовок + 2 строки
  });

  it("экранирует значения с запятыми и кавычками", () => {
    const csv = buildCsv(txns);
    // Описание с запятой и кавычками должно быть в кавычках, внутренние кавычки удвоены
    expect(csv).toContain('"Проект ""Альфа"", этап 1"');
  });

  it("выводит тип по-русски и сумму числом", () => {
    const csv = buildCsv(txns);
    expect(csv).toContain("Расход");
    expect(csv).toContain("Доход");
    expect(csv).toContain("5000");
  });
});
