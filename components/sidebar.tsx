import type React from "react"

import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar-provider"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart3,
  Box,
  CircleDollarSign,
  ClipboardList,
  Factory,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  Users,
  ChevronLeft,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const { isOpen, toggleSidebar } = useSidebar()
  const location = useLocation()
  const pathname = location.pathname
  const [isMobile, setIsMobile] = useState(false)

  // Detectar se estamos em um dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return (
    <>
      {/* Overlay para dispositivos móveis */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-10 bg-background/80 backdrop-blur-sm" onClick={toggleSidebar} />
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:transition-width md:duration-300",
          !isOpen && "md:w-20",
          className,
        )}
      >
        <div className="flex items-center justify-between border-b px-4 py-6">
          <h2
            className={cn(
              "text-xl font-semibold tracking-tight transition-opacity duration-300",
              !isOpen && "md:opacity-0",
            )}
          >
            Módulos
          </h2>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden md:flex">
            <ChevronLeft className={cn("h-4 w-4 transition-transform duration-300", !isOpen && "rotate-180")} />
          </Button>
        </div>
        <ScrollArea className="flex-1 px-2 py-4">
          <nav className="flex flex-col gap-1">
            <NavItem
              href="/"
              icon={<Home className="h-4 w-4" />}
              isActive={pathname === "/"}
              label="Dashboard"
              collapsed={!isOpen}
            />
            <NavItem
              href="/produtos"
              icon={<Package className="h-4 w-4" />}
              isActive={pathname === "/produtos" || pathname.startsWith("/produtos/")}
              label="Produtos"
              collapsed={!isOpen}
            />
            <NavItem
              href="/vendas"
              icon={<ShoppingCart className="h-4 w-4" />}
              isActive={pathname === "/vendas"}
              label="Vendas"
              collapsed={!isOpen}
            />
            <NavItem
              href="/compras"
              icon={<ClipboardList className="h-4 w-4" />}
              isActive={pathname === "/compras"}
              label="Compras"
              collapsed={!isOpen}
            />
            <NavItem
              href="/financeiro"
              icon={<CircleDollarSign className="h-4 w-4" />}
              isActive={pathname === "/financeiro"}
              label="Financeiro"
              collapsed={!isOpen}
            />
            <NavItem
              href="/estoque"
              icon={<Box className="h-4 w-4" />}
              isActive={pathname === "/estoque"}
              label="Estoque"
              collapsed={!isOpen}
            />
            <NavItem
              href="/producao"
              icon={<Factory className="h-4 w-4" />}
              isActive={pathname === "/producao"}
              label="Produção"
              collapsed={!isOpen}
            />
            <NavItem
              href="/relatorios"
              icon={<BarChart3 className="h-4 w-4" />}
              isActive={pathname === "/relatorios"}
              label="Relatórios"
              collapsed={!isOpen}
            />
            <NavItem
              href="/fornecedores"
              icon={<Truck className="h-4 w-4" />}
              isActive={pathname === "/fornecedores"}
              label="Fornecedores"
              collapsed={!isOpen}
            />
            <NavItem
              href="/clientes"
              icon={<Users className="h-4 w-4" />}
              isActive={pathname === "/clientes"}
              label="Clientes"
              collapsed={!isOpen}
            />
            <NavItem
              href="/configuracoes"
              icon={<Settings className="h-4 w-4" />}
              isActive={pathname === "/configuracoes"}
              label="Configurações"
              collapsed={!isOpen}
            />
          </nav>
        </ScrollArea>
        <div className="border-t p-4">
          <p className={cn("text-xs text-muted-foreground transition-opacity duration-300", !isOpen && "md:opacity-0")}>
            2103 Creative ERP v1.0
          </p>
        </div>
      </div>
    </>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive?: boolean
  collapsed?: boolean
}

function NavItem({ href, icon, label, isActive, collapsed }: NavItemProps) {
  return (
    <Link to={href}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn("w-full justify-start", collapsed && "md:justify-center md:px-2")}
        title={collapsed ? label : undefined}
      >
        <span className={collapsed ? "md:mr-0" : "mr-2"}>{icon}</span>
        <span className={cn("transition-opacity duration-300", collapsed && "md:hidden md:opacity-0")}>{label}</span>
      </Button>
    </Link>
  )
}

