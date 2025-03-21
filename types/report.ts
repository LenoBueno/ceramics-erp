export interface ReportFilter {
  startDate: string
  endDate: string
  category?: string
  customer?: string
  supplier?: string
  product?: string
}

export interface SalesReportData {
  date: string
  revenue: number
  orders: number
  averageOrderValue: number
}

export interface ProductSalesReportData {
  productId: string
  productName: string
  quantity: number
  revenue: number
  profit: number
}

export interface CustomerSalesReportData {
  customerId: string
  customerName: string
  orders: number
  revenue: number
}

export interface InventoryReportData {
  productId: string
  productName: string
  currentStock: number
  minStock: number
  maxStock: number
  reorderPoint: number
  stockValue: number
}

export interface FinancialReportData {
  date: string
  income: number
  expenses: number
  profit: number
}

