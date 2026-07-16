import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <span className="inline-flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
              <path
                d="M4 7c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path d="M4 10h16" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="16.5" cy="14" r="1.2" fill="currentColor" />
            </svg>
          </span>
          <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
            КэшФлоу
          </span>
        </span>

        <ThemeToggle />
      </div>
    </header>
  );
}
