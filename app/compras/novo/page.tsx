"use client"

import type React from "react"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { PageHeader, PageHeaderAction } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { formatCurrency } from "@/lib/utils"

// Tipo para item de compra
interface PurchaseItem {
  id: string
  productId: string
  productName: string
  productCode: string
  quantity: number
  unitPrice: number
  total: number
}

export default function NewPurchasePage() {
  const searchParams = useSearchParams()
  const supplierId = searchParams.get("fornecedor")
  const router = useRouter()

  const [activeTab, setActiveTab] = useState("supplier")
  const [supplier, setSupplier] = useState(
    supplierId
      ? {
          id: supplierId,
          name: supplierId === "SUPP-001" ? "Cerâmicas Artesanais Ltda" : "Selecione um fornecedor",
        }
      : null,
  )

  const [items, setItems] = useState<PurchaseItem[]>([
    {
      id: "1",
      productId: "1",
      productName: "Argila Vermelha",
      productCode: "ARG-001",
      quantity: 1,
      unitPrice: 5.0,
      total: 5.0,
    },
  ])

  const [shippingCost, setShippingCost] = useState(0)
  const [taxRate, setTaxRate] = useState(10)

  // Calcular subtotal, impostos e total
  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const taxAmount = (subtotal * taxRate) / 100
  const total = subtotal + shippingCost + taxAmount

  const updateItem = (id: string, field: keyof PurchaseItem, value: number | string) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }

          // Recalcular o total se quantidade ou preço unitário mudar
          if (field === "quantity" || field === "unitPrice") {
            updatedItem.total = Number(updatedItem.quantity) * Number(updatedItem.unitPrice)
          }

          return updatedItem
        }
        return item
      }),
    )
  }

  const addItem = () => {
    const newId = (items.length + 1).toString()
    setItems([
      ...items,
      {
        id: newId,
        productId: "",
        productName: "",
        productCode: "",
        quantity: 1,
        unitPrice: 0,
        total: 0,
      },
    ])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!supplier) {
      toast({
        title: "Erro",
        description: "Selecione um fornecedor para continuar.",
        variant: "destructive",
      })
      return
    }

    // Aqui seria implementada a lógica para salvar o pedido de compra
    toast({
      title: "Pedido de compra criado",
      description: "O pedido de compra foi criado com sucesso.",
    })

    // Redirecionar para a lista de compras
    setTimeout(() => {
      router.push("/compras")
    }, 1500)
  }

  return (
    <DashboardShell>
      <PageHeader heading="Nova Compra" text="Crie um novo pedido de compra.">
        <div className="flex gap-2">
          <PageHeaderAction href="/compras" variant="outline" icon={<ArrowLeft className="h-4 w-4" />}>
            Voltar
          </PageHeaderAction>
          <PageHeaderAction
            onClick={() => {
              toast({
                title: "Rascunho salvo",
                description: "O rascunho do pedido foi salvo com sucesso.",
              })
            }}
            variant="outline"
            icon={<Save className="h-4 w-4" />}
          >
            Salvar Rascunho
          </PageHeaderAction>
        </div>
      </PageHeader>

      <div className="mt-6">
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="supplier">Fornecedor</TabsTrigger>
              <TabsTrigger value="items">Itens</TabsTrigger>
              <TabsTrigger value="payment">Pagamento</TabsTrigger>
              <TabsTrigger value="shipping">Entrega</TabsTrigger>
            </TabsList>

            <Card>
              <CardContent className="pt-6">
                <TabsContent value="supplier" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="supplier">Fornecedor</Label>
                      <Select
                        value={supplier?.id || ""}
                        onValueChange={(value) => {
                          if (value === "SUPP-001") {
                            setSupplier({
                              id: "SUPP-001",
                              name: "Cerâmicas Artesanais Ltda",
                            })
                          } else if (value === "SUPP-002") {
                            setSupplier({
                              id: "SUPP-002",
                              name: "Fornecedora de Materiais Cerâmicos",
                            })
                          } else if (value === "SUPP-003") {
                            setSupplier({
                              id: "SUPP-003",
                              name: "Distribuidora de Insumos Cerâmicos",
                            })
                          } else {
                            setSupplier(null)
                          }
                        }}
                      >
                        <SelectTrigger id="supplier">
                          <SelectValue placeholder="Selecione um fornecedor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SUPP-001">Cerâmicas Artesanais Ltda</SelectItem>
                          <SelectItem value="SUPP-002">Fornecedora de Materiais Cerâmicos</SelectItem>
                          <SelectItem value="SUPP-003">Distribuidora de Insumos Cerâmicos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Data do Pedido</Label>
                      <Input id="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Observações</Label>
                      <Textarea id="notes" placeholder="Observações sobre o pedido..." />
                    </div>

                    <div className="flex justify-end">
                      <Button type="button" onClick={() => setActiveTab("items")} disabled={!supplier}>
                        Próximo: Itens
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="items" className="space-y-4">
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="h-10 px-4 text-left align-middle font-medium">Produto</th>
                            <th className="h-10 px-4 text-left align-middle font-medium">Código</th>
                            <th className="h-10 px-4 text-center align-middle font-medium">Quantidade</th>
                            <th className="h-10 px-4 text-right align-middle font-medium">Preço Unit.</th>
                            <th className="h-10 px-4 text-right align-middle font-medium">Total</th>
                            <th className="h-10 px-4 text-center align-middle font-medium">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item) => (
                            <tr key={item.id} className="border-b">
                              <td className="p-4 align-middle">
                                <Input
                                  value={item.productName}
                                  onChange={(e) => updateItem(item.id, "productName", e.target.value)}
                                  placeholder="Nome do produto"
                                />
                              </td>
                              <td className="p-4 align-middle">
                                <Input
                                  value={item.productCode}
                                  onChange={(e) => updateItem(item.id, "productCode", e.target.value)}
                                  placeholder="Código"
                                />
                              </td>
                              <td className="p-4 align-middle">
                                <Input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                                  className="w-20 mx-auto text-center"
                                />
                              </td>
                              <td className="p-4 align-middle">
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={item.unitPrice}
                                  onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value))}
                                  className="w-28 ml-auto text-right"
                                />
                              </td>
                              <td className="p-4 align-middle text-right font-medium">{formatCurrency(item.total)}</td>
                              <td className="p-4 align-middle text-center">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeItem(item.id)}
                                  disabled={items.length <= 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={addItem}>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Item
                      </Button>

                      <div className="w-80 space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Frete:</span>
                          <span>{formatCurrency(shippingCost)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Impostos ({taxRate}%):</span>
                          <span>{formatCurrency(taxAmount)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Total:</span>
                          <span>{formatCurrency(total)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setActiveTab("supplier")}>
                        Voltar: Fornecedor
                      </Button>
                      <Button type="button" onClick={() => setActiveTab("payment")}>
                        Próximo: Pagamento
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="payment" className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="paymentMethod">Método de Pagamento</Label>
                        <Select defaultValue="bank_transfer">
                          <SelectTrigger id="paymentMethod">
                            <SelectValue placeholder="Selecione o método" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bank_transfer">Transferência Bancária</SelectItem>
                            <SelectItem value="credit_card">Cartão de Crédito</SelectItem>
                            <SelectItem value="boleto">Boleto Bancário</SelectItem>
                            <SelectItem value="cash">Dinheiro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="paymentTerms">Condições de Pagamento</Label>
                        <Select defaultValue="30_days">
                          <SelectTrigger id="paymentTerms">
                            <SelectValue placeholder="Selecione as condições" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash">À Vista</SelectItem>
                            <SelectItem value="15_days">15 Dias</SelectItem>
                            <SelectItem value="30_days">30 Dias</SelectItem>
                            <SelectItem value="45_days">45 Dias</SelectItem>
                            <SelectItem value="60_days">60 Dias</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="shippingCost">Custo de Frete (R$)</Label>
                        <Input
                          id="shippingCost"
                          type="number"
                          min="0"
                          step="0.01"
                          value={shippingCost}
                          onChange={(e) => setShippingCost(Number(e.target.value))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="taxRate">Taxa de Impostos (%)</Label>
                        <Input
                          id="taxRate"
                          type="number"
                          min="0"
                          max="100"
                          value={taxRate}
                          onChange={(e) => setTaxRate(Number(e.target.value))}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setActiveTab("items")}>
                        Voltar: Itens
                      </Button>
                      <Button type="button" onClick={() => setActiveTab("shipping")}>
                        Próximo: Entrega
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="shipping" className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="deliveryDate">Data de Entrega Prevista</Label>
                        <Input
                          id="deliveryDate"
                          type="date"
                          defaultValue={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="shippingMethod">Método de Entrega</Label>
                        <Select defaultValue="supplier">
                          <SelectTrigger id="shippingMethod">
                            <SelectValue placeholder="Selecione o método" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="supplier">Entrega pelo Fornecedor</SelectItem>
                            <SelectItem value="pickup">Retirada no Fornecedor</SelectItem>
                            <SelectItem value="courier">Transportadora</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="shippingNotes">Instruções de Entrega</Label>
                        <Textarea id="shippingNotes" placeholder="Instruções especiais para entrega..." />
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setActiveTab("payment")}>
                        Voltar: Pagamento
                      </Button>
                      <Button type="submit">Finalizar Pedido</Button>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </form>
      </div>
    </DashboardShell>
  )
}

