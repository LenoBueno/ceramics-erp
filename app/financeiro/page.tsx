import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { Plus, Download, Filter, RefreshCw } from "lucide-react"
import { ContasReceber } from "@/components/financeiro/contas-receber"
import { ContasPagar } from "@/components/financeiro/contas-pagar"
import { FluxoCaixa } from "@/components/financeiro/fluxo-caixa"
import { DashboardFinanceiro } from "@/components/financeiro/dashboard-financeiro"
import { ConciliacaoBancaria } from "@/components/financeiro/conciliacao-bancaria"
import { Link } from "react-router-dom"

export default function FinanceiroPage() {
  return (
    <div className="flex flex-col gap-5 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
        <div className="flex items-center gap-2">
          <CalendarDateRangePicker />
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="contas-receber">Contas a Receber</TabsTrigger>
          <TabsTrigger value="contas-pagar">Contas a Pagar</TabsTrigger>
          <TabsTrigger value="fluxo-caixa">Fluxo de Caixa</TabsTrigger>
          <TabsTrigger value="conciliacao">Conciliação Bancária</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4 pt-4">
          <DashboardFinanceiro />
        </TabsContent>

        <TabsContent value="contas-receber" className="space-y-4 pt-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Contas a Receber</h2>
            <Link to="/financeiro/contas-receber/novo">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Recebimento
              </Button>
            </Link>
          </div>
          <ContasReceber />
        </TabsContent>

        <TabsContent value="contas-pagar" className="space-y-4 pt-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Contas a Pagar</h2>
            <Link to="/financeiro/contas-pagar/novo">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Pagamento
              </Button>
            </Link>
          </div>
          <ContasPagar />
        </TabsContent>

        <TabsContent value="fluxo-caixa" className="space-y-4 pt-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Fluxo de Caixa</h2>
            <Link to="/financeiro/fluxo-caixa/novo">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Movimentação
              </Button>
            </Link>
          </div>
          <FluxoCaixa />
        </TabsContent>

        <TabsContent value="conciliacao" className="space-y-4 pt-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Conciliação Bancária</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Importar Extrato
            </Button>
          </div>
          <ConciliacaoBancaria />
        </TabsContent>
      </Tabs>
    </div>
  )
}

