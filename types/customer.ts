export interface Customer {
  id: string
  name: string
  document: string
  email: string
  phone: string
  address: {
    street: string
    number: string
    complement?: string
    district: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  status: CustomerStatus
  type: "person" | "company"
  createdAt: string
  updatedAt: string
  notes?: string
  totalOrders?: number
  totalSpent?: number
  lastOrderDate?: string
}

export type CustomerStatus = "active" | "inactive"

