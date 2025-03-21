import type React from "react"
import { MainNav } from "@/components/main-nav"
import { Sidebar } from "@/components/sidebar"
import { UserNav } from "@/components/user-nav"
import { useSidebar } from "@/components/sidebar-provider"
import { cn } from "@/lib/utils"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { isOpen } = useSidebar()

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-30 border-b bg-background">
        <div className="flex h-16 items-center px-4">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex flex-1">
        <Sidebar />
        <main className={cn("flex-1 p-6 transition-all duration-300 ease-in-out", "md:ml-20", isOpen && "md:ml-64")}>
          {children}
        </main>
      </div>
    </div>
  )
}

