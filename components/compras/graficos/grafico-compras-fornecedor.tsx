"use client"

import { Cell, Legend, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Minerais Brasil Ltda", valor: 320000, valorFormatado: "R$ 320.000" },
  { name: "Química Industrial S.A.", valor: 180000, valorFormatado: "R$ 180.000" },
  { name: "Embalagens Seguras Ltda", valor: 120000, valorFormatado: "R$ 120.000" },
  { name: "Equipamentos Cerâmicos S.A.", valor: 240000, valorFormatado: "R$ 240.000" },
  { name: "Outros", valor: 140000, valorFormatado: "R$ 140.000" },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export function GraficoComprasFornecedor() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="valor"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => [props.payload.valorFormatado, name]}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

