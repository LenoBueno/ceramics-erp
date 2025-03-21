export interface PurchaseItem {
  id: string
  productId: string
  productName: string
  productCode: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Purchase {
  id: string
  supplierId: string
  supplierName: string
  date: string
  status: PurchaseStatus
  items: PurchaseItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  paymentMethod: string
  paymentStatus: PaymentStatus
  deliveryDate?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export type PurchaseStatus = "pending" | "processing" | "completed" | "delivered" | "canceled"
export type PaymentStatus = "pending" | "processing" | "completed" | "canceled"

