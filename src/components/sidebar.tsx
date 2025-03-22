"use client"

import { Link, useLocation } from "react-router-dom"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import {
  Home,
  Package,
  Users,
  Truck,
  Warehouse,
  ShoppingCart,
  Factory,
  ShoppingBag,
  DollarSign,
  BarChart2,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react"
import { useMediaQuery } from "../hooks/use-media-query"
import { useAuth } from "../hooks/use-auth"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { logout } = useAuth()

  const toggleSidebar = () => {
    setOpen(!open)
  }

  const closeSidebarIfMobile = () => {
    if (isMobile) {
      setOpen(false)
    }
  }

  const navItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Produtos", href: "/produtos", icon: Package },
    { name: "Clientes", href: "/clientes", icon: Users },
    { name: "Fornecedores", href: "/fornecedores", icon: Truck },
    { name: "Estoque", href: "/estoque", icon: Warehouse },
    { name: "Compras", href: "/compras", icon: ShoppingCart },
    { name: "Produção", href: "/producao", icon: Factory },
    { name: "Vendas", href: "/vendas", icon: ShoppingBag },
    { name: "Financeiro", href: "/financeiro", icon: DollarSign },
    { name: "Relatórios", href: "/relatorios", icon: BarChart2 },
    { name: "Configurações", href: "/configuracoes", icon: Settings },
  ]

  return (
    <>
      {/* Overlay para dispositivos móveis */}
      {isMobile && open && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-card transition-all duration-300",
          open ? "w-64" : "w-16",
          isMobile && !open && "transform -translate-x-full",
          isMobile && open && "transform translate-x-0 w-64",
        )}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b">
          {open && (
            <Link to="/" className="flex items-center space-x-2" onClick={closeSidebarIfMobile}>
              <span className="font-bold text-xl">2103 Creative</span>
            </Link>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
            {open ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeSidebarIfMobile}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon size={20} />
                  {open && <span>{item.name}</span>}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        <div className="border-t p-2">
          <Button variant="ghost" className="w-full justify-start" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            {open && <span>Sair</span>}
          </Button>
        </div>
      </aside>
    </>
  )
}

