"use client"

import type React from "react"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { PageHeader, PageHeaderAction } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export default function InventoryAdjustmentPage() {
  const searchParams = useSearchParams()
  const productId = searchParams()
  const router = useRouter()

  const [product, setProduct] = useState(
    productId
      ? {
          id: productId,
          name: productId === "3" ? "Quartinha de Barro Grande" : "Selecione um produto",
          code: productId === "3" ? "QBG-003" : "",
          currentStock: productId === "3" ? 5 : 0,
        }
      : null,
  )

  const [adjustmentType, setAdjustmentType] = useState<"add" | "remove" | "set">("add")
  const [quantity, setQuantity] = useState(1)
  const [reason, setReason] = useState("")

  const handleProductSearch = () => {
    // Simulação de busca de produto
    setProduct({
      id: "3",
      name: "Quartinha de Barro Grande",
      code: "QBG-003",
      currentStock: 5,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!product) {
      toast({
        title: "Erro",
        description: "Selecione um produto para ajustar o estoque.",
        variant: "destructive",
      })
      return
    }

    // Aqui seria implementada a lógica de ajuste de estoque
    toast({
      title: "Estoque ajustado com sucesso",
      description: `O estoque do produto ${product.name} foi atualizado.`,
    })

    // Redirecionar para a lista de produtos em estoque
    setTimeout(() => {
      router.push("/estoque")
    }, 1500)
  }

  return (
    <DashboardShell>
      <PageHeader heading="Ajuste de Estoque" text="Realize ajustes no estoque de produtos.">
        <PageHeaderAction href="/estoque" variant="outline" icon={<ArrowLeft className="h-4 w-4" />}>
          Voltar
        </PageHeaderAction>
      </PageHeader>

      <div className="mt-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Selecionar Produto</CardTitle>
                <CardDescription>Busque o produto que deseja ajustar o estoque.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="Buscar produto por nome ou código..."
                      value={product?.code || ""}
                      onChange={(e) => setProduct((prev) => (prev ? { ...prev, code: e.target.value } : null))}
                    />
                  </div>
                  <Button type="button" variant="outline" onClick={handleProductSearch}>
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </div>

                {product && (
                  <div className="border rounded-md p-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Produto:</span>
                        <span>{product.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Código:</span>
                        <span>{product.code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Estoque Atual:</span>
                        <span className="font-bold">{product.currentStock} unidades</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Ajuste</CardTitle>
                <CardDescription>Informe os detalhes do ajuste de estoque.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adjustmentType">Tipo de Ajuste</Label>
                  <Select value={adjustmentType} onValueChange={(value) => setAdjustmentType(value as any)}>
                    <SelectTrigger id="adjustmentType">
                      <SelectValue placeholder="Selecione o tipo de ajuste" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">Adicionar ao Estoque</SelectItem>
                      <SelectItem value="remove">Remover do Estoque</SelectItem>
                      <SelectItem value="set">Definir Quantidade Exata</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Motivo do Ajuste</Label>
                  <Select defaultValue="inventory_count">
                    <SelectTrigger id="reason">
                      <SelectValue placeholder="Selecione o motivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inventory_count">Contagem de Estoque</SelectItem>
                      <SelectItem value="damaged">Produtos Danificados</SelectItem>
                      <SelectItem value="return">Devolução</SelectItem>
                      <SelectItem value="production">Produção</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea
                    id="notes"
                    placeholder="Detalhes adicionais sobre o ajuste..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" asChild>
                  <Link href="/estoque">Cancelar</Link>
                </Button>
                <Button type="submit" disabled={!product}>
                  Confirmar Ajuste
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </div>
    </DashboardShell>
  )
}

