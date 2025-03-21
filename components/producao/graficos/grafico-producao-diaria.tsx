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
  { name: "01/03", producao: 420 },
  { name: "02/03", producao: 450 },
  { name: "03/03", producao: 480 },
  { name: "04/03", producao: 460 },
  { name: "05/03", producao: 470 },
  { name: "06/03", producao: 490 },
  { name: "07/03", producao: 510 },
  { name: "08/03", producao: 520 },
  { name: "09/03", producao: 500 },
  { name: "10/03", producao: 480 },
  { name: "11/03", producao: 490 },
  { name: "12/03", producao: 510 },
  { name: "13/03", producao: 530 },
  { name: "14/03", producao: 540 },
]

export function GraficoProducaoDiaria() {
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
            formatter={(value) => `${value} unidades`}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="producao"
            name="Produção Diária"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.2}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}

