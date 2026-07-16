import { useSyncExternalStore } from "react";

function subscribe(callback: () => void): () => void {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): boolean {
  return document.documentElement.classList.contains("dark");
}

/** Реактивно возвращает true, если активна тёмная тема (класс `dark` на <html>). */
export function useIsDark(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
