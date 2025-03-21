import { DashboardShell } from '@/components/dashboard-shell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Overview } from '@/components/overview'
import { RecentSales } from '@/components/recent-sales'
import { InventoryStatus } from '@/components/inventory-status'
import { PageHeader } from '@/components/page-header'
import { AlertTriangle, BarChart3, DollarSign, Factory, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}

function MetricCard({ title, value, description, icon }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  return (
    <DashboardShell>
      <PageHeader heading="Dashboard" text="Bem-vindo ao sistema ERP da 2103 Creative." />

      <div className="mt-6 space-y-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="sales">Vendas</TabsTrigger>
            <TabsTrigger value="production">Produção</TabsTrigger>
            <TabsTrigger value="finance">Financeiro</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Receita Total"
                value="R$ 45.231,89"
                description="+20.1% em relação ao mês passado"
                icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Vendas"
                value="+124"
                description="+14% em relação ao mês passado"
                icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Produtos em Estoque"
                value="573"
                description="+7 novos produtos adicionados"
                icon={<Package className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Pedidos Pendentes"
                value="12"
                description="3 aguardando aprovação"
                icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Visão Geral</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Vendas Recentes</CardTitle>
                  <CardDescription>
                    Você fez 265 vendas este mês.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sales" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Vendas Totais"
                value="R$ 45.231,89"
                description="+20.1% em relação ao mês passado"
                icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Novos Pedidos"
                value="+124"
                description="+14% em relação ao mês passado"
                icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Taxa de Conversão"
                value="24.3%"
                description="+7% em relação ao mês passado"
                icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Clientes Ativos"
                value="573"
                description="+12 novos clientes"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Vendas por Período</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Vendas Recentes</CardTitle>
                  <CardDescription>
                    Você fez 265 vendas este mês.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="production" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Produção Total"
                value="1,245 unidades"
                description="+18% em relação ao mês passado"
                icon={<Factory className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Eficiência"
                value="87.5%"
                description="+2.5% em relação ao mês passado"
                icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Produtos em Estoque"
                value="573"
                description="+7 novos produtos adicionados"
                icon={<Package className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Ordens Pendentes"
                value="12"
                description="3 aguardando aprovação"
                icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-1">
              <Card>
                <CardHeader>
                  <CardTitle>Status do Inventário</CardTitle>
                  <CardDescription>
                    Visão geral do estoque atual e níveis de inventário.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InventoryStatus />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="finance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Receita Total"
                value="R$ 45.231,89"
                description="+20.1% em relação ao mês passado"
                icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Despesas"
                value="R$ 12.432,78"
                description="-5% em relação ao mês passado"
                icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Lucro"
                value="R$ 32.799,11"
                description="+25% em relação ao mês passado"
                icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Contas a Receber"
                value="R$ 8.432,00"
                description="12 faturas pendentes"
                icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Fluxo de Caixa</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Transações Recentes</CardTitle>
                  <CardDescription>
                    Últimas 5 transações financeiras.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}