import { useMemo, useState } from "react";
import type { Transaction } from "@/types";
import { getCategory } from "@/lib/categories";
import { formatRub, formatDate } from "@/lib/format";
import { downloadCsv } from "@/lib/exportCsv";
import { useTransactionsStore } from "@/store/useTransactionsStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type SortField = "date" | "amount";
type SortDirection = "asc" | "desc";

type TransactionTableProps = {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
};

export function TransactionTable({ transactions, onEdit }: TransactionTableProps) {
  const deleteTransaction = useTransactionsStore((s) => s.deleteTransaction);
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const sorted = useMemo(() => {
    const copy = [...transactions];
    copy.sort((a, b) => {
      const diff =
        sortField === "amount" ? a.amount - b.amount : a.date.localeCompare(b.date);
      return sortDirection === "asc" ? diff : -diff;
    });
    return copy;
  }, [transactions, sortField, sortDirection]);

  const toggleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortIndicator = (field: SortField) =>
    field === sortField ? (sortDirection === "asc" ? "↑" : "↓") : "";

  return (
    <Card className="p-0">
      <div className="flex items-center justify-between gap-4 p-5">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Транзакции
          <span className="ml-2 text-sm font-normal text-slate-500 dark:text-slate-400">
            {sorted.length}
          </span>
        </h2>
        <Button
          variant="ghost"
          onClick={() => downloadCsv(sorted)}
          disabled={sorted.length === 0}
        >
          Экспорт в CSV
        </Button>
      </div>

      {sorted.length === 0 ? (
        <p className="px-5 pb-8 pt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Транзакций не найдено. Измените фильтры или добавьте новую.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-y border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
              <tr>
                <th className="px-5 py-3 font-medium">
                  <button
                    type="button"
                    onClick={() => toggleSort("date")}
                    className="inline-flex items-center gap-1 hover:text-slate-800 dark:hover:text-slate-100"
                  >
                    Дата {sortIndicator("date")}
                  </button>
                </th>
                <th className="px-5 py-3 font-medium">Категория</th>
                <th className="px-5 py-3 font-medium">Описание</th>
                <th className="px-5 py-3 text-right font-medium">
                  <button
                    type="button"
                    onClick={() => toggleSort("amount")}
                    className="inline-flex items-center gap-1 hover:text-slate-800 dark:hover:text-slate-100"
                  >
                    Сумма {sortIndicator("amount")}
                  </button>
                </th>
                <th className="px-5 py-3 text-right font-medium">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {sorted.map((txn) => {
                const category = getCategory(txn.category);
                const isIncome = txn.type === "income";
                return (
                  <tr key={txn.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                    <td className="whitespace-nowrap px-5 py-3 tabular-nums text-slate-700 dark:text-slate-300">
                      {formatDate(txn.date)}
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        {category.label}
                      </span>
                    </td>
                    <td className="max-w-xs truncate px-5 py-3 text-slate-600 dark:text-slate-400">
                      {txn.description || "—"}
                    </td>
                    <td
                      className={`whitespace-nowrap px-5 py-3 text-right font-semibold tabular-nums ${
                        isIncome
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {isIncome ? "+" : "−"}
                      {formatRub(txn.amount)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <button
                          type="button"
                          onClick={() => onEdit(txn)}
                          aria-label="Редактировать"
                          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                            <path d="M4 20h4l10-10-4-4L4 16v4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteTransaction(txn.id)}
                          aria-label="Удалить"
                          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                            <path d="M5 7h14M9 7V5h6v2M7 7l1 12h8l1-12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
