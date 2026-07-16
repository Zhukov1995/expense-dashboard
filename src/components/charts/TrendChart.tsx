import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTransactionsStore } from "@/store/useTransactionsStore";
import { sumByMonth } from "@/lib/calculations";
import { formatMonth, formatRub } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { useIsDark } from "@/lib/useIsDark";

const INCOME_COLOR = "#10b981";
const EXPENSE_COLOR = "#f43f5e";

export function TrendChart() {
  const transactions = useTransactionsStore((s) => s.transactions);
  const isDark = useIsDark();

  const data = sumByMonth(transactions).map((item) => ({
    month: formatMonth(`${item.month}-01`).replace(" г.", ""),
    Доходы: item.income,
    Расходы: item.expense,
  }));

  const axisColor = isDark ? "#94a3b8" : "#64748b";
  const gridColor = isDark ? "#1e293b" : "#e2e8f0";
  const tooltipStyle = {
    backgroundColor: isDark ? "#1e293b" : "#ffffff",
    border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
    borderRadius: "0.5rem",
    color: isDark ? "#f1f5f9" : "#0f172a",
    fontSize: "0.875rem",
  };

  return (
    <Card>
      <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
        Доходы и расходы по месяцам
      </h2>

      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 12 }} tickLine={false} axisLine={{ stroke: gridColor }} />
            <YAxis
              tick={{ fill: axisColor, fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${v / 1000}к`}
              width={40}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: isDark ? "#334155" : "#f1f5f9", opacity: 0.4 }}
              formatter={(value) => formatRub(Number(value))}
            />
            <Legend wrapperStyle={{ fontSize: "0.875rem", color: axisColor }} />
            <Bar dataKey="Доходы" fill={INCOME_COLOR} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Расходы" fill={EXPENSE_COLOR} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
