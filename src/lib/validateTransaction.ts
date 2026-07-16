export type TransactionInput = {
  amount: string;
  category: string;
  date: string;
};

export type TransactionErrors = {
  amount?: string;
  category?: string;
  date?: string;
};

/** Проверяет ввод формы транзакции. Возвращает объект ошибок (пустой — если всё ок). */
export function validateTransaction(input: TransactionInput): TransactionErrors {
  const errors: TransactionErrors = {};

  const amount = Number(input.amount);
  if (!input.amount.trim() || Number.isNaN(amount) || amount <= 0) {
    errors.amount = "Введите сумму больше нуля";
  }

  if (!input.category) {
    errors.category = "Выберите категорию";
  }

  if (!input.date) {
    errors.date = "Укажите дату";
  }

  return errors;
}
