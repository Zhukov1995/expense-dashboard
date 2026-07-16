import { Header } from "@/components/layout/Header";
import { KpiCards } from "@/components/kpi/KpiCards";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header />
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        <KpiCards />
      </main>
    </div>
  );
}
