"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "@/components/ui/chart"
import { formatCurrency } from "@/lib/utils"

// Dados simulados para o gráfico de contas por vencimento
const data = [
  { name: "Hoje", value: 5000, color: "#e11d48" },
  { name: "Atrasadas", value: 15000, color: "#f43f5e" },
  { name: "Próximos 7 dias", value: 12000, color: "#f59e0b" },
  { name: "8-15 dias", value: 8000, color: "#3b82f6" },
  { name: "16-30 dias", value: 5000, color: "#10b981" },
]

export function GraficoContasVencimento() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              return (
                <Card className="border shadow-sm">
                  <CardContent className="p-2">
                    <div className="text-sm font-medium">{data.name}</div>
                    <div className="text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: data.color }} />
                        <span>{formatCurrency(data.value)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            }
            return null
          }}
        />
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          content={({ payload }) => {
            return (
              <div className="flex flex-col gap-2 text-xs">
                {payload?.map((entry, index) => (
                  <div key={`item-${index}`} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span>{entry.value}</span>
                    <span className="font-medium">{formatCurrency(data[index].value)}</span>
                  </div>
                ))}
              </div>
            )
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

