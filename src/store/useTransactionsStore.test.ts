import { describe, it, expect, beforeEach } from "vitest";
import { useTransactionsStore } from "./useTransactionsStore";
import { seedTransactions } from "@/lib/seed";

function resetStore() {
  useTransactionsStore.setState({ transactions: seedTransactions });
}

describe("useTransactionsStore", () => {
  beforeEach(resetStore);

  it("инициализируется сид-данными (не пусто)", () => {
    expect(useTransactionsStore.getState().transactions.length).toBeGreaterThan(0);
  });

  it("addTransaction добавляет транзакцию с id", () => {
    const before = useTransactionsStore.getState().transactions.length;
    useTransactionsStore.getState().addTransaction({
      type: "expense",
      amount: 999,
      category: "food",
      date: "2026-07-01",
      description: "Тест",
    });
    const txns = useTransactionsStore.getState().transactions;
    expect(txns.length).toBe(before + 1);
    const added = txns.find((t) => t.amount === 999);
    expect(added?.id).toBeTruthy();
  });

  it("updateTransaction меняет поля по id", () => {
    const first = useTransactionsStore.getState().transactions[0];
    useTransactionsStore.getState().updateTransaction(first.id, { amount: 12345 });
    const updated = useTransactionsStore
      .getState()
      .transactions.find((t) => t.id === first.id);
    expect(updated?.amount).toBe(12345);
  });

  it("deleteTransaction удаляет по id", () => {
    const first = useTransactionsStore.getState().transactions[0];
    const before = useTransactionsStore.getState().transactions.length;
    useTransactionsStore.getState().deleteTransaction(first.id);
    const txns = useTransactionsStore.getState().transactions;
    expect(txns.length).toBe(before - 1);
    expect(txns.find((t) => t.id === first.id)).toBeUndefined();
  });
});
