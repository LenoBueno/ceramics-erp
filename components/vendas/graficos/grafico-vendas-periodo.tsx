import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const dados = [
  { mes: "Jan", vendas: 12500 },
  { mes: "Fev", vendas: 15800 },
  { mes: "Mar", vendas: 18200 },
  { mes: "Abr", vendas: 17500 },
  { mes: "Mai", vendas: 21000 },
  { mes: "Jun", vendas: 45678 },
]

export function GraficoVendasPeriodo() {
  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor)
  }

  // Definindo a cor do gradiente sem usar elementos SVG diretamente
  const gradientColor = "hsl(var(--primary))"

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={dados} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatarValor}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <Tooltip
            formatter={(value: number) => [formatarValor(value), "Vendas"]}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
            }}
          />
          <Area type="monotone" dataKey="vendas" stroke={gradientColor} fillOpacity={0.5} fill={gradientColor} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

