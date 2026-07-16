import type { Transaction } from "@/types";
import { getCategory } from "./categories";

const CSV_HEADER = "Дата,Тип,Категория,Описание,Сумма";

/** Экранирует значение по правилам CSV: оборачивает в кавычки при наличии
 *  запятой, кавычки или перевода строки; внутренние кавычки удваивает. */
function escapeCsv(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function toRow(txn: Transaction): string {
  const cells = [
    txn.date,
    txn.type === "income" ? "Доход" : "Расход",
    getCategory(txn.category).label,
    txn.description,
    String(txn.amount),
  ];
  return cells.map(escapeCsv).join(",");
}

/** Формирует CSV-текст из списка транзакций. */
export function buildCsv(txns: Transaction[]): string {
  return [CSV_HEADER, ...txns.map(toRow)].join("\n");
}

/** Формирует CSV и инициирует скачивание файла в браузере. */
export function downloadCsv(txns: Transaction[], filename = "transactions.csv"): void {
  const blob = new Blob(["﻿" + buildCsv(txns)], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
