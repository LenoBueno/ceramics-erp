import axios from "axios"
import { toast } from "../components/ui/use-toast"

// Definir a URL base da API
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

// Criar instância do axios
export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Ocorreu um erro na comunicação com o servidor"

    // Mostrar mensagem de erro
    toast({
      title: "Erro",
      description: message,
      variant: "destructive",
    })

    // Tratamento específico para erros de autenticação
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }

    return Promise.reject(error)
  },
)

