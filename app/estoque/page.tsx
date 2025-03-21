import { DashboardShell } from "@/components/dashboard-shell"
import { PageHeader, PageHeaderAction } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { DataTableActions } from "@/components/data-table/data-table-actions"
import { StatusBadge } from "@/components/status-badge"
import type { Product } from "@/types/product"
import { formatCurrency } from "@/lib/utils"
import { AlertTriangle, ArrowUpDown, Box, Eye, FileEdit, Plus, RefreshCw, Truck } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

// Dados de exemplo para produtos em estoque
const products: Product[] = [
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
  {
    id: "4",
    name: "Quartinha de Porcelana Decorada",
    code: "QPD-004",
    category: "Quartinhas de Porcelana",
    type: "Porcelana",
    color: "Branca",
    size: "Média",
    price: 249.9,
    stock: 12,
    status: "active",
    dimensions: "18cm x 12cm x 12cm",
    weight: "0.6kg",
    createdAt: "2023-06-10",
    updatedAt: "2023-12-15",
    supplier: "Fornecedora de Materiais Cerâmicos",
    minStock: 10,
    maxStock: 30,
    reorderPoint: 8,
    location: "Prateleira B2",
    salesLast30Days: 15,
    costPrice: 120.0,
    profitMargin: "52.00%",
  },
  {
    id: "5",
    name: "Ibá Pequeno",
    code: "IBP-005",
    category: "Ibás",
    type: "Barro",
    color: "Terracota",
    size: "Pequeno",
    price: 69.9,
    stock: 3,
    status: "low_stock",
    dimensions: "12cm x 12cm x 5cm",
    weight: "0.3kg",
    createdAt: "2023-07-05",
    updatedAt: "2023-11-20",
    supplier: "Cerâmicas Artesanais Ltda",
    minStock: 6,
    maxStock: 20,
    reorderPoint: 5,
    location: "Prateleira C1",
    salesLast30Days: 8,
    costPrice: 35.0,
    profitMargin: "49.93%",
  },
]

// Definição das colunas da tabela
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Produto" />,
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-sm bg-primary/10 flex items-center justify-center">
            <Box className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="font-medium">{product.name}</div>
            <div className="text-xs text-muted-foreground">{product.code}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Categoria" />,
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Estoque" />,
    cell: ({ row }) => {
      const stock = row.getValue("stock") as number
      const minStock = row.original.minStock

      return (
        <div className="flex items-center">
          <span className={stock <= minStock ? "text-red-500 font-medium" : ""}>{stock}</span>
          {stock <= row.original.reorderPoint && <AlertTriangle className="ml-2 h-4 w-4 text-yellow-500" />}
        </div>
      )
    },
  },
  {
    accessorKey: "location",
    header: function({ column }) { return <DataTableColumnHeader column={column} title="Localização" /> },
    cell: function({ row }) { return <div>{row.getValue("location")}</div> },
  },
  {
    accessorKey: "price",
    header: function({ column }) { return <DataTableColumnHeader column={column} title="Preço" /> },
    cell: function({ row }) {
      const price = row.getValue("price") as number
      return <div className="text-right">{formatCurrency(price)}</div>
    },
  },
  {
    accessorKey: "status",
    header: function({ column }) { return <DataTableColumnHeader column={column} title="Status" /> },
    cell: function({ row }) {
      const status = row.getValue("status") as string
      return <StatusBadge status={status as any} />
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original

      return (
        <DataTableActions
          actions={[
            {
              label: "Ver detalhes",
              icon: <Eye className="h-4 w-4" />,
              href: `/produtos/${product.id}`,
            },
            {
              label: "Editar",
              icon: <FileEdit className="h-4 w-4" />,
              href: `/produtos/${product.id}/editar`,
            },
            {
              label: "Ajustar estoque",
              icon: <RefreshCw className="h-4 w-4" />,
              href: `/estoque/ajuste?produto=${product.id}`,
            },
          ]}
        />
      )
    },
  },
]

export default function InventoryPage() {
  return (
    <DashboardShell>
      <PageHeader heading="Estoque" text="Gerencie o estoque de produtos da sua empresa.">
        <div className="flex gap-2">
          <PageHeaderAction href="/estoque/ajuste" variant="outline" icon={<RefreshCw className="h-4 w-4" />}>
            Ajuste de Estoque
          </PageHeaderAction>
          <PageHeaderAction href="/estoque/contagem" variant="outline" icon={<ArrowUpDown className="h-4 w-4" />}>
            Contagem
          </PageHeaderAction>
          <PageHeaderAction href="/produtos/novo" icon={<Plus className="h-4 w-4" />}>
            Novo Produto
          </PageHeaderAction>
        </div>
      </PageHeader>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total em Estoque</CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573 unidades</div>
            <p className="text-xs text-muted-foreground">Valor total: R$ 45.230,50</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Abaixo do Mínimo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8 produtos</div>
            <p className="text-xs text-muted-foreground">Necessitam reposição</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Movimentações Recentes</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32 movimentações</div>
            <p className="text-xs text-muted-foreground">Nos últimos 7 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Pendentes</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 pedidos</div>
            <p className="text-xs text-muted-foreground">Aguardando recebimento</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todos os Produtos</TabsTrigger>
            <TabsTrigger value="low">Estoque Baixo</TabsTrigger>
            <TabsTrigger value="reorder">Ponto de Reposição</TabsTrigger>
            <TabsTrigger value="movements">Movimentações</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Produtos em Estoque</CardTitle>
                <CardDescription>Gerencie todos os produtos disponíveis no estoque.</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={products}
                  searchPlaceholder="Buscar produtos..."
                  searchColumn="name"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="low" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Produtos com Estoque Baixo</CardTitle>
                <CardDescription>Produtos que estão abaixo do estoque mínimo.</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={products.filter((p) => p.stock <= p.minStock)}
                  searchPlaceholder="Buscar produtos..."
                  searchColumn="name"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reorder" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Produtos no Ponto de Reposição</CardTitle>
                <CardDescription>Produtos que atingiram o ponto de reposição.</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={products.filter((p) => p.stock <= p.reorderPoint && p.stock > p.minStock)}
                  searchPlaceholder="Buscar produtos..."
                  searchColumn="name"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="movements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Movimentações de Estoque</CardTitle>
                <CardDescription>Histórico de entradas e saídas de produtos.</CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryMovementsTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

function InventoryMovementsTable() {
  // Dados de exemplo para movimentações de estoque
  const movements = [
    {
      id: "MOV-001",
      date: "2023-03-19",
      product: "Quartinha de Barro Pequena",
      type: "in",
      quantity: 10,
      reference: "Compra #PO-2025-001",
    },
    {
      id: "MOV-002",
      date: "2023-03-18",
      product: "Ibá Pequeno",
      type: "out",
      quantity: 2,
      reference: "Venda #ORD-2025-003",
    },
    {
      id: "MOV-003",
      date: "2023-03-18",
      product: "Quartinha de Barro Média",
      type: "out",
      quantity: 3,
      reference: "Venda #ORD-2025-003",
    },
    {
      id: "MOV-004",
      date: "2023-03-17",
      product: "Quartinha de Porcelana Decorada",
      type: "in",
      quantity: 5,
      reference: "Produção #PO-2025-002",
    },
    {
      id: "MOV-005",
      date: "2023-03-16",
      product: "Quartinha de Barro Grande",
      type: "out",
      quantity: 1,
      reference: "Ajuste de Estoque",
    },
  ]

  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="h-10 px-4 text-left align-middle font-medium">ID</th>
            <th className="h-10 px-4 text-left align-middle font-medium">Data</th>
            <th className="h-10 px-4 text-left align-middle font-medium">Produto</th>
            <th className="h-10 px-4 text-left align-middle font-medium">Tipo</th>
            <th className="h-10 px-4 text-right align-middle font-medium">Quantidade</th>
            <th className="h-10 px-4 text-left align-middle font-medium">Referência</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((movement) => (
            <tr key={movement.id} className="border-b">
              <td className="p-4 align-middle font-medium">{movement.id}</td>
              <td className="p-4 align-middle">{movement.date}</td>
              <td className="p-4 align-middle">{movement.product}</td>
              <td className="p-4 align-middle">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    movement.type === "in"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {movement.type === "in" ? "Entrada" : "Saída"}
                </span>
              </td>
              <td className="p-4 align-middle text-right">{movement.quantity}</td>
              <td className="p-4 align-middle">{movement.reference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

