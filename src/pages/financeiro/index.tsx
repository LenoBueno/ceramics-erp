"use client"

import { DashboardShell } from "../../components/dashboard-shell"
import { PageHeader } from "../../components/page-header"
import { DashboardFinanceiro } from "../../components/financeiro/dashboard-financeiro"
import { ContasReceber } from "../../components/financeiro/contas-receber"
import { ContasPagar } from "../../components/financeiro/contas-pagar"
import { FluxoCaixa } from "../../components/financeiro/fluxo-caixa"
import { ConciliacaoBancaria } from "../../components/financeiro/conciliacao-bancaria"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { DateRangePicker } from "../../components/date-range-picker"
import { useState } from "react"
import { addDays } from "date-fns"

export default function Financeiro() {
  const [date, setDate] = useState<{
    from: Date
    to: Date | undefined
  }>({
    from: new Date(new Date().setDate(1)),
    to: addDays(new Date(), 0),
  })

  return (
    <DashboardShell>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <PageHeader heading="Financeiro" text="Gerencie as finanças da sua empresa" />
        <DateRangePicker date={date} setDate={setDate} />
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="contas-receber">Contas a Receber</TabsTrigger>
          <TabsTrigger value="contas-pagar">Contas a Pagar</TabsTrigger>
          <TabsTrigger value="fluxo-caixa">Fluxo de Caixa</TabsTrigger>
          <TabsTrigger value="conciliacao">Conciliação Bancária</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="space-y-4">
          <DashboardFinanceiro dateRange={date} />
        </TabsContent>
        <TabsContent value="contas-receber" className="space-y-4">
          <ContasReceber dateRange={date} />
        </TabsContent>
        <TabsContent value="contas-pagar" className="space-y-4">
          <ContasPagar dateRange={date} />
        </TabsContent>
        <TabsContent value="fluxo-caixa" className="space-y-4">
          <FluxoCaixa dateRange={date} />
        </TabsContent>
        <TabsContent value="conciliacao" className="space-y-4">
          <ConciliacaoBancaria dateRange={date} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

