import type { InvoiceStatus, InvoiceStatusConfig } from "@/types/invoice"

/**
 * Retorna a configuração de exibição para um status de nota fiscal
 */
export function getInvoiceStatusConfig(status: InvoiceStatus): InvoiceStatusConfig {
  switch (status) {
    case "authorized":
      return {
        label: "Autorizada",
        className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
      }
    case "processing":
      return {
        label: "Processando",
        className: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
      }
    case "rejected":
      return {
        label: "Rejeitada",
        className: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
      }
    case "canceled":
      return {
        label: "Cancelada",
        className: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
      }
    default:
      return {
        label: status.charAt(0).toUpperCase() + status.slice(1),
        className: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
      }
  }
}

/**
 * Calcula os totais de uma nota fiscal com base nos itens
 */
export function calculateInvoiceTotals(items: { quantity: number; unitPrice: number; total: number }[]) {
  const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0)
  const tax = subtotal * 0.18 // Taxa de exemplo (18%)
  const total = subtotal + tax

  return { subtotal, tax, total }
}

/**
 * Formata um valor monetário para exibição
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

