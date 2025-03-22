"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useNavigate, useParams, useLocation } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"

const productFormSchema = z.object({
  name: z.string().min(3, {
    message: "O nome do produto deve ter pelo menos 3 caracteres.",
  }),
  code: z.string().min(3, {
    message: "O código do produto deve ter pelo menos 3 caracteres.",
  }),
  description: z.string().optional(),
  category: z.string({
    required_error: "Selecione uma categoria.",
  }),
  type: z.string({
    required_error: "Selecione um tipo.",
  }),
  color: z.string().min(2, {
    message: "A cor deve ter pelo menos 2 caracteres.",
  }),
  size: z.string({
    required_error: "Selecione um tamanho.",
  }),
  price: z.coerce.number().min(0.01, {
    message: "O preço deve ser maior que zero.",
  }),
  stock: z.coerce.number().min(0, {
    message: "O estoque não pode ser negativo.",
  }),
})

type ProductFormValues = z.infer<typeof productFormSchema>

export function ProductForm() {
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()

  const defaultValues: Partial<ProductFormValues> = {
    name: "",
    code: "",
    description: "",
    category: "",
    type: "",
    color: "",
    size: "",
    price: 0,
    stock: 0,
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  })

  function onSubmit(data: ProductFormValues) {
    // Aqui seria implementada a lógica real de criação do produto
    toast({
      title: "Produto criado com sucesso",
      description: `O produto "${data.name}" foi adicionado ao catálogo.`,
    })

    // Redirecionar para a lista de produtos
    setTimeout(() => {
      navigate("/produtos")
    }, 1500)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Produto</FormLabel>
                    <FormControl>
                      <Input placeholder="Quartinha de Barro" {...field} />
                    </FormControl>
                    <FormDescription>Nome completo do produto.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código</FormLabel>
                    <FormControl>
                      <Input placeholder="QBP-001" {...field} />
                    </FormControl>
                    <FormDescription>Código único para identificação do produto.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Quartinhas de Barro">Quartinhas de Barro</SelectItem>
                        <SelectItem value="Quartinhas de Porcelana">Quartinhas de Porcelana</SelectItem>
                        <SelectItem value="Ibás">Ibás</SelectItem>
                        <SelectItem value="Alguidar">Alguidar</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Categoria do produto.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Cerâmica</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Barro">Barro</SelectItem>
                        <SelectItem value="Porcelana">Porcelana</SelectItem>
                        <SelectItem value="Cerâmica Esmaltada">Cerâmica Esmaltada</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Tipo de material cerâmico.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor</FormLabel>
                    <FormControl>
                      <Input placeholder="Terracota" {...field} />
                    </FormControl>
                    <FormDescription>Cor predominante do produto.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tamanho</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um tamanho" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pequeno">Pequeno</SelectItem>
                        <SelectItem value="Médio">Médio</SelectItem>
                        <SelectItem value="Grande">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Tamanho do produto.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormDescription>Preço de venda do produto.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estoque Inicial</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>Quantidade inicial em estoque.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descreva o produto em detalhes..." className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>Descrição detalhada do produto.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate("/produtos")}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Produto</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

