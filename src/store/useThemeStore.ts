import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const systemDarkQuery = "(prefers-color-scheme: dark)";

function prefersDark(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(systemDarkQuery).matches
  );
}

/** Ставит/снимает класс `dark` на <html> согласно выбранной теме. */
export function applyTheme(theme: Theme): void {
  const isDark = theme === "dark" || (theme === "system" && prefersDark());
  document.documentElement.classList.toggle("dark", isDark);
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
    }),
    {
      name: "cashflow-theme",
      onRehydrateStorage: () => (state) => {
        applyTheme(state?.theme ?? "system");
      },
    }
  )
);

/** Подписывается на смену системной темы, чтобы режим "system" реагировал вживую. */
export function watchSystemTheme(): () => void {
  const media = window.matchMedia(systemDarkQuery);
  const handler = () => {
    if (useThemeStore.getState().theme === "system") {
      applyTheme("system");
    }
  };
  media.addEventListener("change", handler);
  return () => media.removeEventListener("change", handler);
}
