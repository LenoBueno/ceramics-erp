import type { Status } from "./common"

export interface InventoryAdjustment {
  id: string
  productId: string
  productName: string
  productCode: string
  previousQuantity: number
  newQuantity: number
  difference: number
  reason: string
  date: string
  performedBy: string
  notes?: string
}

export interface InventoryCount {
  id: string
  date: string
  status: Status
  items: InventoryCountItem[]
  notes?: string
  performedBy: string
  createdAt: string
  updatedAt: string
}

export interface InventoryCountItem {
  id: string
  productId: string
  productName: string
  productCode: string
  expectedQuantity: number
  actualQuantity: number
  difference: number
  notes?: string
}

export interface InventoryTransfer {
  id: string
  date: string
  status: Status
  fromLocation: string
  toLocation: string
  items: InventoryTransferItem[]
  notes?: string
  performedBy: string
  createdAt: string
  updatedAt: string
}

export interface InventoryTransferItem {
  id: string
  productId: string
  productName: string
  productCode: string
  quantity: number
  notes?: string
}

