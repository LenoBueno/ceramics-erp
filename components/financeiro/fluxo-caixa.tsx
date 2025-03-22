"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import type { MovimentacaoCaixa, TipoMovimentacao } from "@/types/financeiro"
import { formatCurrency } from "@/lib/utils"
import { MoreHorizontal, Eye, Edit, Trash2, ArrowUpCircle, ArrowDownCircle, Search } from "lucide-react"
import { Link } from "react-router-dom"

// Dados simulados para demonstração
const movimentacoesData: MovimentacaoCaixa[] = [
  {
    id: "mov001",
    data: new Date("2023-03-15"),
    tipo: "entrada",
    valor: 12500,
    descricao: "Recebimento - Construtora Silva Ltda",
    categoria: "vendas",
    contaFinanceiraId: "cf001",
    contaFinanceira: "Conta Principal",
    documentoReferencia: "CR001",
    tipoReferencia: "conta_receber",
    referenciaId: "cr001",
    responsavel: "João Silva",
  },
  {
    id: "mov002",
    data: new Date("2023-03-15"),
    tipo: "saida",
    valor: 12000,
    descricao: "Pagamento - Energia Elétrica S.A.",
    categoria: "utilidades",
    contaFinanceiraId: "cf001",
    contaFinanceira: "Conta Principal",
    documentoReferencia: "CP002",
    tipoReferencia: "conta_pagar",
    referenciaId: "cp002",
    responsavel: "Maria Oliveira",
  },
  {
    id: "mov003",
    data: new Date("2023-03-14"),
    tipo: "entrada",
    valor: 8750,
    descricao: "Recebimento - Arquitetura Moderna S.A.",
    categoria: "vendas",
    contaFinanceiraId: "cf001",
    contaFinanceira: "Conta Principal",
    documentoReferencia: "CR002",
    tipoReferencia: "conta_receber",
    referenciaId: "cr002",
    responsavel: "João Silva",
  },
  {
    id: "mov004",
    data: new Date("2023-03-13"),
    tipo: "saida",
    valor: 2400,
    descricao: "Pagamento Parcial - Manutenção Industrial",
    categoria: "manutencao",
    contaFinanceiraId: "cf001",
    contaFinanceira: "Conta Principal",
    documentoReferencia: "CP004",
    tipoReferencia: "conta_pagar",
    referenciaId: "cp004",
    responsavel: "Maria Oliveira",
  },
  {
    id: "mov005",
    data: new Date("2023-03-12"),
    tipo: "entrada",
    valor: 2650,
    descricao: "Recebimento Parcial - Decorações Interiores Ltda",
    categoria: "vendas",
    contaFinanceiraId: "cf001",
    contaFinanceira: "Conta Principal",
    documentoReferencia: "CR003",
    tipoReferencia: "conta_receber",
    referenciaId: "cr003",
    responsavel: "João Silva",
  },
]

export function FluxoCaixa() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar movimentações com base no termo de pesquisa
  const filteredMovimentacoes = movimentacoesData.filter(
    (mov) =>
      mov.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mov.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mov.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Função para renderizar o ícone de tipo de movimentação
  const renderTipoIcon = (tipo: TipoMovimentacao) => {
    return tipo === "entrada" ? (
      <ArrowUpCircle className="h-5 w-5 text-emerald-500" />
    ) : (
      <ArrowDownCircle className="h-5 w-5 text-rose-500" />
    )
  }

  // Calcular saldo total
  const saldoTotal = movimentacoesData.reduce((acc, mov) => {
    return mov.tipo === "entrada" ? acc + mov.valor : acc - mov.valor
  }, 0)

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar movimentações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="font-medium">Saldo Total:</span>{" "}
            <span className={saldoTotal >= 0 ? "text-emerald-600" : "text-rose-600"}>{formatCurrency(saldoTotal)}</span>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Conta</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMovimentacoes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nenhuma movimentação encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredMovimentacoes.map((mov) => (
                <TableRow key={mov.id}>
                  <TableCell>{new Date(mov.data).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {renderTipoIcon(mov.tipo)}
                      <span className="ml-2 capitalize">{mov.tipo === "entrada" ? "Entrada" : "Saída"}</span>
                    </div>
                  </TableCell>
                  <TableCell>{mov.descricao}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {mov.categoria.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>{mov.contaFinanceira}</TableCell>
                  <TableCell className={mov.tipo === "entrada" ? "text-emerald-600" : "text-rose-600"}>
                    {formatCurrency(mov.valor)}
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
                          <Link to={`/financeiro/fluxo-caixa/${mov.id}`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Visualizar</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to={`/financeiro/fluxo-caixa/${mov.id}/editar`} className="flex items-center">
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Excluir</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

