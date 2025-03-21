"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

const pedidos = [
  {
    id: "PC-2023-001",
    fornecedor: "Minerais Brasil Ltda",
    dataPedido: "10/03/2023",
    dataEntrega: "25/03/2023",
    valor: 45890.75,
    status: "concluido",
    prioridade: "normal",
  },
  {
    id: "PC-2023-002",
    fornecedor: "Química Industrial S.A.",
    dataPedido: "12/03/2023",
    dataEntrega: "28/03/2023",
    valor: 32450.0,
    status: "transito",
    prioridade: "alta",
  },
  {
    id: "PC-2023-003",
    fornecedor: "Embalagens Seguras Ltda",
    dataPedido: "15/03/2023",
    dataEntrega: "30/03/2023",
    valor: 18750.5,
    status: "aprovado",
    prioridade: "normal",
  },
  {
    id: "PC-2023-004",
    fornecedor: "Equipamentos Cerâmicos S.A.",
    dataPedido: "18/03/2023",
    dataEntrega: "10/04/2023",
    valor: 124500.0,
    status: "aberto",
    prioridade: "alta",
  },
  {
    id: "PC-2023-005",
    fornecedor: "Transportadora Rápida Ltda",
    dataPedido: "20/03/2023",
    dataEntrega: "05/04/2023",
    valor: 8750.25,
    status: "aberto",
    prioridade: "baixa",
  },
]

const statusMap = {
  aberto: { label: "Em Aberto", color: "bg-yellow-500" },
  aprovado: { label: "Aprovado", color: "bg-blue-500" },
  transito: { label: "Em Trânsito", color: "bg-purple-500" },
  concluido: { label: "Concluído", color: "bg-green-500" },
  cancelado: { label: "Cancelado", color: "bg-red-500" },
}

const prioridadeMap = {
  baixa: { label: "Baixa", variant: "outline" },
  normal: { label: "Normal", variant: "secondary" },
  alta: { label: "Alta", variant: "destructive" },
}

export function PedidosCompra() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPedidos = pedidos.filter(
    (pedido) =>
      pedido.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Pedidos de Compra</CardTitle>
            <CardDescription>Gerencie todos os pedidos de compra da sua empresa</CardDescription>
          </div>
          <Link href="/compras/novo-pedido">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Pedido
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por ID ou fornecedor..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Status
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filtrar por Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Todos</DropdownMenuItem>
              <DropdownMenuItem>Em Aberto</DropdownMenuItem>
              <DropdownMenuItem>Aprovado</DropdownMenuItem>
              <DropdownMenuItem>Em Trânsito</DropdownMenuItem>
              <DropdownMenuItem>Concluído</DropdownMenuItem>
              <DropdownMenuItem>Cancelado</DropdownMenuItem>
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
                <TableHead>Fornecedor</TableHead>
                <TableHead>Data Pedido</TableHead>
                <TableHead>Data Entrega</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPedidos.map((pedido) => (
                <TableRow key={pedido.id}>
                  <TableCell className="font-medium">{pedido.id}</TableCell>
                  <TableCell>{pedido.fornecedor}</TableCell>
                  <TableCell>{pedido.dataPedido}</TableCell>
                  <TableCell>{pedido.dataEntrega}</TableCell>
                  <TableCell className="text-right">
                    {pedido.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${statusMap[pedido.status].color}`} />
                      <span>{statusMap[pedido.status].label}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={prioridadeMap[pedido.prioridade].variant as any}>
                      {prioridadeMap[pedido.prioridade].label}
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
                          <Link href={`/compras/pedidos/${pedido.id}`}>Ver detalhes</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Editar pedido</DropdownMenuItem>
                        <DropdownMenuItem>Atualizar status</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Cancelar pedido</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

