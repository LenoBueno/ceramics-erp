import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../../lib/api"
import type { Product } from "../../types/product"

// Chaves para o React Query
const PRODUCTS_KEY = "products"

// Função para buscar todos os produtos
export function useProducts() {
  return useQuery({
    queryKey: [PRODUCTS_KEY],
    queryFn: async () => {
      const response = await api.get("/products")
      return response.data
    },
  })
}

// Função para buscar um produto específico
export function useProduct(id: string) {
  return useQuery({
    queryKey: [PRODUCTS_KEY, id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}`)
      return response.data
    },
    enabled: !!id, // Só executa se o ID for fornecido
  })
}

// Função para criar um novo produto
export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (product: Omit<Product, "id">) => {
      const response = await api.post("/products", product)
      return response.data
    },
    onSuccess: () => {
      // Invalidar a query para recarregar os dados
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] })
    },
  })
}

// Função para atualizar um produto
export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...data }: Product) => {
      const response = await api.put(`/products/${id}`, data)
      return response.data
    },
    onSuccess: (_, variables) => {
      // Invalidar a query específica e a lista
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY, variables.id] })
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] })
    },
  })
}

// Função para deletar um produto
export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/products/${id}`)
      return id
    },
    onSuccess: (id) => {
      // Invalidar a query específica e a lista
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY, id] })
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] })
    },
  })
}

