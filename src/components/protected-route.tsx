"use client"

import type React from "react"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/use-auth"
import LoadingPage from "./loading-page"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <LoadingPage />
  }

  if (!user) {
    // Redireciona para login, mas salva a localização atual para retornar após login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

