import { useTransactionsStore } from "@/store/useTransactionsStore";
import {
  balance,
  totalIncome,
  totalExpense,
  expenseThisMonth,
} from "@/lib/calculations";
import { formatRub } from "@/lib/format";
import { Card } from "@/components/ui/Card";

type Kpi = {
  label: string;
  value: number;
  accent: string;
  icon: React.ReactNode;
};

const walletIcon = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
    <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M16 12h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const upIcon = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
    <path d="M5 15l7-7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const downIcon = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
    <path d="M5 9l7 7 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const calendarIcon = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
    <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M4 9h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export function KpiCards() {
  const transactions = useTransactionsStore((s) => s.transactions);

  const items: Kpi[] = [
    {
      label: "Баланс",
      value: balance(transactions),
      accent: "text-indigo-600 dark:text-indigo-400",
      icon: walletIcon,
    },
    {
      label: "Доходы",
      value: totalIncome(transactions),
      accent: "text-emerald-700 dark:text-emerald-400",
      icon: upIcon,
    },
    {
      label: "Расходы",
      value: totalExpense(transactions),
      accent: "text-rose-600 dark:text-rose-400",
      icon: downIcon,
    },
    {
      label: "Расходы за месяц",
      value: expenseThisMonth(transactions),
      accent: "text-rose-600 dark:text-rose-400",
      icon: calendarIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {item.label}
            </span>
            <span className={item.accent}>{item.icon}</span>
          </div>
          <p className={`mt-2 text-2xl font-bold tabular-nums ${item.accent}`}>
            {formatRub(item.value)}
          </p>
        </Card>
      ))}
    </div>
  );
}
