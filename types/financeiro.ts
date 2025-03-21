export type StatusFinanceiro = "pendente" | "pago" | "parcial" | "atrasado" | "cancelado"

export type FormaPagamento =
  | "dinheiro"
  | "cartao_credito"
  | "cartao_debito"
  | "boleto"
  | "pix"
  | "transferencia"
  | "cheque"

export type TipoMovimentacao = "entrada" | "saida"

export type CategoriaFinanceira = {
  id: string
  nome: string
  tipo: TipoMovimentacao
  descricao?: string
}

export type ContaFinanceira = {
  id: string
  nome: string
  tipo: "banco" | "caixa" | "carteira"
  saldo: number
  banco?: string
  agencia?: string
  conta?: string
  ativo: boolean
}

export type ContaReceber = {
  id: string
  cliente: {
    id: string
    nome: string
  }
  descricao: string
  valor: number
  valorPago?: number
  dataEmissao: Date
  dataVencimento: Date
  dataPagamento?: Date
  status: StatusFinanceiro
  formaPagamento?: FormaPagamento
  categoria: string
  numeroParcela?: number
  totalParcelas?: number
  observacao?: string
  pedidoId?: string
  contaFinanceiraId?: string
}

export type ContaPagar = {
  id: string
  fornecedor?: {
    id: string
    nome: string
  }
  descricao: string
  valor: number
  valorPago?: number
  dataEmissao: Date
  dataVencimento: Date
  dataPagamento?: Date
  status: StatusFinanceiro
  formaPagamento?: FormaPagamento
  categoria: string
  numeroParcela?: number
  totalParcelas?: number
  observacao?: string
  compraId?: string
  contaFinanceiraId?: string
}

export type MovimentacaoCaixa = {
  id: string
  data: Date
  tipo: TipoMovimentacao
  valor: number
  descricao: string
  categoria: string
  contaFinanceiraId: string
  contaFinanceira: string
  documentoReferencia?: string
  tipoReferencia?: "conta_pagar" | "conta_receber" | "manual"
  referenciaId?: string
  responsavel: string
}

export type TransacaoBancaria = {
  id: string
  data: Date
  valor: number
  descricao: string
  tipo: TipoMovimentacao
  contaFinanceiraId: string
  conciliado: boolean
  dataImportacao: Date
  movimentacaoId?: string
}

export type ResumoFinanceiro = {
  saldoAtual: number
  contasReceberTotal: number
  contasPagarTotal: number
  recebimentosHoje: number
  pagamentosHoje: number
  contasAtrasadas: number
  previsaoSaldo: number
}

