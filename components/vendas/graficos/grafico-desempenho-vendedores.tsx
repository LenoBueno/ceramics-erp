import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const dados = [
  {
    nome: "João Silva",
    vendas: 78500,
    meta: 80000,
    comissao: 3925,
  },
  {
    nome: "Maria Oliveira",
    vendas: 92300,
    meta: 75000,
    comissao: 4615,
  },
  {
    nome: "Carlos Santos",
    vendas: 65800,
    meta: 70000,
    comissao: 3290,
  },
  {
    nome: "Ana Ferreira",
    vendas: 81200,
    meta: 80000,
    comissao: 4060,
  },
  {
    nome: "Pedro Souza",
    vendas: 54700,
    meta: 60000,
    comissao: 2735,
  },
]

export function GraficoDesempenhoVendedores() {
  // Pre-format the tick values instead of passing the formatter function
  const dadosFormatados = dados.map(item => ({
    ...item,
    vendasFormatada: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(item.vendas),
    comissaoFormatada: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(item.comissao)
  }))
  
  // Helper function for tooltip formatting - will be serialized for client component
  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor)
  }

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dados} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="nome" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={function(value) { return `R$${value.toLocaleString('pt-BR')}` }}
          />
          <Tooltip
            formatter={function(value: number) { return [formatarValor(value), ""] }}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
            }}
          />
          <Legend />
          <Bar
            name="Vendas Realizadas"
            dataKey="vendas"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            barSize={30}
          />
          <Bar name="Meta" dataKey="meta" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

