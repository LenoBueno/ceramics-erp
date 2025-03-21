"use client"

import * as React from "react"

type SidebarContextType = {
  isOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

const SIDEBAR_STATE_KEY = "2103-creative-sidebar-state"

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Inicializar com true, mas verificar localStorage no useEffect
  const [isOpen, setIsOpen] = React.useState(true)

  // Carregar o estado da sidebar do localStorage
  React.useEffect(() => {
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY)
    if (savedState !== null) {
      setIsOpen(savedState === "true")
    }
  }, [])

  const toggleSidebar = React.useCallback(() => {
    setIsOpen((prev) => {
      const newState = !prev
      localStorage.setItem(SIDEBAR_STATE_KEY, String(newState))
      return newState
    })
  }, [])

  const setSidebarOpen = React.useCallback((open: boolean) => {
    setIsOpen(open)
    localStorage.setItem(SIDEBAR_STATE_KEY, String(open))
  }, [])

  return <SidebarContext.Provider value={{ isOpen, toggleSidebar, setSidebarOpen }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)

  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }

  return context
}

