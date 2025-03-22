"use client"

import { createContext, useEffect, useState, type ReactNode } from "react"
import { api } from "../lib/api"
import type { User } from "../types/user"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
}

interface RegisterData {
  name: string
  email: string
  password: string
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar se há um token no localStorage
        const token = localStorage.getItem("token")

        if (token) {
          // Configurar o token no cabeçalho de autorização
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`

          // Buscar dados do usuário
          const response = await api.get("/auth/me")
          setUser(response.data)
        }
      } catch (error) {
        // Se houver erro, limpar o token
        localStorage.removeItem("token")
        api.defaults.headers.common["Authorization"] = ""
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password })
      const { token, user } = response.data

      // Salvar token e configurar cabeçalho
      localStorage.setItem("token", token)
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setUser(user)
    } catch (error) {
      throw error
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      const response = await api.post("/auth/register", userData)
      const { token, user } = response.data

      // Salvar token e configurar cabeçalho
      localStorage.setItem("token", token)
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setUser(user)
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    // Limpar token e usuário
    localStorage.removeItem("token")
    api.defaults.headers.common["Authorization"] = ""
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

