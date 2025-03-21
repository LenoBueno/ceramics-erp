"use client"

import { useState } from "react"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const data = [
  {
    name: "Jan",
    vendas: 32500,
    producao: 28900,
    custos: 21400,
  },
  {
    name: "Fev",
    vendas: 34200,
    producao: 32100,
    custos: 22800,
  },
  {
    name: "Mar",
    vendas: 38700,
    producao: 36500,
    custos: 25600,
  },
  {
    name: "Abr",
    vendas: 36900,
    producao: 34800,
    custos: 24300,
  },
  {
    name: "Mai",
    vendas: 42100,
    producao: 39600,
    custos: 27500,
  },
  {
    name: "Jun",
    vendas: 45200,
    producao: 42300,
    custos: 29800,
  },
]

export function DashboardChart() {
  const [period, setPeriod] = useState("6m")

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Último mês</SelectItem>
            <SelectItem value="3m">Últimos 3 meses</SelectItem>
            <SelectItem value="6m">Últimos 6 meses</SelectItem>
            <SelectItem value="1y">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={function(value) { return `R$ ${value.toLocaleString("pt-BR")}` }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Bar dataKey="vendas" name="Vendas" fill="#2563eb" />
            <Bar dataKey="producao" name="Produção" fill="#16a34a" />
            <Bar dataKey="custos" name="Custos" fill="#dc2626" />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

