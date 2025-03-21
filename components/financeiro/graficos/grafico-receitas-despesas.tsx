"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"
import { formatCurrency } from "@/lib/utils"

// Dados simulados para o gráfico de receitas e despesas
const data = [
  {
    mes: "Out/22",
    receitas: 95000,
    despesas: 75000,
  },
  {
    mes: "Nov/22",
    receitas: 105000,
    despesas: 82000,
  },
  {
    mes: "Dez/22",
    receitas: 120000,
    despesas: 90000,
  },
  {
    mes: "Jan/23",
    receitas: 110000,
    despesas: 85000,
  },
  {
    mes: "Fev/23",
    receitas: 115000,
    despesas: 88000,
  },
  {
    mes: "Mar/23",
    receitas: 125000,
    despesas: 92000,
  },
]

export function GraficoReceitasDespesas() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={10} tick={{ fontSize: 12 }} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `R$${value / 1000}k`}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <Card className="border shadow-sm">
                  <CardContent className="p-2">
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Receitas: {formatCurrency(payload[0].value as number)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-rose-500" />
                        <span>Despesas: {formatCurrency(payload[1].value as number)}</span>
                      </div>
                      <div className="mt-1 font-medium">
                        Lucro: {formatCurrency((payload[0].value as number) - (payload[1].value as number))}
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
          content={({ payload }) => {
            return (
              <div className="flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span>Receitas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500" />
                  <span>Despesas</span>
                </div>
              </div>
            )
          }}
        />
        <Bar dataKey="receitas" fill="#10b981" radius={[4, 4, 0, 0]} />
        <Bar dataKey="despesas" fill="#e11d48" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

