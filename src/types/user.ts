export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user" | "manager"
  avatar?: string
  createdAt: string
  updatedAt: string
}

