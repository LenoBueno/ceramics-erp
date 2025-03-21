import { DashboardShell } from "@/components/dashboard-shell"
import { PageHeader, PageHeaderAction } from "@/components/page-header"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { DataTableActions } from "@/components/data-table/data-table-actions"
import { StatusBadge } from "@/components/status-badge"
import type { Customer } from "@/types/customer"
import { formatDate } from "@/lib/utils"
import { Eye, FileEdit, Plus, Trash2, User } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

// Dados de exemplo para clientes
const customers: Customer[] = [
  {
    id: "CUST-001",
    name: "Galeria Cerâmica",
    type: "company",
    document: "12.345.678/0001-90",
    stateRegistration: "123456789",
    address: {
      street: "Av. Paulista",
      number: "1000",
      district: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100",
      country: "Brasil",
    },
    contacts: [
      {
        name: "Ana Silva",
        email: "ana.silva@galeriaceramica.com.br",
        phone: "(11) 98765-4321",
        position: "Gerente de Compras",
      },
    ],
    status: "active",
    createdAt: "2023-01-15",
    updatedAt: "2023-06-20",
    creditLimit: 10000,
    paymentTerms: "30 dias",
    totalPurchases: 45000,
    lastPurchaseDate: "2023-06-15",
  },
  {
    id: "CUST-002",
    name: "Casa & Decoração",
    type: "company",
    document: "23.456.789/0001-01",
    stateRegistration: "234567890",
    address: {
      street: "Rua Oscar Freire",
      number: "500",
      district: "Jardins",
      city: "São Paulo",
      state: "SP",
      zipCode: "01426-001",
      country: "Brasil",
    },
    contacts: [
      {
        name: "Carlos Mendes",
        email: "carlos@casadecoracao.com.br",
        phone: "(11) 97654-3210",
        position: "Diretor",
      },
    ],
    status: "active",
    createdAt: "2023-02-10",
    updatedAt: "2023-05-15",
    creditLimit: 15000,
    paymentTerms: "45 dias",
    totalPurchases: 32000,
    lastPurchaseDate: "2023-05-10",
  },
  {
    id: "CUST-003",
    name: "Artesanato Brasil",
    type: "company",
    document: "34.567.890/0001-12",
    stateRegistration: "345678901",
    address: {
      street: "Av. Brasil",
      number: "1500",
      district: "Centro",
      city: "Rio de Janeiro",
      state: "RJ",
      zipCode: "20031-000",
      country: "Brasil",
    },
    contacts: [
      {
        name: "Mariana Costa",
        email: "mariana@artesanatobrasil.com.br",
        phone: "(21) 96543-2109",
        position: "Compradora",
      },
    ],
    status: "active",
    createdAt: "2023-03-05",
    updatedAt: "2023-06-10",
    creditLimit: 8000,
    paymentTerms: "30 dias",
    totalPurchases: 27500,
    lastPurchaseDate: "2023-06-05",
  },
  {
    id: "CUST-004",
    name: "Cerâmicas Elite",
    type: "company",
    document: "45.678.901/0001-23",
    stateRegistration: "456789012",
    address: {
      street: "Av. das Américas",
      number: "2000",
      district: "Barra da Tijuca",
      city: "Rio de Janeiro",
      state: "RJ",
      zipCode: "22640-101",
      country: "Brasil",
    },
    contacts: [
      {
        name: "Roberto Alves",
        email: "roberto@ceramicaselite.com.br",
        phone: "(21) 95432-1098",
        position: "Gerente Comercial",
      },
    ],
    status: "inactive",
    createdAt: "2023-01-20",
    updatedAt: "2023-04-15",
    creditLimit: 12000,
    paymentTerms: "45 dias",
    totalPurchases: 18000,
    lastPurchaseDate: "2023-04-10",
  },
  {
    id: "CUST-005",
    name: "Decor Artesanal",
    type: "company",
    document: "56.789.012/0001-34",
    stateRegistration: "567890123",
    address: {
      street: "Rua da Bahia",
      number: "800",
      district: "Centro",
      city: "Belo Horizonte",
      state: "MG",
      zipCode: "30160-010",
      country: "Brasil",
    },
    contacts: [
      {
        name: "Fernanda Lima",
        email: "fernanda@decorartesanal.com.br",
        phone: "(31) 94321-0987",
        position: "Proprietária",
      },
    ],
    status: "active",
    createdAt: "2023-02-25",
    updatedAt: "2023-05-20",
    creditLimit: 5000,
    paymentTerms: "15 dias",
    totalPurchases: 12500,
    lastPurchaseDate: "2023-05-15",
  },
]

// Definição das colunas da tabela
const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
    cell: ({ row }) => {
      const customer = row.original
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="font-medium">{customer.name}</div>
            <div className="text-xs text-muted-foreground">{customer.document}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tipo" />,
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return <div>{type === "company" ? "Pessoa Jurídica" : "Pessoa Física"}</div>
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
    accessorKey: "totalPurchases",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total de Compras" />,
    cell: ({ row }) => {
      const totalPurchases = row.getValue("totalPurchases") as number
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(totalPurchases)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "lastPurchaseDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Última Compra" />,
    cell: ({ row }) => {
      const date = row.getValue("lastPurchaseDate") as string
      if (!date) return <div className="text-muted-foreground">Nunca</div>
      return <div>{formatDate(date)}</div>
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
      const customer = row.original

      return (
        <DataTableActions
          actions={[
            {
              label: "Ver detalhes",
              icon: <Eye className="h-4 w-4" />,
              href: `/clientes/${customer.id}`,
            },
            {
              label: "Editar",
              icon: <FileEdit className="h-4 w-4" />,
              href: `/clientes/${customer.id}/editar`,
            },
            {
              label: "Excluir",
              icon: <Trash2 className="h-4 w-4" />,
              variant: "destructive",
              onClick: () => console.log(`Excluir cliente ${customer.id}`),
            },
          ]}
        />
      )
    },
  },
]

export default function CustomersPage() {
  return (
    <DashboardShell>
      <PageHeader heading="Clientes" text="Gerencie os clientes da sua empresa.">
        <PageHeaderAction href="/clientes/novo" icon={<Plus className="h-4 w-4" />}>
          Novo Cliente
        </PageHeaderAction>
      </PageHeader>

      <div className="mt-6">
        <DataTable columns={columns} data={customers} searchPlaceholder="Buscar clientes..." searchColumn="name" />
      </div>
    </DashboardShell>
  )
}

