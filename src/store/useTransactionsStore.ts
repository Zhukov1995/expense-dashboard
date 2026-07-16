import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Transaction } from "@/types";
import { seedTransactions } from "@/lib/seed";

type NewTransaction = Omit<Transaction, "id">;

type TransactionsState = {
  transactions: Transaction[];
  addTransaction: (input: NewTransaction) => void;
  updateTransaction: (id: string, changes: Partial<NewTransaction>) => void;
  deleteTransaction: (id: string) => void;
};

export const useTransactionsStore = create<TransactionsState>()(
  persist(
    (set) => ({
      transactions: seedTransactions,

      addTransaction: (input) =>
        set((state) => ({
          transactions: [
            { id: crypto.randomUUID(), ...input },
            ...state.transactions,
          ],
        })),

      updateTransaction: (id, changes) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...changes } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
    }),
    { name: "cashflow-transactions" }
  )
);
