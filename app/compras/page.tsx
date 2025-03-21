import { DashboardShell } from "@/components/dashboard-shell"
import { PageHeader, PageHeaderAction } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { DataTableActions } from "@/components/data-table/data-table-actions"
import { StatusBadge } from "@/components/status-badge"
import type { Purchase } from "@/types/purchase"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Eye, FileEdit, FileText, Plus, Truck } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

// Dados de exemplo para compras
const purchases: Purchase[] = [
  {
    id: "PO-2025-001",
    supplierId: "SUPP-001",
    supplierName: "Cerâmicas Artesanais Ltda",
    date: "2025-03-15",
    status: "completed",
    items: [
      {
        id: "ITEM-001",
        productId: "1",
        productName: "Argila Vermelha",
        productCode: "ARG-001",
        quantity: 500,
        unitPrice: 5.0,
        total: 2500.0,
      },
      {
        id: "ITEM-002",
        productId: "2",
        productName: "Esmalte Transparente",
        productCode: "ESM-001",
        quantity: 20,
        unitPrice: 25.0,
        total: 500.0,
      },
    ],
    subtotal: 3000.0,
    shipping: 150.0,
    tax: 300.0,
    total: 3450.0,
    paymentMethod: "Transferência Bancária",
    paymentStatus: "completed",
    deliveryDate: "2025-03-20",
    createdAt: "2025-03-10",
    updatedAt: "2025-03-15",
  },
  {
    id: "PO-2025-002",
    supplierId: "SUPP-002",
    supplierName: "Fornecedora de Materiais Cerâmicos",
    date: "2025-03-12",
    status: "processing",
    items: [
      {
        id: "ITEM-003",
        productId: "3",
        productName: "Pigmento Azul",
        productCode: "PIG-001",
        quantity: 10,
        unitPrice: 30.0,
        total: 300.0,
      },
      {
        id: "ITEM-004",
        productId: "4",
        productName: "Pigmento Vermelho",
        productCode: "PIG-002",
        quantity: 10,
        unitPrice: 35.0,
        total: 350.0,
      },
    ],
    subtotal: 650.0,
    shipping: 80.0,
    tax: 65.0,
    total: 795.0,
    paymentMethod: "Boleto Bancário",
    paymentStatus: "pending",
    deliveryDate: "2025-03-25",
    createdAt: "2025-03-12",
    updatedAt: "2025-03-12",
  },
  {
    id: "PO-2025-003",
    supplierId: "SUPP-003",
    supplierName: "Distribuidora de Insumos Cerâmicos",
    date: "2025-03-08",
    status: "pending",
    items: [
      {
        id: "ITEM-005",
        productId: "5",
        productName: "Ferramentas para Modelagem",
        productCode: "FER-001",
        quantity: 5,
        unitPrice: 120.0,
        total: 600.0,
      },
    ],
    subtotal: 600.0,
    shipping: 50.0,
    tax: 60.0,
    total: 710.0,
    paymentMethod: "Cartão de Crédito",
    paymentStatus: "completed",
    deliveryDate: "2025-03-18",
    createdAt: "2025-03-08",
    updatedAt: "2025-03-08",
  },
  {
    id: "PO-2025-004",
    supplierId: "SUPP-001",
    supplierName: "Cerâmicas Artesanais Ltda",
    date: "2025-03-05",
    status: "canceled",
    items: [
      {
        id: "ITEM-006",
        productId: "1",
        productName: "Argila Vermelha",
        productCode: "ARG-001",
        quantity: 200,
        unitPrice: 5.0,
        total: 1000.0,
      },
    ],
    subtotal: 1000.0,
    shipping: 100.0,
    tax: 100.0,
    total: 1200.0,
    paymentMethod: "Transferência Bancária",
    paymentStatus: "canceled",
    deliveryDate: "2025-03-15",
    createdAt: "2025-03-05",
    updatedAt: "2025-03-06",
  },
  {
    id: "PO-2025-005",
    supplierId: "SUPP-004",
    supplierName: "Equipamentos Cerâmicos S.A.",
    date: "2025-03-01",
    status: "delivered",
    items: [
      {
        id: "ITEM-007",
        productId: "6",
        productName: "Forno Elétrico 50L",
        productCode: "FOR-001",
        quantity: 1,
        unitPrice: 3500.0,
        total: 3500.0,
      },
    ],
    subtotal: 3500.0,
    shipping: 250.0,
    tax: 350.0,
    total: 4100.0,
    paymentMethod: "Parcelado",
    paymentStatus: "processing",
    deliveryDate: "2025-03-10",
    createdAt: "2025-03-01",
    updatedAt: "2025-03-10",
  },
]

// Definição das colunas da tabela
const columns: ColumnDef<Purchase>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Pedido" />,
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "supplierName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fornecedor" />,
    cell: ({ row }) => <div>{row.getValue("supplierName")}</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Data" />,
    cell: ({ row }) => <div>{formatDate(row.getValue("date"))}</div>,
  },
  {
    accessorKey: "items",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Itens" />,
    cell: ({ row }) => {
      const items = row.getValue("items") as any[]
      return <div>{items.length} itens</div>
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }) => {
      const total = row.getValue("total") as number
      return <div className="text-right font-medium">{formatCurrency(total)}</div>
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return <StatusBadge status={status as any} />
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const purchase = row.original

      return (
        <DataTableActions
          actions={[
            {
              label: "Ver detalhes",
              icon: <Eye className="h-4 w-4" />,
              href: `/compras/${purchase.id}`,
            },
            {
              label: "Editar",
              icon: <FileEdit className="h-4 w-4" />,
              href: `/compras/${purchase.id}/editar`,
            },
            {
              label: "Gerar PDF",
              icon: <FileText className="h-4 w-4" />,
              onClick: () => console.log(`Gerar PDF para ${purchase.id}`),
            },
          ]}
        />
      )
    },
  },
]

export default function PurchasesPage() {
  return (
    <DashboardShell>
      <PageHeader heading="Compras" text="Gerencie os pedidos de compra da sua empresa.">
        <PageHeaderAction href="/compras/novo" icon={<Plus className="h-4 w-4" />}>
          Nova Compra
        </PageHeaderAction>
      </PageHeader>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Compras</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 10.255,00</div>
            <p className="text-xs text-muted-foreground">Nos últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Pendentes</CardTitle>
            <Truck className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 pedidos</div>
            <p className="text-xs text-muted-foreground">Aguardando entrega</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Entregues</CardTitle>
            <Truck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8 pedidos</div>
            <p className="text-xs text-muted-foreground">Nos últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fornecedores Ativos</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 fornecedores</div>
            <p className="text-xs text-muted-foreground">Com pedidos recentes</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="processing">Em Processamento</TabsTrigger>
            <TabsTrigger value="delivered">Entregues</TabsTrigger>
            <TabsTrigger value="canceled">Cancelados</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pedidos de Compra</CardTitle>
                <CardDescription>Gerencie todos os pedidos de compra da sua empresa.</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={purchases} searchPlaceholder="Buscar pedidos..." searchColumn="id" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pedidos Pendentes</CardTitle>
                <CardDescription>Pedidos que ainda não foram processados.</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={purchases.filter((p) => p.status === "pending")}
                  searchPlaceholder="Buscar pedidos..."
                  searchColumn="id"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="processing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pedidos em Processamento</CardTitle>
                <CardDescription>Pedidos que estão sendo processados pelo fornecedor.</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={purchases.filter((p) => p.status === "processing")}
                  searchPlaceholder="Buscar pedidos..."
                  searchColumn="id"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivered" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pedidos Entregues</CardTitle>
                <CardDescription>Pedidos que já foram entregues.</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={purchases.filter((p) => p.status === "delivered" || p.status === "completed")}
                  searchPlaceholder="Buscar pedidos..."
                  searchColumn="id"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="canceled" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pedidos Cancelados</CardTitle>
                <CardDescription>Pedidos que foram cancelados.</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={purchases.filter((p) => p.status === "canceled")}
                  searchPlaceholder="Buscar pedidos..."
                  searchColumn="id"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

