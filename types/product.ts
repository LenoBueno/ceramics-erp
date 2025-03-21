export interface Product {
  id: string
  name: string
  code: string
  category: string
  type: string
  color: string
  size: string
  price: number
  stock: number
  status: ProductStatus
  dimensions?: string
  weight?: string
  createdAt: string
  updatedAt: string
  supplier?: string
  minStock?: number
  maxStock?: number
  reorderPoint?: number
  location?: string
  salesLast30Days?: number
  costPrice?: number
  profitMargin?: string
}

export type ProductStatus = "active" | "inactive" | "low_stock" | "out_of_stock"

