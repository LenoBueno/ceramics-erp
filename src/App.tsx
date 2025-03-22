import './styles/fonts.css'
import { ThemeProvider } from '@/components/theme-provider'
import { SidebarProvider } from '@/components/sidebar-provider'
import { Toaster } from '@/components/ui/toaster'
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom'
import { routes } from './routes'

// Componente para renderizar as rotas
function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  return (
    <div>
      <Router>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <AppRoutes />
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </Router>
    </div>
  )
}

export default App