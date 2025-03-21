"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PanelLeft, Menu } from "lucide-react"
import { useSidebar } from "./sidebar-provider"
import { useEffect, useState } from "react"

export function MainNav() {
  const pathname = usePathname()
  const { isOpen, toggleSidebar } = useSidebar()
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
    <div className="mr-4 flex">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
        {isMobile ? (
          <Menu className="h-5 w-5" />
        ) : (
          <PanelLeft className={cn("h-5 w-5 transition-transform", !isOpen && "rotate-180")} />
        )}
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">2103 Creative ERP</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-primary",
            pathname === "/" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Início
        </Link>
        <Link
          href="/produtos"
          className={cn(
            "transition-colors hover:text-primary",
            pathname === "/produtos" || pathname.startsWith("/produtos/") ? "text-primary" : "text-muted-foreground",
          )}
        >
          Produtos
        </Link>
        <Link
          href="/vendas"
          className={cn(
            "transition-colors hover:text-primary",
            pathname === "/vendas" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Vendas
        </Link>
      </nav>
    </div>
  )
}

