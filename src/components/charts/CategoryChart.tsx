import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useTransactionsStore } from "@/store/useTransactionsStore";
import { sumByCategory } from "@/lib/calculations";
import { getCategory } from "@/lib/categories";
import { formatRub } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { useIsDark } from "@/lib/useIsDark";

type Slice = {
  category: string;
  label: string;
  total: number;
  color: string;
};

export function CategoryChart() {
  const transactions = useTransactionsStore((s) => s.transactions);
  const isDark = useIsDark();

  const data: Slice[] = sumByCategory(transactions).map((item) => {
    const category = getCategory(item.category);
    return {
      category: item.category,
      label: category.label,
      total: item.total,
      color: category.color,
    };
  });

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
        Расходы по категориям
      </h2>

      {data.length === 0 ? (
        <p className="py-16 text-center text-sm text-slate-500 dark:text-slate-400">
          Пока нет расходов для отображения
        </p>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          <div className="h-56 w-full sm:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="total"
                  nameKey="label"
                  innerRadius="55%"
                  outerRadius="85%"
                  paddingAngle={2}
                  stroke="none"
                >
                  {data.map((slice) => (
                    <Cell key={slice.category} fill={slice.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value) => formatRub(Number(value))}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <ul className="w-full space-y-2 sm:w-1/2">
            {data.map((slice) => (
              <li key={slice.category} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: slice.color }} />
                  {slice.label}
                </span>
                <span className="font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                  {formatRub(slice.total)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
