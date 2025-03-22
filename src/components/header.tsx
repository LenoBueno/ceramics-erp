"use client"

import { UserNav } from "./user-nav"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import { Notifications } from "./notifications"
import { useAuth } from "../hooks/use-auth"

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <Notifications />
        <ThemeToggle />
        {user && <UserNav user={user} />}
      </div>
    </header>
  )
}

