import type { ReactNode } from "react";

type CardProps = {
  className?: string;
  children: ReactNode;
};

/** Базовая карточка: фон, тонкая рамка, скругление — в обеих темах. */
export function Card({ className = "", children }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {children}
    </div>
  );
}
