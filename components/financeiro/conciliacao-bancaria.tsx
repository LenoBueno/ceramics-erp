"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TransacaoBancaria, TipoMovimentacao } from "@/types/financeiro"
import { formatCurrency } from "@/lib/utils"
import { MoreHorizontal, ArrowUpCircle, ArrowDownCircle, Search, CheckCircle, LinkIcon } from "lucide-react"
import Link from "next/link"

// Dados simulados para demonstração
const transacoesData: TransacaoBancaria[] = [
  {
    id: "tr001",
    data: new Date("2023-03-15"),
    valor: 12500,
    descricao: "TED RECEBIDA - CONSTRUTORA SILVA LTDA",
    tipo: "entrada",
    contaFinanceiraId: "cf001",
    conciliado: false,
    dataImportacao: new Date("2023-03-16"),
  },
  {
    id: "tr002",
    data: new Date("2023-03-15"),
    valor: 12000,
    descricao: "PAGAMENTO DE BOLETO - ENERGIA ELETRICA SA",
    tipo: "saida",
    contaFinanceiraId: "cf001",
    conciliado: true,
    dataImportacao: new Date("2023-03-16"),
    movimentacaoId: "mov002",
  },
  {
    id: "tr003",
    data: new Date("2023-03-14"),
    valor: 8750,
    descricao: "PIX RECEBIDO - ARQUITETURA MODERNA SA",
    tipo: "entrada",
    contaFinanceiraId: "cf001",
    conciliado: true,
    dataImportacao: new Date("2023-03-16"),
    movimentacaoId: "mov003",
  },
  {
    id: "tr004",
    data: new Date("2023-03-13"),
    valor: 2400,
    descricao: "TED ENVIADA - MANUTENCAO INDUSTRIAL",
    tipo: "saida",
    contaFinanceiraId: "cf001",
    conciliado: true,
    dataImportacao: new Date("2023-03-16"),
    movimentacaoId: "mov004",
  },
  {
    id: "tr005",
    data: new Date("2023-03-12"),
    valor: 2650,
    descricao: "BOLETO RECEBIDO - DECORACOES INTERIORES LTDA",
    tipo: "entrada",
    contaFinanceiraId: "cf001",
    conciliado: false,
    dataImportacao: new Date("2023-03-16"),
  },
]

export function ConciliacaoBancaria() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")
  const [selectedTransacoes, setSelectedTransacoes] = useState<string[]>([])

  // Filtrar transações com base no termo de pesquisa e status
  const filteredTransacoes = transacoesData.filter((tr) => {
    const matchesSearch =
      tr.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tr.id.toLowerCase().includes(searchTerm.toLowerCase())

    if (filtroStatus === "todos") return matchesSearch
    if (filtroStatus === "conciliados") return matchesSearch && tr.conciliado
    if (filtroStatus === "pendentes") return matchesSearch && !tr.conciliado

    return matchesSearch
  })

  // Função para renderizar o ícone de tipo de transação
  const renderTipoIcon = (tipo: TipoMovimentacao) => {
    return tipo === "entrada" ? (
      <ArrowUpCircle className="h-5 w-5 text-emerald-500" />
    ) : (
      <ArrowDownCircle className="h-5 w-5 text-rose-500" />
    )
  }

  // Função para alternar a seleção de uma transação
  const toggleTransacaoSelection = (id: string) => {
    setSelectedTransacoes((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  // Função para conciliar transações selecionadas
  const conciliarTransacoesSelecionadas = () => {
    // Aqui seria implementada a lógica para conciliar as transações
    // com integração ao backend
    alert(`Conciliando ${selectedTransacoes.length} transações`)
    setSelectedTransacoes([])
  }

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar transações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="conciliados">Conciliados</SelectItem>
              <SelectItem value="pendentes">Pendentes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedTransacoes.length > 0 && (
          <Button onClick={conciliarTransacoesSelecionadas}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Conciliar Selecionados ({selectedTransacoes.length})
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    filteredTransacoes.length > 0 &&
                    selectedTransacoes.length === filteredTransacoes.filter((tr) => !tr.conciliado).length
                  }
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedTransacoes(filteredTransacoes.filter((tr) => !tr.conciliado).map((tr) => tr.id))
                    } else {
                      setSelectedTransacoes([])
                    }
                  }}
                />
              </TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransacoes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nenhuma transação encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredTransacoes.map((tr) => (
                <TableRow key={tr.id} className={tr.conciliado ? "bg-muted/30" : ""}>
                  <TableCell>
                    {!tr.conciliado && (
                      <Checkbox
                        checked={selectedTransacoes.includes(tr.id)}
                        onCheckedChange={() => toggleTransacaoSelection(tr.id)}
                      />
                    )}
                  </TableCell>
                  <TableCell>{new Date(tr.data).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {renderTipoIcon(tr.tipo)}
                      <span className="ml-2 capitalize">{tr.tipo === "entrada" ? "Entrada" : "Saída"}</span>
                    </div>
                  </TableCell>
                  <TableCell>{tr.descricao}</TableCell>
                  <TableCell className={tr.tipo === "entrada" ? "text-emerald-600" : "text-rose-600"}>
                    {formatCurrency(tr.valor)}
                  </TableCell>
                  <TableCell>
                    {tr.conciliado ? (
                      <div className="flex items-center text-emerald-600">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        <span>Conciliado</span>
                      </div>
                    ) : (
                      <span className="text-amber-600">Pendente</span>
                    )}
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
                        {tr.conciliado ? (
                          <DropdownMenuItem>
                            <Link href={`/financeiro/fluxo-caixa/${tr.movimentacaoId}`} className="flex items-center">
                              <LinkIcon className="mr-2 h-4 w-4" />
                              <span>Ver Movimentação</span>
                            </Link>
                          </DropdownMenuItem>
                        ) : (
                          <>
                            <DropdownMenuItem onClick={() => toggleTransacaoSelection(tr.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              <span>Conciliar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href="/financeiro/fluxo-caixa/novo" className="flex items-center">
                                <LinkIcon className="mr-2 h-4 w-4" />
                                <span>Criar Movimentação</span>
                              </Link>
                            </DropdownMenuItem>
                          </>
                        )}
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

