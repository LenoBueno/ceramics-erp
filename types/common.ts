export type Status = "active" | "inactive" | "pending" | "completed" | "canceled" | "processing" | "delayed"

export interface Address {
  street: string
  number: string
  complement?: string
  district: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Contact {
  name: string
  email: string
  phone: string
  position?: string
}

export interface PaginationParams {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export interface FilterParams {
  search?: string
  status?: Status
  startDate?: string
  endDate?: string
  category?: string
}

