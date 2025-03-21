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
    name: "Construtora Horizonte",
    valor: 145890,
  },
  {
    name: "Acabamentos Modernos",
    valor: 98450,
  },
  {
    name: "Arquitetura Inovadora",
    valor: 78900,
  },
  {
    name: "Reformas Express",
    valor: 56780,
  },
  {
    name: "Decorações Elegantes",
    valor: 45750,
  },
]

export function GraficoVendasCliente() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={150} />
          <Tooltip
            formatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Legend />
          <Bar dataKey="valor" name="Valor de Compras" fill="#2563eb" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

