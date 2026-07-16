import { Header } from "@/components/layout/Header";
import { KpiCards } from "@/components/kpi/KpiCards";
import { CategoryChart } from "@/components/charts/CategoryChart";
import { TrendChart } from "@/components/charts/TrendChart";
import { TransactionForm } from "@/components/transactions/TransactionForm";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header />
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        <KpiCards />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CategoryChart />
          <TrendChart />
        </div>
        <TransactionForm />
      </main>
    </div>
  );
}
