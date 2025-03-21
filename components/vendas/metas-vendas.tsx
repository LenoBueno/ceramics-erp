import { Progress } from "@/components/ui/progress"
import { formatarMoeda } from "@/lib/utils"

const metasVendas = [
  {
    id: 1,
    nome: "Meta Mensal",
    valorAtual: 45678.9,
    valorMeta: 60000.0,
    percentual: 76,
  },
  {
    id: 2,
    nome: "Meta Trimestral",
    valorAtual: 132500.75,
    valorMeta: 180000.0,
    percentual: 73,
  },
  {
    id: 3,
    nome: "Meta Anual",
    valorAtual: 487900.5,
    valorMeta: 720000.0,
    percentual: 67,
  },
]

export function MetasVendas() {
  return (
    <div className="space-y-4">
      {metasVendas.map((meta) => (
        <div key={meta.id} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{meta.nome}</span>
            <span className="font-medium">{meta.percentual}%</span>
          </div>
          <Progress value={meta.percentual} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatarMoeda(meta.valorAtual)}</span>
            <span>Meta: {formatarMoeda(meta.valorMeta)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

