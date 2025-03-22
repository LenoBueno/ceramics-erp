import { DashboardShell } from "../../components/dashboard-shell"
import { PageHeader } from "../../components/page-header"
import { VendasStats } from "../../components/vendas/vendas-stats"
import { UltimasVendas } from "../../components/vendas/ultimas-vendas"
import { MetasVendas } from "../../components/vendas/metas-vendas"
import { GraficoVendasPeriodo } from "../../components/vendas/graficos/grafico-vendas-periodo"
import { GraficoProdutosMaisVendidos } from "../../components/vendas/graficos/grafico-produtos-mais-vendidos"
import { GraficoDesempenhoVendedores } from "../../components/vendas/graficos/grafico-desempenho-vendedores"
import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"

export default function Vendas() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <PageHeader heading="Vendas" text="Gerencie as vendas da sua empresa" />
        <Link to="/vendas/novo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Venda
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <VendasStats />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        <div className="col-span-2">
          <GraficoVendasPeriodo />
        </div>
        <div>
          <MetasVendas />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <GraficoProdutosMaisVendidos />
        <GraficoDesempenhoVendedores />
      </div>

      <div className="mt-4">
        <UltimasVendas />
      </div>
    </DashboardShell>
  )
}

