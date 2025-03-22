"use client"

import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import Sidebar from "./sidebar"
import Header from "./header"
import { cn } from "../lib/utils"
import { useMediaQuery } from "../hooks/use-media-query"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "./error-fallback"

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Fechar sidebar automaticamente em dispositivos móveis
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [isMobile])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className={cn("flex flex-col flex-1 overflow-hidden", sidebarOpen && !isMobile ? "ml-64" : "ml-16")}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}

