import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemesProvider } from './context/ThemesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemesProvider>
      <App />
    </ThemesProvider>
  </StrictMode>,
)
