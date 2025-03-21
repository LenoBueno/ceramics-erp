"use client"

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

const data = [
  {
    name: "01/03",
    entradas: 45,
    saidas: 32,
  },
  {
    name: "05/03",
    entradas: 38,
    saidas: 42,
  },
  {
    name: "10/03",
    entradas: 52,
    saidas: 35,
  },
  {
    name: "15/03",
    entradas: 30,
    saidas: 45,
  },
  {
    name: "20/03",
    entradas: 48,
    saidas: 38,
  },
  {
    name: "25/03",
    entradas: 55,
    saidas: 49,
  },
  {
    name: "30/03",
    entradas: 42,
    saidas: 46,
  },
]

export function GraficoMovimentacoes() {
  return (
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
            formatter={(value) => `${value} unidades`}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Legend />
          <Bar dataKey="entradas" name="Entradas" fill="#16a34a" />
          <Bar dataKey="saidas" name="Saídas" fill="#dc2626" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

