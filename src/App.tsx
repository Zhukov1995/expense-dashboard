import { useMemo, useRef, useState } from "react";
import type { Transaction } from "@/types";
import { applyFilters, type Filters } from "@/lib/calculations";
import { useTransactionsStore } from "@/store/useTransactionsStore";
import { Header } from "@/components/layout/Header";
import { KpiCards } from "@/components/kpi/KpiCards";
import { CategoryChart } from "@/components/charts/CategoryChart";
import { TrendChart } from "@/components/charts/TrendChart";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { TransactionFilters } from "@/components/transactions/TransactionFilters";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { Card } from "@/components/ui/Card";

export default function App() {
  const transactions = useTransactionsStore((s) => s.transactions);

  // Фильтры — вью-состояние, не персистится.
  const [filters, setFilters] = useState<Filters>({});
  // Транзакция в режиме редактирования (null — режим добавления).
  const [editing, setEditing] = useState<Transaction | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => applyFilters(transactions, filters),
    [transactions, filters]
  );

  const startEditing = (transaction: Transaction) => {
    setEditing(transaction);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header />
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        <KpiCards />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CategoryChart />
          <TrendChart />
        </div>

        <div ref={formRef}>
          <TransactionForm editing={editing} onDone={() => setEditing(null)} />
        </div>

        <Card>
          <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100">
            Фильтры
          </h2>
          <TransactionFilters value={filters} onChange={setFilters} />
        </Card>

        <TransactionTable transactions={filtered} onEdit={startEditing} />
      </main>
    </div>
  );
}
