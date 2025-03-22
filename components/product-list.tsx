"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, PenLine, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { useNavigate, useParams, useLocation } from "react-router-dom"

type Product = {
  id: string
  name: string
  code: string
  category: string
  type: string
  color: string
  size: string
  price: number
  stock: number
  status: "active" | "inactive" | "low_stock"
}

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
  },
  {
    id: "6",
    name: "Ibá Médio",
    code: "IBM-006",
    category: "Ibás",
    type: "Barro",
    color: "Terracota",
    size: "Médio",
    price: 99.9,
    stock: 7,
    status: "active",
  },
  {
    id: "7",
    name: "Ibá Grande",
    code: "IBG-007",
    category: "Ibás",
    type: "Barro",
    color: "Terracota",
    size: "Grande",
    price: 149.9,
    stock: 0,
    status: "inactive",
  },
  {
    id: "8",
    name: "Alguidar Pequeno",
    code: "ALP-008",
    category: "Alguidar",
    type: "Barro",
    color: "Terracota",
    size: "Pequeno",
    price: 59.9,
    stock: 10,
    status: "active",
  },
  {
    id: "9",
    name: "Alguidar Médio",
    code: "ALM-009",
    category: "Alguidar",
    type: "Barro",
    color: "Terracota",
    size: "Médio",
    price: 89.9,
    stock: 6,
    status: "active",
  },
  {
    id: "10",
    name: "Alguidar Grande",
    code: "ALG-010",
    category: "Alguidar",
    type: "Barro",
    color: "Terracota",
    size: "Grande",
    price: 129.9,
    stock: 2,
    status: "low_stock",
  },
]

export function ProductList() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [productToDelete, setProductToDelete] = React.useState<Product | null>(null)
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()

  const navigateToProductDetail = (id: string) => {
    navigate(`/produtos/${id}`)
  }

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Produto",
      cell: ({ row }) => {
        const product = row.original
        return (
          <div
            className="flex items-center gap-3 cursor-pointer hover:text-primary"
            onClick={() => navigateToProductDetail(product.id)}
          >
            <Avatar className="h-9 w-9 rounded-sm">
              <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={product.name} />
              <AvatarFallback className="rounded-sm">{product.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{product.name}</span>
              <span className="text-xs text-muted-foreground">{product.code}</span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "category",
      header: "Categoria",
      cell: ({ row }) => <div>{row.getValue("category")}</div>,
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => <div>{row.getValue("type")}</div>,
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Preço
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const price = Number.parseFloat(row.getValue("price"))
        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price)
        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "stock",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Estoque
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-center">{row.getValue("stock")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string

        return (
          <Badge variant={status === "active" ? "default" : status === "low_stock" ? "warning" : "secondary"}>
            {status === "active" ? "Ativo" : status === "low_stock" ? "Estoque Baixo" : "Inativo"}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)}>Copiar ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PenLine className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  setProductToDelete(product)
                  setDeleteDialogOpen(true)
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigateToProductDetail(product.id)}>Ver Detalhes</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: products,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleDeleteProduct = () => {
    // Aqui seria implementada a lógica real de exclusão
    toast({
      title: "Produto excluído",
      description: `O produto "${productToDelete?.name}" foi excluído com sucesso.`,
    })
    setDeleteDialogOpen(false)
    setProductToDelete(null)
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar produtos..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuItem
                    key={column.id}
                    className="capitalize"
                    onClick={() => column.toggleVisibility(!column.getIsVisible())}
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={column.getIsVisible()}
                      onChange={() => column.toggleVisibility(!column.getIsVisible())}
                    />
                    {column.id === "name"
                      ? "Produto"
                      : column.id === "price"
                        ? "Preço"
                        : column.id === "stock"
                          ? "Estoque"
                          : column.id === "status"
                            ? "Status"
                            : column.id}
                  </DropdownMenuItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} produto(s) no total.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Próximo
          </Button>
        </div>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o produto "{productToDelete?.name}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

