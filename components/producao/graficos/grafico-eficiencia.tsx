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
    name: "Linha 1",
    eficiencia: 92,
    meta: 95,
    eficienciaFormatada: "92%",
    metaFormatada: "95%"
  },
  {
    name: "Linha 2",
    eficiencia: 88,
    meta: 90,
    eficienciaFormatada: "88%",
    metaFormatada: "90%"
  },
  {
    name: "Linha 3",
    eficiencia: 85,
    meta: 90,
    eficienciaFormatada: "85%",
    metaFormatada: "90%"
  },
  {
    name: "Linha 4",
    eficiencia: 90,
    meta: 90,
    eficienciaFormatada: "90%",
    metaFormatada: "90%"
  },
  {
    name: "Linha 5",
    eficiencia: 82,
    meta: 85,
    eficienciaFormatada: "82%",
    metaFormatada: "85%"
  },
]

export function GraficoEficiencia() {
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
          <YAxis domain={[0, 100]} />
          <Tooltip
            formatter={(value, name, props) => [name === "Eficiência Atual" ? props.payload.eficienciaFormatada : props.payload.metaFormatada, name]}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Legend />
          <Bar dataKey="eficiencia" name="Eficiência Atual" fill="#2563eb" />
          <Bar dataKey="meta" name="Meta" fill="#16a34a" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

