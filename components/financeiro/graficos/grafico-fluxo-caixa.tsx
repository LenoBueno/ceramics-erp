"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"
import { formatCurrency } from "@/lib/utils"

// Dados simulados para o gráfico de fluxo de caixa
const data = [
  { data: "01/03", entrada: 15000, saida: 8000 },
  { data: "02/03", entrada: 12000, saida: 10000 },
  { data: "03/03", entrada: 8000, saida: 12000 },
  { data: "04/03", entrada: 10000, saida: 7000 },
  { data: "05/03", entrada: 9000, saida: 8000 },
  { data: "06/03", entrada: 11000, saida: 9000 },
  { data: "07/03", entrada: 13000, saida: 7000 },
  { data: "08/03", entrada: 14000, saida: 11000 },
  { data: "09/03", entrada: 16000, saida: 9000 },
  { data: "10/03", entrada: 12000, saida: 8000 },
  { data: "11/03", entrada: 10000, saida: 10000 },
  { data: "12/03", entrada: 9000, saida: 12000 },
  { data: "13/03", entrada: 11000, saida: 7000 },
  { data: "14/03", entrada: 13000, saida: 9000 },
  { data: "15/03", entrada: 15000, saida: 12000 },
  { data: "16/03", entrada: 12000, saida: 8000 },
  { data: "17/03", entrada: 10000, saida: 9000 },
  { data: "18/03", entrada: 9000, saida: 11000 },
  { data: "19/03", entrada: 11000, saida: 8000 },
  { data: "20/03", entrada: 13000, saida: 10000 },
  { data: "21/03", entrada: 14000, saida: 9000 },
  { data: "22/03", entrada: 16000, saida: 11000 },
  { data: "23/03", entrada: 12000, saida: 8000 },
  { data: "24/03", entrada: 10000, saida: 10000 },
  { data: "25/03", entrada: 9000, saida: 7000 },
  { data: "26/03", entrada: 11000, saida: 9000 },
  { data: "27/03", entrada: 13000, saida: 8000 },
  { data: "28/03", entrada: 15000, saida: 10000 },
  { data: "29/03", entrada: 12000, saida: 9000 },
  { data: "30/03", entrada: 14000, saida: 11000 },
]

export function GraficoFluxoCaixa() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="data"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => value}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `R$${value / 1000}k`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Card className="border shadow-sm">
                  <CardContent className="p-2">
                    <div className="text-sm font-medium">{payload[0].payload.data}</div>
                    <div className="text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Entradas: {formatCurrency(payload[0].value as number)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-rose-500" />
                        <span>Saídas: {formatCurrency(payload[1].value as number)}</span>
                      </div>
                      <div className="mt-1 font-medium">
                        Saldo: {formatCurrency((payload[0].value as number) - (payload[1].value as number))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            }
            return null
          }}
        />
        <Area type="monotone" dataKey="entrada" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
        <Area type="monotone" dataKey="saida" stackId="2" stroke="#e11d48" fill="#e11d48" fillOpacity={0.6} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

