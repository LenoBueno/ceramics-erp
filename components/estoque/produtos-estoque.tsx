"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, ChevronDown, MoreHorizontal, PackagePlus, Search } from "lucide-react"

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

const produtos = [
  {
    id: "PRD-001",
    nome: "Porcelanato 60x60 Branco",
    categoria: "Porcelanato",
    quantidade: 1250,
    minimo: 500,
    maximo: 2000,
    valorUnitario: 45.9,
    status: "normal",
    localizacao: "A-01-01",
  },
  {
    id: "PRD-002",
    nome: "Porcelanato 80x80 Mármore",
    categoria: "Porcelanato",
    quantidade: 850,
    minimo: 400,
    maximo: 1500,
    valorUnitario: 89.9,
    status: "normal",
    localizacao: "A-01-02",
  },
  {
    id: "PRD-003",
    nome: "Revestimento 30x60 Bege",
    categoria: "Revestimento",
    quantidade: 320,
    minimo: 350,
    maximo: 1200,
    valorUnitario: 32.5,
    status: "baixo",
    localizacao: "B-02-01",
  },
  {
    id: "PRD-004",
    nome: "Porcelanato 90x90 Cinza",
    categoria: "Porcelanato",
    quantidade: 1800,
    minimo: 600,
    maximo: 1600,
    valorUnitario: 120.8,
    status: "excedente",
    localizacao: "A-02-01",
  },
  {
    id: "PRD-005",
    nome: "Revestimento 45x45 Azul",
    categoria: "Revestimento",
    quantidade: 950,
    minimo: 400,
    maximo: 1400,
    valorUnitario: 28.9,
    status: "normal",
    localizacao: "B-01-02",
  },
]

const statusMap = {
  baixo: { label: "Estoque Baixo", variant: "destructive" },
  normal: { label: "Normal", variant: "secondary" },
  excedente: { label: "Excedente", variant: "warning" },
}

export function ProdutosEstoque() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProdutos = produtos.filter(
    (produto) =>
      produto.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.categoria.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Produtos em Estoque</CardTitle>
            <CardDescription>Gerencie todos os produtos disponíveis no estoque</CardDescription>
          </div>
          <Link href="/estoque/produtos/novo">
            <Button>
              <PackagePlus className="mr-2 h-4 w-4" />
              Novo Produto
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
              placeholder="Buscar por ID, nome ou categoria..."
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
              <DropdownMenuItem>Porcelanato</DropdownMenuItem>
              <DropdownMenuItem>Revestimento</DropdownMenuItem>
              <DropdownMenuItem>Piso</DropdownMenuItem>
              <DropdownMenuItem>Pastilha</DropdownMenuItem>
              <DropdownMenuItem>Louça</DropdownMenuItem>
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
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Valor Unit.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProdutos.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell className="font-medium">{produto.id}</TableCell>
                  <TableCell>{produto.nome}</TableCell>
                  <TableCell>{produto.categoria}</TableCell>
                  <TableCell className="text-right">{produto.quantidade}</TableCell>
                  <TableCell className="text-right">
                    {produto.valorUnitario.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusMap[produto.status].variant as any}>{statusMap[produto.status].label}</Badge>
                  </TableCell>
                  <TableCell>{produto.localizacao}</TableCell>
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
                          <Link href={`/estoque/produtos/${produto.id}`}>Ver detalhes</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Editar produto</DropdownMenuItem>
                        <DropdownMenuItem>Ajustar estoque</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Movimentar</DropdownMenuItem>
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

