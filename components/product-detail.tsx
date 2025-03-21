"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, BarChart3, Box, Edit, History, Package, ShoppingCart, Truck } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

// Dados simulados para o produto
const getProductData = (id: string) => {
  const products = [
    {
      id: "1",
      name: "Quartinha de Barro Pequena",
      code: "QBP-001",
      category: "Quartinhas de Barro",
      type: "Barro",
      color: "Terracota",
      size: "Pequena",
      price: 89.9,
      stock: 15,
      status: "active",
      description:
        "Quartinha de barro pequena, ideal para decoração e uso funcional. Feita artesanalmente com barro de alta qualidade.",
      dimensions: "15cm x 10cm x 10cm",
      weight: "0.5kg",
      createdAt: "2023-05-15",
      updatedAt: "2023-10-22",
      supplier: "Cerâmicas Artesanais Ltda",
      minStock: 10,
      maxStock: 30,
      reorderPoint: 8,
      location: "Prateleira A3",
      salesLast30Days: 12,
      costPrice: 45.0,
      profitMargin: "49.94%",
    },
    {
      id: "2",
      name: "Quartinha de Barro Média",
      code: "QBM-002",
      category: "Quartinhas de Barro",
      type: "Barro",
      color: "Terracota",
      size: "Média",
      price: 129.9,
      stock: 8,
      status: "active",
      description:
        "Quartinha de barro média, perfeita para decoração e uso funcional. Produzida artesanalmente com técnicas tradicionais.",
      dimensions: "20cm x 15cm x 15cm",
      weight: "0.8kg",
      createdAt: "2023-05-15",
      updatedAt: "2023-11-05",
      supplier: "Cerâmicas Artesanais Ltda",
      minStock: 8,
      maxStock: 25,
      reorderPoint: 6,
      location: "Prateleira A4",
      salesLast30Days: 9,
      costPrice: 65.0,
      profitMargin: "49.96%",
    },
    {
      id: "3",
      name: "Quartinha de Barro Grande",
      code: "QBG-003",
      category: "Quartinhas de Barro",
      type: "Barro",
      color: "Terracota",
      size: "Grande",
      price: 179.9,
      stock: 5,
      status: "low_stock",
      description:
        "Quartinha de barro grande, excelente para decoração e uso funcional. Cada peça é única, feita à mão por artesãos experientes.",
      dimensions: "30cm x 20cm x 20cm",
      weight: "1.2kg",
      createdAt: "2023-05-15",
      updatedAt: "2023-12-10",
      supplier: "Cerâmicas Artesanais Ltda",
      minStock: 5,
      maxStock: 20,
      reorderPoint: 4,
      location: "Prateleira A5",
      salesLast30Days: 7,
      costPrice: 90.0,
      profitMargin: "49.97%",
    },
  ]

  return products.find((p) => p.id === id) || products[0]
}

interface ProductDetailProps {
  id: string
}

export function ProductDetail({ id }: ProductDetailProps) {
  const router = useRouter()
  const product = getProductData(id)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleDelete = () => {
    // Simulação de exclusão
    toast({
      title: "Produto excluído",
      description: `O produto "${product.name}" foi excluído com sucesso.`,
    })
    setDeleteDialogOpen(false)

    // Redirecionar para a lista de produtos
    setTimeout(() => {
      router.push("/produtos")
    }, 1500)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <>
      <Tabs defaultValue="info" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="inventory">Estoque</TabsTrigger>
          <TabsTrigger value="sales">Vendas</TabsTrigger>
          <TabsTrigger value="purchases">Compras</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  <CardDescription>{product.code}</CardDescription>
                </div>
                <Badge
                  variant={
                    product.status === "active" ? "default" : product.status === "low_stock" ? "warning" : "secondary"
                  }
                >
                  {product.status === "active" ? "Ativo" : product.status === "low_stock" ? "Estoque Baixo" : "Inativo"}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Categoria</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Tipo</p>
                    <p className="text-sm text-muted-foreground">{product.type}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Cor</p>
                    <p className="text-sm text-muted-foreground">{product.color}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Tamanho</p>
                    <p className="text-sm text-muted-foreground">{product.size}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Dimensões</p>
                    <p className="text-sm text-muted-foreground">{product.dimensions}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Peso</p>
                    <p className="text-sm text-muted-foreground">{product.weight}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Descrição</p>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preços</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Preço de Venda</p>
                  <p className="text-2xl font-bold">{formatCurrency(product.price)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Preço de Custo</p>
                  <p className="text-lg">{formatCurrency(product.costPrice)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Margem de Lucro</p>
                  <p className="text-lg">{product.profitMargin}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="w-full" onClick={() => router.push(`/produtos/${id}/editar`)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar Produto
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Fornecedor</p>
                <p className="text-sm text-muted-foreground">{product.supplier}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Data de Criação</p>
                <p className="text-sm text-muted-foreground">{formatDate(product.createdAt)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Última Atualização</p>
                <p className="text-sm text-muted-foreground">{formatDate(product.updatedAt)}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="flex items-center">
                <Box className="mr-2 h-5 w-5 text-muted-foreground" />
                <CardTitle>Informações de Estoque</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Estoque Atual</p>
                  <p className="text-2xl font-bold">{product.stock} unidades</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Estoque Mínimo</p>
                  <p className="text-lg">{product.minStock} unidades</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Estoque Máximo</p>
                  <p className="text-lg">{product.maxStock} unidades</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Ponto de Reposição</p>
                  <p className="text-lg">{product.reorderPoint} unidades</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Localização no Estoque</p>
                <p className="text-sm text-muted-foreground">{product.location}</p>
              </div>

              {product.stock <= product.reorderPoint && (
                <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-md">
                  <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    O estoque está abaixo do ponto de reposição. Considere fazer um novo pedido.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Truck className="mr-2 h-4 w-4" />
                Solicitar Reposição
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Movimentações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? "bg-green-500" : "bg-red-500"} mr-2`}></div>
                      <div>
                        <p className="text-sm font-medium">{i % 2 === 0 ? "Entrada" : "Saída"}</p>
                        <p className="text-xs text-muted-foreground">{`${new Date().toLocaleDateString("pt-BR")}`}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {i % 2 === 0 ? "+" : "-"}
                        {Math.floor(Math.random() * 5) + 1} unidades
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {i % 2 === 0 ? "Compra" : "Venda"} #{1000 + i}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5 text-muted-foreground" />
                <CardTitle>Histórico de Vendas</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Vendas (Últimos 30 dias)</p>
                  <p className="text-2xl font-bold">{product.salesLast30Days} unidades</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Receita (Últimos 30 dias)</p>
                  <p className="text-2xl font-bold">{formatCurrency(product.salesLast30Days * product.price)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Ticket Médio</p>
                  <p className="text-2xl font-bold">{formatCurrency(product.price)}</p>
                </div>
              </div>

              <div className="h-[200px] flex items-center justify-center border rounded-md">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
                <p className="ml-2 text-muted-foreground">Gráfico de vendas em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimas Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium">Pedido #{1000 + i}</p>
                      <p className="text-xs text-muted-foreground">{`${new Date(Date.now() - i * 86400000).toLocaleDateString("pt-BR")}`}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{Math.floor(Math.random() * 3) + 1} unidades</p>
                      <p className="text-xs text-muted-foreground">Cliente: Cliente {i}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchases" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="flex items-center">
                <Package className="mr-2 h-5 w-5 text-muted-foreground" />
                <CardTitle>Compras e Fornecedores</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <p className="text-sm font-medium">Fornecedor Principal</p>
                <p className="text-lg">{product.supplier}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Último Preço de Compra</p>
                <p className="text-lg">{formatCurrency(product.costPrice)}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Prazo Médio de Entrega</p>
                <p className="text-lg">7 dias</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Compras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium">Pedido de Compra #{500 + i}</p>
                      <p className="text-xs text-muted-foreground">{`${new Date(Date.now() - i * 30 * 86400000).toLocaleDateString("pt-BR")}`}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{Math.floor(Math.random() * 10) + 5} unidades</p>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency((Math.floor(Math.random() * 10) + 5) * product.costPrice)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="flex items-center">
                <History className="mr-2 h-5 w-5 text-muted-foreground" />
                <CardTitle>Histórico de Alterações</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full border">
                    <History className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Produto atualizado</p>
                    <p className="text-xs text-muted-foreground">{formatDate(product.updatedAt)}</p>
                    <p className="text-sm">
                      Preço alterado de {formatCurrency(product.price - 10)} para {formatCurrency(product.price)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full border">
                    <History className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Estoque atualizado</p>
                    <p className="text-xs text-muted-foreground">{formatDate(product.updatedAt)}</p>
                    <p className="text-sm">
                      Estoque mínimo alterado de {product.minStock - 2} para {product.minStock}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full border">
                    <History className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Produto criado</p>
                    <p className="text-xs text-muted-foreground">{formatDate(product.createdAt)}</p>
                    <p className="text-sm">Produto adicionado ao catálogo</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={() => router.push(`/produtos/${id}/editar`)}>
          <Edit className="mr-2 h-4 w-4" />
          Editar Produto
        </Button>
        <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
          Excluir Produto
        </Button>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o produto "{product.name}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

