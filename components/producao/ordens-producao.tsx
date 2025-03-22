"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
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

const ordens = [
  {
    id: "OP-2023-001",
    produto: "Porcelanato 60x60 Branco",
    quantidade: 1500,
    dataInicio: "15/03/2023",
    previsaoTermino: "22/03/2023",
    status: "concluida",
    prioridade: "normal",
  },
  {
    id: "OP-2023-002",
    produto: "Porcelanato 80x80 Mármore",
    quantidade: 1200,
    dataInicio: "18/03/2023",
    previsaoTermino: "26/03/2023",
    status: "producao",
    prioridade: "alta",
  },
  {
    id: "OP-2023-003",
    produto: "Revestimento 30x60 Bege",
    quantidade: 2000,
    dataInicio: "20/03/2023",
    previsaoTermino: "27/03/2023",
    status: "qualidade",
    prioridade: "normal",
  },
  {
    id: "OP-2023-004",
    produto: "Porcelanato 90x90 Cinza",
    quantidade: 800,
    dataInicio: "22/03/2023",
    previsaoTermino: "30/03/2023",
    status: "preparacao",
    prioridade: "baixa",
  },
  {
    id: "OP-2023-005",
    produto: "Revestimento 45x45 Azul",
    quantidade: 1800,
    dataInicio: "25/03/2023",
    previsaoTermino: "02/04/2023",
    status: "preparacao",
    prioridade: "normal",
  },
]

const statusMap = {
  preparacao: { label: "Em Preparação", color: "bg-yellow-500" },
  producao: { label: "Em Produção", color: "bg-blue-500" },
  qualidade: { label: "Controle de Qualidade", color: "bg-purple-500" },
  concluida: { label: "Concluída", color: "bg-green-500" },
  cancelada: { label: "Cancelada", color: "bg-red-500" },
}

const prioridadeMap = {
  baixa: { label: "Baixa", variant: "outline" },
  normal: { label: "Normal", variant: "secondary" },
  alta: { label: "Alta", variant: "destructive" },
}

export function OrdensProducao() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrdens = ordens.filter(
    (ordem) =>
      ordem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ordem.produto.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Ordens de Produção</CardTitle>
            <CardDescription>Gerencie todas as ordens de produção da sua indústria</CardDescription>
          </div>
          <Link to="/producao/nova-ordem">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Ordem
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
              placeholder="Buscar por ID ou produto..."
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
              <DropdownMenuItem>Em Preparação</DropdownMenuItem>
              <DropdownMenuItem>Em Produção</DropdownMenuItem>
              <DropdownMenuItem>Controle de Qualidade</DropdownMenuItem>
              <DropdownMenuItem>Concluída</DropdownMenuItem>
              <DropdownMenuItem>Cancelada</DropdownMenuItem>
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
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead>Data Início</TableHead>
                <TableHead>Previsão Término</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrdens.map((ordem) => (
                <TableRow key={ordem.id}>
                  <TableCell className="font-medium">{ordem.id}</TableCell>
                  <TableCell>{ordem.produto}</TableCell>
                  <TableCell className="text-right">{ordem.quantidade}</TableCell>
                  <TableCell>{ordem.dataInicio}</TableCell>
                  <TableCell>{ordem.previsaoTermino}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${statusMap[ordem.status].color}`} />
                      <span>{statusMap[ordem.status].label}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={prioridadeMap[ordem.prioridade].variant as any}>
                      {prioridadeMap[ordem.prioridade].label}
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
                          <Link to={`/producao/ordens/${ordem.id}`}>Ver detalhes</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Editar ordem</DropdownMenuItem>
                        <DropdownMenuItem>Atualizar status</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Cancelar ordem</DropdownMenuItem>
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

