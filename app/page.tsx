import type React from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import { InventoryStatus } from "@/components/inventory-status"
import { PageHeader } from "@/components/page-header"
import { AlertTriangle, BarChart3, DollarSign, Factory, Package, ShoppingCart, TrendingUp, Users } from "lucide-react"

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
                  <CardDescription>Você fez 124 vendas este mês.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Status do Inventário</CardTitle>
                  <CardDescription>Produtos com estoque baixo que precisam de reposição.</CardDescription>
                </CardHeader>
                <CardContent>
                  <InventoryStatus />
                </CardContent>
              </Card>

              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Atividades Recentes</CardTitle>
                  <CardDescription>Últimas ações realizadas no sistema.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivities />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Vendas do Mês"
                value="124"
                description="+14% em relação ao mês passado"
                icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Receita"
                value="R$ 45.231,89"
                description="+20.1% em relação ao mês passado"
                icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Ticket Médio"
                value="R$ 364,77"
                description="+5.3% em relação ao mês passado"
                icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Novos Clientes"
                value="18"
                description="+3 em relação ao mês passado"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Vendas por Produto</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <SalesByProductChart />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Top Clientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <TopCustomers />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="production" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Ordens Ativas"
                value="14"
                description="+2 ordens desde a semana passada"
                icon={<Factory className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Taxa de Produção"
                value="94.5%"
                description="+2.5% da meta"
                icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Eficiência"
                value="86.3%"
                description="-3.7% da meta"
                icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Ordens Atrasadas"
                value="2"
                description="6.5% do total de ordens"
                icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Produção por Linha</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ProductionByLineChart />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Ordens em Andamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <OngoingProductionOrders />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="finance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Saldo Atual"
                value="R$ 54.230,65"
                description="Atualizado hoje às 10:45"
                icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Receita Mensal"
                value="R$ 24.750,50"
                description="+12.5% em relação ao mês passado"
                icon={<TrendingUp className="h-4 w-4 text-green-500" />}
              />
              <MetricCard
                title="Despesas Mensais"
                value="R$ 18.420,80"
                description="+5.2% em relação ao mês passado"
                icon={<TrendingUp className="h-4 w-4 text-red-500" />}
              />
              <MetricCard
                title="Pagamentos Pendentes"
                value="R$ 8.450,25"
                description="4 transações pendentes"
                icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Fluxo de Caixa</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <CashFlowChart />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Transações Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentTransactions />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

function MetricCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}) {
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

function RecentActivities() {
  const activities = [
    {
      id: 1,
      type: "order",
      description: "Novo pedido criado",
      details: "Pedido #1234 - Cliente: Maria Silva",
      time: "1h atrás",
    },
    {
      id: 2,
      type: "product",
      description: "Produto atualizado",
      details: "Quartinha de Barro - Estoque: 24",
      time: "2h atrás",
    },
    {
      id: 3,
      type: "invoice",
      description: "Nota fiscal emitida",
      details: "NF-e #123456 - Cliente: João Pereira",
      time: "3h atrás",
    },
    {
      id: 4,
      type: "production",
      description: "Ordem de produção iniciada",
      details: "OP #567 - Quartinhas de Barro Médias",
      time: "4h atrás",
    },
    {
      id: 5,
      type: "finance",
      description: "Pagamento recebido",
      details: "R$ 1.250,00 - Cliente: Cerâmicas Elite",
      time: "5h atrás",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.description}</p>
            <p className="text-sm text-muted-foreground">{activity.details}</p>
          </div>
          <div className="text-sm text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}

function SalesByProductChart() {
  return (
    <div className="h-[300px] flex items-center justify-center">
      <BarChart3 className="h-8 w-8 text-muted-foreground" />
      <p className="ml-2 text-muted-foreground">Gráfico de vendas por produto</p>
    </div>
  )
}

function TopCustomers() {
  const customers = [
    { id: 1, name: "Galeria Cerâmica", orders: 12, value: "R$ 4.850,00" },
    { id: 2, name: "Casa & Decoração", orders: 8, value: "R$ 3.210,50" },
    { id: 3, name: "Artesanato Brasil", orders: 7, value: "R$ 2.950,75" },
    { id: 4, name: "Cerâmicas Elite", orders: 5, value: "R$ 1.875,30" },
  ]

  return (
    <div className="space-y-4">
      {customers.map((customer) => (
        <div key={customer.id} className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{customer.name}</p>
            <p className="text-xs text-muted-foreground">{customer.orders} pedidos</p>
          </div>
          <div className="font-medium">{customer.value}</div>
        </div>
      ))}
    </div>
  )
}

function ProductionByLineChart() {
  return (
    <div className="h-[300px] flex items-center justify-center">
      <BarChart3 className="h-8 w-8 text-muted-foreground" />
      <p className="ml-2 text-muted-foreground">Gráfico de produção por linha</p>
    </div>
  )
}

function OngoingProductionOrders() {
  const orders = [
    { id: 1, name: "Quartinhas de Barro Médias", progress: 67, team: "Equipe A" },
    { id: 2, name: "Pratos Decorativos", progress: 45, team: "Equipe B" },
    { id: 3, name: "Vasos Cerâmicos", progress: 23, team: "Equipe A" },
  ]

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{order.name}</p>
            <p className="text-xs text-muted-foreground">{order.team}</p>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${order.progress}%` }} />
          </div>
          <p className="text-xs text-right">{order.progress}%</p>
        </div>
      ))}
    </div>
  )
}

function CashFlowChart() {
  return (
    <div className="h-[300px] flex items-center justify-center">
      <BarChart3 className="h-8 w-8 text-muted-foreground" />
      <p className="ml-2 text-muted-foreground">Gráfico de fluxo de caixa</p>
    </div>
  )
}

function RecentTransactions() {
  const transactions = [
    { id: 1, description: "Pagamento de Pedido #1234", value: "R$ 1.999,00", type: "income" },
    { id: 2, description: "Compra de Matéria-Prima", value: "R$ 845,50", type: "expense" },
    { id: 3, description: "Pagamento de Pedido #1235", value: "R$ 2.450,00", type: "income" },
    { id: 4, description: "Pagamento de Energia", value: "R$ 750,25", type: "expense" },
  ]

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between">
          <p className="text-sm font-medium">{transaction.description}</p>
          <p className={`font-medium ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}>
            {transaction.type === "income" ? "+" : "-"} {transaction.value}
          </p>
        </div>
      ))}
    </div>
  )
}

