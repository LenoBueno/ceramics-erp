"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search } from "lucide-react"

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

const clientes = [
  {
    id: "CLI-001",
    nome: "Construtora Horizonte Ltda",
    cidade: "São Paulo",
    estado: "SP",
    ultimaCompra: "15/03/2023",
    valorTotal: 145890.75,
    status: "ativo",
    categoria: "A",
  },
  {
    id: "CLI-002",
    nome: "Acabamentos Modernos S.A.",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    ultimaCompra: "10/03/2023",
    valorTotal: 98450.0,
    status: "ativo",
    categoria: "A",
  },
  {
    id: "CLI-003",
    nome: "Decorações Elegantes Ltda",
    cidade: "Belo Horizonte",
    estado: "MG",
    ultimaCompra: "05/01/2023",
    valorTotal: 45750.5,
    status: "inativo",
    categoria: "B",
  },
  {
    id: "CLI-004",
    nome: "Arquitetura Inovadora S.A.",
    cidade: "Curitiba",
    estado: "PR",
    ultimaCompra: "20/03/2023",
    valorTotal: 78900.25,
    status: "ativo",
    categoria: "B",
  },
  {
    id: "CLI-005",
    nome: "Reformas Express Ltda",
    cidade: "Salvador",
    estado: "BA",
    ultimaCompra: "18/03/2023",
    valorTotal: 56780.0,
    status: "ativo",
    categoria: "C",
  },
]

const statusMap = {
  ativo: { label: "Ativo", variant: "success" },
  inativo: { label: "Inativo", variant: "secondary" },
  novo: { label: "Novo", variant: "default" },
  bloqueado: { label: "Bloqueado", variant: "destructive" },
}

const categoriaMap = {
  A: { label: "A", variant: "default" },
  B: { label: "B", variant: "secondary" },
  C: { label: "C", variant: "outline" },
}

interface ListaClientesProps {
  filtroStatus?: string
}

export function ListaClientes({ filtroStatus }: ListaClientesProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClientes = clientes.filter(
    (cliente) =>
      (filtroStatus ? cliente.status === filtroStatus : true) &&
      (cliente.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.estado.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por ID, nome ou localização..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Categoria
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filtrar por Categoria</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Todas</DropdownMenuItem>
            <DropdownMenuItem>A</DropdownMenuItem>
            <DropdownMenuItem>B</DropdownMenuItem>
            <DropdownMenuItem>C</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button variant="ghost" className="p-0 font-medium">
                  ID
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Última Compra</TableHead>
              <TableHead className="text-right">Valor Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClientes.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell className="font-medium">{cliente.id}</TableCell>
                <TableCell>{cliente.nome}</TableCell>
                <TableCell>{`${cliente.cidade}/${cliente.estado}`}</TableCell>
                <TableCell>{cliente.ultimaCompra}</TableCell>
                <TableCell className="text-right">
                  {cliente.valorTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>
                  <Badge variant={statusMap[cliente.status].variant as any}>{statusMap[cliente.status].label}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={categoriaMap[cliente.categoria].variant as any}>
                    {categoriaMap[cliente.categoria].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href={`/clientes/${cliente.id}`}>Ver detalhes</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Editar cliente</DropdownMenuItem>
                      <DropdownMenuItem>Histórico de compras</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Criar pedido</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

