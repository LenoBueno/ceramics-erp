import { DashboardShell } from "@/components/dashboard-shell"
import { PageHeader, PageHeaderAction } from "@/components/page-header"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { DataTableActions } from "@/components/data-table/data-table-actions"
import { StatusBadge } from "@/components/status-badge"
import type { Supplier } from "@/types/supplier"
import { Eye, FileEdit, Plus, Star, Trash2, Truck } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

// Dados de exemplo para fornecedores
const suppliers: Supplier[] = [
  {
    id: "SUPP-001",
    name: "Cerâmicas Artesanais Ltda",
    document: "12.345.678/0001-90",
    stateRegistration: "123456789",
    address: {
      street: "Rua das Olarias",
      number: "500",
      district: "Distrito Industrial",
      city: "São Paulo",
      state: "SP",
      zipCode: "04001-000",
      country: "Brasil",
    },
    contacts: [
      {
        name: "Roberto Mendes",
        email: "roberto@ceramicasartesanais.com.br",
        phone: "(11) 98765-4321",
        position: "Gerente Comercial",
      },
    ],
    status: "active",
    createdAt: "2023-01-10",
    updatedAt: "2023-06-15",
    paymentTerms: "30 dias",
    deliveryTime: 7,
    minOrderValue: 1000,
    categories: ["Argila", "Esmaltes", "Ferramentas"],
    rating: 4.8,
    lastPurchaseDate: "2023-06-10",
  },
  {
    id: "SUPP-002",
    name: "Fornecedora de Materiais Cerâmicos",
    document: "23.456.789/0001-01",
    stateRegistration: "234567890",
    address: {
      street: "Av. Industrial",
      number: "1200",
      district: "Centro",
      city: "Belo Horizonte",
      state: "MG",
      zipCode: "30130-000",
      country: "Brasil",
    },
    contacts: [
      {
        name: "Carla Sousa",
        email: "carla@fmc.com.br",
        phone: "(31) 97654-3210",
        position: "Diretora de Vendas",
      },
    ],
    status: "active",
    createdAt: "2023-02-05",
    updatedAt: "2023-05-20",
    paymentTerms: "45 dias",
    deliveryTime: 10,
    minOrderValue: 1500,
    categories: ["Argila", "Pigmentos", "Equipamentos"],
    rating: 4.5,
    lastPurchaseDate: "2023-05-15",
  },
  {
    id: "SUPP-003",
    name: "Distribuidora de Insumos Cerâmicos",
    document: "34.567.890/0001-12",
    stateRegistration: "345678901",
    address: {
      street: "Rodovia BR-101",
      number: "Km 235",
      district: "Zona Rural",
      city: "Criciúma",
      state: "SC",
      zipCode: "88800-000",
      country: "Brasil",
    },
    contacts: [
      {
        name: "Fernando Costa",
        email: "fernando@dicinsumos.com.br",
        phone: "(48) 96543-2109",
        position: "Representante Comercial",
      },
    ],
    status: "active",
    createdAt: "2023-03-15",
    updatedAt: "2023-06-05",
    paymentTerms: "30 dias",
    deliveryTime: 5,
    minOrderValue: 800,
    categories: ["Argila", "Esmaltes", "Ferramentas", "Embalagens"],
    rating: 4.9,
    lastPurchaseDate: "2023-06-01",
  },
  {
    id: "SUPP-004",
    name: "Equipamentos Cerâmicos S.A.",
    document: "45.678.901/0001-23",
    stateRegistration: "456789012",
    address: {
      street: "Av. das Indústrias",
      number: "850",
      district: "Distrito Industrial",
      city: "Porto Alegre",
      state: "RS",
      zipCode: "90000-000",
      country: "Brasil",
    },
    contacts: [
      {
        name: "Marcelo Alves",
        email: "marcelo@equipcer.com.br",
        phone: "(51) 95432-1098",
        position: "Gerente de Vendas",
      },
    ],
    status: "inactive",
    createdAt: "2023-01-25",
    updatedAt: "2023-04-10",
    paymentTerms: "60 dias",
    deliveryTime: 15,
    minOrderValue: 5000,
    categories: ["Fornos", "Equipamentos", "Peças de Reposição"],
    rating: 4.2,
    lastPurchaseDate: "2023-04-05",
  },
  {
    id: "SUPP-005",
    name: "Mineradora de Argilas Especiais",
    document: "56.789.012/0001-34",
    stateRegistration: "567890123",
    address: {
      street: "Estrada da Mina",
      number: "s/n",
      district: "Zona Rural",
      city: "Itú",
      state: "SP",
      zipCode: "13300-000",
      country: "Brasil",
    },
    contacts: [
      {
        name: "Paulo Ribeiro",
        email: "paulo@mineradoraargilas.com.br",
        phone: "(11) 94321-0987",
        position: "Diretor Comercial",
      },
    ],
    status: "active",
    createdAt: "2023-02-15",
    updatedAt: "2023-05-25",
    paymentTerms: "15 dias",
    deliveryTime: 3,
    minOrderValue: 2000,
    categories: ["Argila", "Caulim", "Feldspato"],
    rating: 4.7,
    lastPurchaseDate: "2023-05-20",
  },
]

// Definição das colunas da tabela
const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
    cell: ({ row }) => {
      const supplier = row.original
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Truck className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="font-medium">{supplier.name}</div>
            <div className="text-xs text-muted-foreground">{supplier.document}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "categories",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Categorias" />,
    cell: ({ row }) => {
      const categories = row.getValue("categories") as string[]
      return (
        <div className="flex flex-wrap gap-1">
          {categories.slice(0, 2).map((category, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary"
            >
              {category}
            </span>
          ))}
          {categories.length > 2 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary/10 text-secondary">
              +{categories.length - 2}
            </span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "contacts",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Contato" />,
    cell: ({ row }) => {
      const contacts = row.original.contacts
      if (contacts && contacts.length > 0) {
        return (
          <div>
            <div className="font-medium">{contacts[0].name}</div>
            <div className="text-xs text-muted-foreground">{contacts[0].email}</div>
          </div>
        )
      }
      return <div className="text-muted-foreground">Sem contato</div>
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cidade/UF" />,
    cell: ({ row }) => {
      const address = row.original.address
      return <div>{`${address.city}/${address.state}`}</div>
    },
  },
  {
    accessorKey: "deliveryTime",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Prazo de Entrega" />,
    cell: ({ row }) => {
      const deliveryTime = row.getValue("deliveryTime") as number
      return <div>{`${deliveryTime} dias`}</div>
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Avaliação" />,
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number
      return (
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
          <span>{rating?.toFixed(1) || "N/A"}</span>
        </div>
      )
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
      const supplier = row.original

      return (
        <DataTableActions
          actions={[
            {
              label: "Ver detalhes",
              icon: <Eye className="h-4 w-4" />,
              href: `/fornecedores/${supplier.id}`,
            },
            {
              label: "Editar",
              icon: <FileEdit className="h-4 w-4" />,
              href: `/fornecedores/${supplier.id}/editar`,
            },
            {
              label: "Excluir",
              icon: <Trash2 className="h-4 w-4" />,
              variant: "destructive",
              onClick: () => console.log(`Excluir fornecedor ${supplier.id}`),
            },
          ]}
        />
      )
    },
  },
]

export default function SuppliersPage() {
  return (
    <DashboardShell>
      <PageHeader heading="Fornecedores" text="Gerencie os fornecedores da sua empresa.">
        <PageHeaderAction href="/fornecedores/novo" icon={<Plus className="h-4 w-4" />}>
          Novo Fornecedor
        </PageHeaderAction>
      </PageHeader>

      <div className="mt-6">
        <DataTable columns={columns} data={suppliers} searchPlaceholder="Buscar fornecedores..." searchColumn="name" />
      </div>
    </DashboardShell>
  )
}

