import type { Status } from "./common"

export interface ProductionStage {
  id: number
  name: string
  status: Status
  progress: number
}

export interface ProductionMaterial {
  id: string
  name: string
  required: string
  consumed: string
  remaining: string
}

export interface ProductionTeamMember {
  id: string
  name: string
  role: string
  avatar: string
}

export interface ProductionNote {
  date: string
  author: string
  content: string
}

export interface ProductionQualityIssue {
  type: string
  count: number
}

export interface ProductionQuality {
  inspected: number
  passed: number
  rejected: number
  issues: ProductionQualityIssue[]
}

export interface ProductionOrder {
  id: string
  name: string
  description?: string
  startDate: string
  endDate: string
  status: Status
  progress: number
  assignedTo: string
  priority: "Low" | "Medium" | "High"
  materials: ProductionMaterial[]
  stages: ProductionStage[]
  team: ProductionTeamMember[]
  notes: ProductionNote[]
  quality: ProductionQuality
}

