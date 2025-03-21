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
import type { ContaReceber, StatusFinanceiro } from "@/types/financeiro"
import { formatCurrency } from "@/lib/utils"
import { MoreHorizontal, Eye, Edit, Trash2, CheckCircle, FileText, Search } from "lucide-react"
import Link from "next/link"

// Dados simulados para demonstração
const contasReceberData: ContaReceber[] = [
  {
    id: "cr001",
    cliente: { id: "c001", nome: "Construtora Silva Ltda" },
    descricao: "Venda de Revestimentos - Pedido #12345",
    valor: 12500,
    valorPago: 0,
    dataEmissao: new Date("2023-03-01"),
    dataVencimento: new Date("2023-03-15"),
    status: "pendente",
    categoria: "vendas",
    pedidoId: "ped12345",
  },
  {
    id: "cr002",
    cliente: { id: "c002", nome: "Arquitetura Moderna S.A." },
    descricao: "Pisos Cerâmicos - Pedido #12346",
    valor: 8750,
    valorPago: 8750,
    dataEmissao: new Date("2023-02-15"),
    dataVencimento: new Date("2023-03-01"),
    dataPagamento: new Date("2023-03-01"),
    status: "pago",
    formaPagamento: "pix",
    categoria: "vendas",
    pedidoId: "ped12346",
  },
  {
    id: "cr003",
    cliente: { id: "c003", nome: "Decorações Interiores Ltda" },
    descricao: "Azulejos Decorativos - Pedido #12347",
    valor: 5300,
    valorPago: 2650,
    dataEmissao: new Date("2023-02-20"),
    dataVencimento: new Date("2023-03-05"),
    dataPagamento: new Date("2023-03-05"),
    status: "parcial",
    formaPagamento: "boleto",
    categoria: "vendas",
    numeroParcela: 1,
    totalParcelas: 2,
    pedidoId: "ped12347",
  },
  {
    id: "cr004",
    cliente: { id: "c004", nome: "Empreiteira Construções Rápidas" },
    descricao: "Porcelanatos - Pedido #12348",
    valor: 15800,
    valorPago: 0,
    dataEmissao: new Date("2023-02-10"),
    dataVencimento: new Date("2023-02-25"),
    status: "atrasado",
    categoria: "vendas",
    pedidoId: "ped12348",
  },
  {
    id: "cr005",
    cliente: { id: "c005", nome: "Casa & Cia Materiais" },
    descricao: "Pastilhas de Vidro - Pedido #12349",
    valor: 7200,
    valorPago: 0,
    dataEmissao: new Date("2023-03-05"),
    dataVencimento: new Date("2023-03-20"),
    status: "pendente",
    categoria: "vendas",
    pedidoId: "ped12349",
  },
]

export function ContasReceber() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedConta, setSelectedConta] = useState<ContaReceber | null>(null)

  // Filtrar contas com base no termo de pesquisa
  const filteredContas = contasReceberData.filter(
    (conta) =>
      conta.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conta.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conta.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Função para abrir o diálogo de recebimento
  const handleOpenReceberDialog = (conta: ContaReceber) => {
    setSelectedConta(conta)
    setDialogOpen(true)
  }

  // Função para processar o recebimento
  const handleProcessarRecebimento = () => {
    // Aqui seria implementada a lógica para processar o recebimento
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
            placeholder="Buscar contas a receber..."
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
              <TableHead>Cliente</TableHead>
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
                  Nenhuma conta a receber encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredContas.map((conta) => (
                <TableRow key={conta.id}>
                  <TableCell className="font-medium">{conta.cliente.nome}</TableCell>
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
                          <Link href={`/financeiro/contas-receber/${conta.id}`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Visualizar</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/financeiro/contas-receber/${conta.id}/editar`} className="flex items-center">
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenReceberDialog(conta)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          <span>Receber</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Gerar Boleto</span>
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

      {/* Diálogo para processar recebimento */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Registrar Recebimento</DialogTitle>
            <DialogDescription>Preencha os dados do recebimento para a conta selecionada.</DialogDescription>
          </DialogHeader>

          {selectedConta && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Cliente</p>
                <p className="text-sm">{selectedConta.cliente.nome}</p>
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
                <p className="text-sm font-medium">Valor a Receber</p>
                <Input type="number" defaultValue={selectedConta.valor - (selectedConta.valorPago || 0)} />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Data do Recebimento</p>
                <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleProcessarRecebimento}>Confirmar Recebimento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

