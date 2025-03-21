export interface Supplier {
  id: string
  name: string
  document: string
  stateRegistration?: string
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
  contacts: {
    name: string
    email: string
    phone: string
    position?: string
  }[]
  status: SupplierStatus
  createdAt: string
  updatedAt: string
  paymentTerms?: string
  deliveryTime?: number
  minOrderValue?: number
  notes?: string
  categories: string[]
  rating?: number
  lastPurchaseDate?: string
}

export type SupplierStatus = "active" | "inactive"

