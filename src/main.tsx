import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applyTheme, useThemeStore, watchSystemTheme } from './store/useThemeStore'

// Применяем сохранённую тему до первого рендера, чтобы не было вспышки.
applyTheme(useThemeStore.getState().theme)
watchSystemTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
