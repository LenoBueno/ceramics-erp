"use client"

import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  { name: "Out", valor: 980000 },
  { name: "Nov", valor: 1050000 },
  { name: "Dez", valor: 1120000 },
  { name: "Jan", valor: 1180000 },
  { name: "Fev", valor: 1210000 },
  { name: "Mar", valor: 1245000 },
]

export function GraficoValorEstoque() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart
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
            formatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="valor"
            name="Valor do Estoque"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.2}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}

