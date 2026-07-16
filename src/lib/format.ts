const rublesFormatter = new Intl.NumberFormat("ru-RU");
const monthFormatter = new Intl.DateTimeFormat("ru-RU", {
  month: "long",
  year: "numeric",
});

/** «12 500 ₽» */
export function formatRub(amount: number): string {
  return `${rublesFormatter.format(amount)} ₽`;
}

/** ISO-дату превращает в «16.07.2026» */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${day}.${month}.${year}`;
}

/** ISO-дату превращает в «июль 2026 г.» */
export function formatMonth(iso: string): string {
  return monthFormatter.format(new Date(iso));
}
