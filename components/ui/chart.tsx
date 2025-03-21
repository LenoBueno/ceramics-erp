"use client"
import {
  Area as RechartsArea,
  AreaChart as RechartsAreaChart,
  Bar as RechartsBar,
  BarChart as RechartsBarChart,
  CartesianGrid as RechartsCartesianGrid,
  Cell as RechartsCell,
  Legend as RechartsLegend,
  Pie as RechartsPie,
  PieChart as RechartsPieChart,
  ResponsiveContainer as RechartsResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
} from "recharts"

// Exportando os componentes do Recharts com os nomes simplificados
export const Cell = RechartsCell
export const Legend = RechartsLegend
export const Pie = RechartsPie
export const PieChart = RechartsPieChart
export const ResponsiveContainer = RechartsResponsiveContainer
export const Tooltip = RechartsTooltip
export const Area = RechartsArea
export const AreaChart = RechartsAreaChart
export const CartesianGrid = RechartsCartesianGrid
export const XAxis = RechartsXAxis
export const YAxis = RechartsYAxis
export const Bar = RechartsBar
export const BarChart = RechartsBarChart

// Re-exportando para garantir compatibilidade
export {
  RechartsArea,
  RechartsAreaChart,
  RechartsBar,
  RechartsBarChart,
  RechartsCartesianGrid,
  RechartsCell,
  RechartsLegend,
  RechartsPie,
  RechartsPieChart,
  RechartsResponsiveContainer,
  RechartsTooltip,
  RechartsXAxis,
  RechartsYAxis,
}

