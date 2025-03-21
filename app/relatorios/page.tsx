import { DashboardShell } from "@/components/dashboard-shell"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Download, FileText, LineChart, PieChart, TrendingUp } from "lucide-react"
import { DateRangePicker } from "@/components/ui/date-range-picker"

export default function ReportsPage() {
  return (
    <DashboardShell>
      <PageHeader heading="Relatórios" text="Visualize e exporte relatórios do seu negócio." />

      <div className="mt-6">
        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="sales">Vendas</TabsTrigger>
            <TabsTrigger value="inventory">Estoque</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
            <TabsTrigger value="production">Produção</TabsTrigger>
            <TabsTrigger value="customers">Clientes</TabsTrigger>
          </TabsList>

          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
              <CardDescription>Selecione os filtros para gerar o relatório.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Período</Label>
                  <DateRangePicker />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as categorias</SelectItem>
                      <SelectItem value="quartinhas">Quartinhas de Barro</SelectItem>
                      <SelectItem value="ibas">Ibás</SelectItem>
                      <SelectItem value="alguidar">Alguidar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button className="w-full">Gerar Relatório</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <TabsContent value="sales" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 45.231,89</div>
                  <p className="text-xs text-muted-foreground">+20.1% em relação ao período anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Número de Pedidos</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">124</div>
                  <p className="text-xs text-muted-foreground">+14% em relação ao período anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 364,77</div>
                  <p className="text-xs text-muted-foreground">+5.3% em relação ao período anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Produtos Vendidos</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">573</div>
                  <p className="text-xs text-muted-foreground">+7% em relação ao período anterior</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Vendas por Período</CardTitle>
                  <CardDescription>Evolução das vendas ao longo do tempo.</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-muted-foreground" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vendas por Categoria</CardTitle>
                  <CardDescription>Distribuição das vendas por categoria de produto.</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-muted-foreground" />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Produtos Vendidos</CardTitle>
                <CardDescription>Produtos mais vendidos no período selecionado.</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground" />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Relatório
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Valor em Estoque</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 78.450,25</div>
                  <p className="text-xs text-muted-foreground">573 produtos em estoque</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Produtos Abaixo do Mínimo</CardTitle>
                  <FileText className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8 produtos</div>
                  <p className="text-xs text-muted-foreground">Necessitam reposição</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Giro de Estoque</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.2</div>
                  <p className="text-xs text-muted-foreground">Rotatividade média</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Movimentações</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">No período selecionado</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Valor em Estoque por Categoria</CardTitle>
                  <CardDescription>Distribuição do valor em estoque por categoria.</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-muted-foreground" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Produtos com Baixo Estoque</CardTitle>
                  <CardDescription>Produtos que estão abaixo do estoque mínimo.</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground" />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Movimentações</CardTitle>
                <CardDescription>Entradas e saídas de produtos no período selecionado.</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <LineChart className="h-16 w-16 text-muted-foreground" />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Relatório
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 45.231,89</div>
                  <p className="text-xs text-green-500">+20.1% em relação ao período anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Despesas</CardTitle>
                  <TrendingUp className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 28.450,65</div>
                  <p className="text-xs text-red-500">+5.2% em relação ao período anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Lucro</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 16.781,24</div>
                  <p className="text-xs text-green-500">+37.1% em relação ao período anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Margem de Lucro</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">37.1%</div>
                  <p className="text-xs text-muted-foreground">Média do período</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Fluxo de Caixa</CardTitle>
                  <CardDescription>Receitas e despesas ao longo do tempo.</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-muted-foreground" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Despesas por Categoria</CardTitle>
                  <CardDescription>Distribuição das despesas por categoria.</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-muted-foreground" />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Demonstrativo de Resultados</CardTitle>
                <CardDescription>Resumo financeiro do período selecionado.</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground" />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Relatório
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="production" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ordens de Produção</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">No período selecionado</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Produtos Produzidos</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">450</div>
                  <p className="text-xs text-muted-foreground">Unidades produzidas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Produção</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.5%</div>
                  <p className="text-xs text-green-500">+2.5% da meta</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Eficiência</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">86.3%</div>
                  <p className="text-xs text-red-500">-3.7% da meta</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Produção por Produto</CardTitle>
                  <CardDescription>Quantidade produzida por tipo de produto.</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Eficiência por Linha de Produção</CardTitle>
                  <CardDescription>Taxa de eficiência por linha de produção.</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground" />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Produção</CardTitle>
                <CardDescription>Evolução da produção ao longo do tempo.</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <LineChart className="h-16 w-16 text-muted-foreground" />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Relatório
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

