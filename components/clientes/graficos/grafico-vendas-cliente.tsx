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
    valorFormatado: "R$ 145.890"
  },
  {
    name: "Acabamentos Modernos",
    valor: 98450,
    valorFormatado: "R$ 98.450"
  },
  {
    name: "Arquitetura Inovadora",
    valor: 78900,
    valorFormatado: "R$ 78.900"
  },
  {
    name: "Reformas Express",
    valor: 56780,
    valorFormatado: "R$ 56.780"
  },
  {
    name: "Decorações Elegantes",
    valor: 45750,
    valorFormatado: "R$ 45.750"
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
            formatter={(value, name, props) => [props.payload.valorFormatado, name]}
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

