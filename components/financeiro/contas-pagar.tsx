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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { ContaPagar, StatusFinanceiro } from "@/types/financeiro"
import { formatCurrency } from "@/lib/utils"
import { MoreHorizontal, Eye, Edit, Trash2, CheckCircle, Search } from "lucide-react"
import Link from "next/link"

// Dados simulados para demonstração
const contasPagarData: ContaPagar[] = [
  {
    id: "cp001",
    fornecedor: { id: "f001", nome: "Argila Mineira Ltda" },
    descricao: "Compra de Matéria Prima - NF #5678",
    valor: 8500,
    valorPago: 0,
    dataEmissao: new Date("2023-03-01"),
    dataVencimento: new Date("2023-03-20"),
    status: "pendente",
    categoria: "materia_prima",
    compraId: "comp5678",
  },
  {
    id: "cp002",
    fornecedor: { id: "f002", nome: "Energia Elétrica S.A." },
    descricao: "Fatura de Energia - Março/2023",
    valor: 12000,
    valorPago: 12000,
    dataEmissao: new Date("2023-03-05"),
    dataVencimento: new Date("2023-03-15"),
    dataPagamento: new Date("2023-03-15"),
    status: "pago",
    formaPagamento: "boleto",
    categoria: "utilidades",
  },
  {
    id: "cp003",
    fornecedor: { id: "f003", nome: "Transportadora Rápida" },
    descricao: "Serviço de Frete - NF #9012",
    valor: 3500,
    valorPago: 0,
    dataEmissao: new Date("2023-02-25"),
    dataVencimento: new Date("2023-03-10"),
    status: "atrasado",
    categoria: "logistica",
  },
  {
    id: "cp004",
    fornecedor: { id: "f004", nome: "Manutenção Industrial" },
    descricao: "Manutenção de Equipamentos - NF #3456",
    valor: 4800,
    valorPago: 2400,
    dataEmissao: new Date("2023-03-02"),
    dataVencimento: new Date("2023-03-17"),
    dataPagamento: new Date("2023-03-17"),
    status: "parcial",
    formaPagamento: "transferencia",
    categoria: "manutencao",
    numeroParcela: 1,
    totalParcelas: 2,
  },
  {
    id: "cp005",
    fornecedor: { id: "f005", nome: "Embalagens Premium" },
    descricao: "Caixas e Embalagens - NF #7890",
    valor: 5200,
    valorPago: 0,
    dataEmissao: new Date("2023-03-08"),
    dataVencimento: new Date("2023-03-23"),
    status: "pendente",
    categoria: "embalagens",
    compraId: "comp7890",
  },
]

export function ContasPagar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedConta, setSelectedConta] = useState<ContaPagar | null>(null)

  // Filtrar contas com base no termo de pesquisa
  const filteredContas = contasPagarData.filter(
    (conta) =>
      (conta.fornecedor?.nome.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      conta.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conta.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Função para abrir o diálogo de pagamento
  const handleOpenPagarDialog = (conta: ContaPagar) => {
    setSelectedConta(conta)
    setDialogOpen(true)
  }

  // Função para processar o pagamento
  const handleProcessarPagamento = () => {
    // Aqui seria implementada a lógica para processar o pagamento
    // com integração ao backend
    setDialogOpen(false)
    setSelectedConta(null)
  }

  // Função para renderizar o badge de status
  const renderStatusBadge = (status: StatusFinanceiro) => {
    const statusConfig = {
      pendente: { label: "Pendente", variant: "outline" as const },
      pago: { label: "Pago", variant: "success" as const },
      parcial: { label: "Parcial", variant: "warning" as const },
      atrasado: { label: "Atrasado", variant: "destructive" as const },
      cancelado: { label: "Cancelado", variant: "secondary" as const },
    }

    const config = statusConfig[status]

    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <>
      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar contas a pagar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Nenhuma conta a pagar encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredContas.map((conta) => (
                <TableRow key={conta.id}>
                  <TableCell className="font-medium">{conta.fornecedor?.nome || "N/A"}</TableCell>
                  <TableCell>{conta.descricao}</TableCell>
                  <TableCell>{formatCurrency(conta.valor)}</TableCell>
                  <TableCell>{new Date(conta.dataVencimento).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>{renderStatusBadge(conta.status)}</TableCell>
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
                          <Link href={`/financeiro/contas-pagar/${conta.id}`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Visualizar</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/financeiro/contas-pagar/${conta.id}/editar`} className="flex items-center">
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenPagarDialog(conta)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          <span>Pagar</span>
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

      {/* Diálogo para processar pagamento */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Registrar Pagamento</DialogTitle>
            <DialogDescription>Preencha os dados do pagamento para a conta selecionada.</DialogDescription>
          </DialogHeader>

          {selectedConta && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Fornecedor</p>
                <p className="text-sm">{selectedConta.fornecedor?.nome || "N/A"}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Descrição</p>
                <p className="text-sm">{selectedConta.descricao}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Valor Total</p>
                  <p className="text-sm">{formatCurrency(selectedConta.valor)}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Valor Pago</p>
                  <p className="text-sm">{formatCurrency(selectedConta.valorPago || 0)}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Valor a Pagar</p>
                <Input type="number" defaultValue={selectedConta.valor - (selectedConta.valorPago || 0)} />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Data do Pagamento</p>
                <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleProcessarPagamento}>Confirmar Pagamento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

