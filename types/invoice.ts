export type InvoiceStatus = "authorized" | "processing" | "rejected" | "canceled"

export interface InvoiceData {
  id: string
  number: string
  series: string
  date: string
  customer: string
  cnpj: string
  value: number
  status: InvoiceStatus
  accessKey: string
}

export interface InvoiceItem {
  id: number
  code: string
  description: string
  ncm: string
  quantity: number
  unitPrice: number
  total: number
}

export interface InvoiceStatusConfig {
  label: string
  className: string
}

export interface InvoiceTax {
  icms?: number
  ipi?: number
  pis?: number
  cofins?: number
  iss?: number
}

export interface InvoiceItemWithTax extends InvoiceItem {
  tax: InvoiceTax
}

export interface InvoiceTotals {
  products: number
  services: number
  shipping: number
  subtotal: number
  tax: InvoiceTax
  total: number
}

export interface InvoicePayment {
  method: string
  indicator: string
}

export interface InvoiceTransport {
  mode: string
  vehicle: string
}

export interface InvoiceDetail extends InvoiceData {
  address: string
  authDate: string
  authProtocol: string
  items: InvoiceItemWithTax[]
  totals: InvoiceTotals
  payment: InvoicePayment
  transport: InvoiceTransport
  additionalInfo: string
  fiscalInfo: string
}

