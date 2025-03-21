import type { Status } from "./common"

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productCode: string
  quantity: number
  unitPrice: number
  discount?: number
  total: number
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  date: string
  status: Status
  items: OrderItem[]
  subtotal: number
  discount?: number
  shipping?: number
  tax?: number
  total: number
  paymentMethod: string
  paymentStatus: Status
  shippingMethod: string
  estimatedDelivery?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

