import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const dados = [
  { produto: "Porcelanato 60x60", quantidade: 320 },
  { produto: "Azulejo Dec.", quantidade: 280 },
  { produto: "Revestimento 30x60", quantidade: 220 },
  { produto: "Pastilha 5x5", quantidade: 190 },
  { produto: "Tijolo Aparente", quantidade: 140 },
]

export function GraficoProdutosMaisVendidos() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dados} layout="vertical" margin={{ top: 10, right: 10, left: 100, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
          <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            type="category"
            dataKey="produto"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={90}
          />
          <Tooltip
            formatter={(value: number) => [`${value} unidades`, "Quantidade"]}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
            }}
          />
          <Bar dataKey="quantidade" fill="hsl(var(--primary))" radius={[4, 4, 4, 4]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

