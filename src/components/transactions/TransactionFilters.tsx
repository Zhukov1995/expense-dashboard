import type { Filters } from "@/lib/calculations";
import { categories } from "@/lib/categories";
import { LabeledField, Select, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

type TransactionFiltersProps = {
  value: Filters;
  onChange: (filters: Filters) => void;
};

export function TransactionFilters({ value, onChange }: TransactionFiltersProps) {
  const update = (patch: Partial<Filters>) => onChange({ ...value, ...patch });

  const hasActiveFilters =
    (value.type && value.type !== "all") ||
    (value.category && value.category !== "all") ||
    value.from ||
    value.to;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <LabeledField id="filter-type" label="Тип">
        <Select
          id="filter-type"
          value={value.type ?? "all"}
          onChange={(e) => update({ type: e.target.value as Filters["type"] })}
        >
          <option value="all">Все</option>
          <option value="income">Доходы</option>
          <option value="expense">Расходы</option>
        </Select>
      </LabeledField>

      <LabeledField id="filter-category" label="Категория">
        <Select
          id="filter-category"
          value={value.category ?? "all"}
          onChange={(e) => update({ category: e.target.value })}
        >
          <option value="all">Все категории</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label} ({c.type === "income" ? "доход" : "расход"})
            </option>
          ))}
        </Select>
      </LabeledField>

      <LabeledField id="filter-from" label="С даты">
        <Input
          id="filter-from"
          type="date"
          value={value.from ?? ""}
          onChange={(e) => update({ from: e.target.value || undefined })}
        />
      </LabeledField>

      <LabeledField id="filter-to" label="По дату">
        <Input
          id="filter-to"
          type="date"
          value={value.to ?? ""}
          onChange={(e) => update({ to: e.target.value || undefined })}
        />
      </LabeledField>

      {hasActiveFilters && (
        <div className="sm:col-span-2 lg:col-span-4">
          <Button variant="ghost" onClick={() => onChange({})}>
            Сбросить фильтры
          </Button>
        </div>
      )}
    </div>
  );
}
