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
  { name: "01/03", producao: 420, producaoFormatada: "420 unidades" },
  { name: "02/03", producao: 450, producaoFormatada: "450 unidades" },
  { name: "03/03", producao: 480, producaoFormatada: "480 unidades" },
  { name: "04/03", producao: 460, producaoFormatada: "460 unidades" },
  { name: "05/03", producao: 470, producaoFormatada: "470 unidades" },
  { name: "06/03", producao: 490, producaoFormatada: "490 unidades" },
  { name: "07/03", producao: 510, producaoFormatada: "510 unidades" },
  { name: "08/03", producao: 520, producaoFormatada: "520 unidades" },
  { name: "09/03", producao: 500, producaoFormatada: "500 unidades" },
  { name: "10/03", producao: 480, producaoFormatada: "480 unidades" },
  { name: "11/03", producao: 490, producaoFormatada: "490 unidades" },
  { name: "12/03", producao: 510, producaoFormatada: "510 unidades" },
  { name: "13/03", producao: 530, producaoFormatada: "530 unidades" },
  { name: "14/03", producao: 540, producaoFormatada: "540 unidades" },
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
            formatter={(value, name, props) => [props.payload.producaoFormatada, name]}
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

