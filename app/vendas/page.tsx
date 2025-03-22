import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { GraficoVendasPeriodo } from "@/components/vendas/graficos/grafico-vendas-periodo"
import { GraficoProdutosMaisVendidos } from "@/components/vendas/graficos/grafico-produtos-mais-vendidos"
import { GraficoDesempenhoVendedores } from "@/components/vendas/graficos/grafico-desempenho-vendedores"
import { UltimasVendas } from "@/components/vendas/ultimas-vendas"
import { MetasVendas } from "@/components/vendas/metas-vendas"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText, BarChart3 } from "lucide-react"
import { Link } from "react-router-dom"
import { VendasStats } from "@/components/vendas/vendas-stats"

export const metadata: Metadata = {
  title: "Vendas | Cerâmica ERP",
  description: "Gestão de vendas e pedidos",
}

export default function VendasPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Vendas</h1>
        <div className="flex items-center gap-2">
          <CalendarDateRangePicker />
          <Link to="/vendas/novo">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova Venda
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
          <TabsTrigger value="analise">Análise</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <VendasStats />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Metas de Vendas</CardTitle>
                <CardDescription>Acompanhamento das metas mensais</CardDescription>
              </CardHeader>
              <CardContent>
                <MetasVendas />
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Vendas Recentes</CardTitle>
                <CardDescription>Últimas 10 vendas realizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <UltimasVendas />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Vendas por Período</CardTitle>
                  <CardDescription>Comparativo mensal</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </CardHeader>
              <CardContent>
                <GraficoVendasPeriodo />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Produtos Mais Vendidos</CardTitle>
                  <CardDescription>Top 5 produtos</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Detalhes
                </Button>
              </CardHeader>
              <CardContent>
                <GraficoProdutosMaisVendidos />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pedidos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todos os Pedidos</CardTitle>
              <CardDescription>Gerencie todos os pedidos de venda</CardDescription>
            </CardHeader>
            <CardContent>
              <iframe src="/vendas/pedidos" className="w-full h-[600px] border-none"></iframe>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analise" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho de Vendedores</CardTitle>
              <CardDescription>Análise comparativa entre vendedores</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <GraficoDesempenhoVendedores />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Vendas por Região</CardTitle>
                <CardDescription>Distribuição geográfica das vendas</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <iframe src="/vendas/analise/regiao" className="w-full h-full border-none"></iframe>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vendas por Categoria</CardTitle>
                <CardDescription>Distribuição por categoria de produto</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <iframe src="/vendas/analise/categoria" className="w-full h-full border-none"></iframe>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

