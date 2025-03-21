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
  { name: "Out", valor: 720000, valorFormatado: "R$ 720.000" },
  { name: "Nov", valor: 680000, valorFormatado: "R$ 680.000" },
  { name: "Dez", valor: 750000, valorFormatado: "R$ 750.000" },
  { name: "Jan", valor: 820000, valorFormatado: "R$ 820.000" },
  { name: "Fev", valor: 790000, valorFormatado: "R$ 790.000" },
  { name: "Mar", valor: 876000, valorFormatado: "R$ 876.000" },
]

export function GraficoComprasMensais() {
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
            formatter={(value, name, props) => [props.payload.valorFormatado, name]}
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
            name="Valor de Compras"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.2}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}

