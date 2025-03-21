import './styles/fonts.css'
import { ThemeProvider } from '@/components/theme-provider'
import { SidebarProvider } from '@/components/sidebar-provider'
import { Toaster } from '@/components/ui/toaster'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <SidebarProvider>
          <Dashboard />
          <Toaster />
        </SidebarProvider>
      </ThemeProvider>
    </div>
  )
}

export default App