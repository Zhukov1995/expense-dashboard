import { useEffect, useState } from "react";
import type { Transaction, TransactionType } from "@/types";
import { categoriesFor } from "@/lib/categories";
import { validateTransaction, type TransactionErrors } from "@/lib/validateTransaction";
import { useTransactionsStore } from "@/store/useTransactionsStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Select, LabeledField } from "@/components/ui/Field";

type TransactionFormProps = {
  editing?: Transaction | null;
  onDone?: () => void;
};

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

const emptyState = {
  type: "expense" as TransactionType,
  amount: "",
  category: "",
  date: todayIso(),
  description: "",
};

export function TransactionForm({ editing, onDone }: TransactionFormProps) {
  const addTransaction = useTransactionsStore((s) => s.addTransaction);
  const updateTransaction = useTransactionsStore((s) => s.updateTransaction);

  const [type, setType] = useState<TransactionType>(emptyState.type);
  const [amount, setAmount] = useState(emptyState.amount);
  const [category, setCategory] = useState(emptyState.category);
  const [date, setDate] = useState(emptyState.date);
  const [description, setDescription] = useState(emptyState.description);
  const [errors, setErrors] = useState<TransactionErrors>({});

  // Заполняем форму при переходе в режим редактирования.
  useEffect(() => {
    if (editing) {
      setType(editing.type);
      setAmount(String(editing.amount));
      setCategory(editing.category);
      setDate(editing.date);
      setDescription(editing.description);
      setErrors({});
    }
  }, [editing]);

  const availableCategories = categoriesFor(type);

  const resetForm = () => {
    setType(emptyState.type);
    setAmount(emptyState.amount);
    setCategory(emptyState.category);
    setDate(todayIso());
    setDescription(emptyState.description);
    setErrors({});
  };

  const handleTypeChange = (nextType: TransactionType) => {
    setType(nextType);
    setCategory(""); // категории зависят от типа
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateTransaction({ amount, category, date });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload = {
      type,
      amount: Number(amount),
      category,
      date,
      description: description.trim(),
    };

    if (editing) {
      updateTransaction(editing.id, payload);
    } else {
      addTransaction(payload);
    }

    resetForm();
    onDone?.();
  };

  return (
    <Card>
      <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
        {editing ? "Редактировать транзакцию" : "Добавить транзакцию"}
      </h2>

      <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
        {/* Переключатель типа */}
        <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-700 dark:bg-slate-800">
          {(["expense", "income"] as TransactionType[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleTypeChange(option)}
              aria-pressed={type === option}
              className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
                type === option
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-slate-100"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
              }`}
            >
              {option === "expense" ? "Расход" : "Доход"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <LabeledField id="tx-amount" label="Сумма, ₽" error={errors.amount}>
            <Input
              id="tx-amount"
              type="number"
              inputMode="numeric"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
            />
          </LabeledField>

          <LabeledField id="tx-category" label="Категория" error={errors.category}>
            <Select
              id="tx-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Выберите категорию</option>
              {availableCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </Select>
          </LabeledField>

          <LabeledField id="tx-date" label="Дата" error={errors.date}>
            <Input
              id="tx-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </LabeledField>

          <LabeledField id="tx-description" label="Описание">
            <Input
              id="tx-description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Например, продукты"
            />
          </LabeledField>
        </div>

        <div className="flex gap-3">
          <Button type="submit">{editing ? "Сохранить" : "Добавить"}</Button>
          {editing && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                resetForm();
                onDone?.();
              }}
            >
              Отмена
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
