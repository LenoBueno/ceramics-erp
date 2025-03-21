"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ResumoFinanceiro } from "@/types/financeiro"
import { formatCurrency } from "@/lib/utils"
import { ArrowDownIcon, ArrowUpIcon, AlertTriangleIcon, WalletIcon } from "lucide-react"
import { GraficoFluxoCaixa } from "./graficos/grafico-fluxo-caixa"
import { GraficoReceitasDespesas } from "./graficos/grafico-receitas-despesas"
import { GraficoContasVencimento } from "./graficos/grafico-contas-vencimento"

// Dados simulados para demonstração
const resumoFinanceiro: ResumoFinanceiro = {
  saldoAtual: 125000,
  contasReceberTotal: 87500,
  contasPagarTotal: 45000,
  recebimentosHoje: 12500,
  pagamentosHoje: 8500,
  contasAtrasadas: 15000,
  previsaoSaldo: 167500,
}

export function DashboardFinanceiro() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
            <WalletIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(resumoFinanceiro.saldoAtual)}</div>
            <p className="text-xs text-muted-foreground">Previsão: {formatCurrency(resumoFinanceiro.previsaoSaldo)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A Receber</CardTitle>
            <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(resumoFinanceiro.contasReceberTotal)}</div>
            <p className="text-xs text-muted-foreground">Hoje: {formatCurrency(resumoFinanceiro.recebimentosHoje)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A Pagar</CardTitle>
            <ArrowDownIcon className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(resumoFinanceiro.contasPagarTotal)}</div>
            <p className="text-xs text-muted-foreground">Hoje: {formatCurrency(resumoFinanceiro.pagamentosHoje)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Fluxo de Caixa</CardTitle>
            <CardDescription>Entradas e saídas dos últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <GraficoFluxoCaixa />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contas Atrasadas</CardTitle>
            <CardDescription>
              <span className="flex items-center text-rose-500">
                <AlertTriangleIcon className="mr-1 h-4 w-4" />
                {formatCurrency(resumoFinanceiro.contasAtrasadas)}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <GraficoContasVencimento />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Receitas vs Despesas</CardTitle>
            <CardDescription>Comparativo dos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <GraficoReceitasDespesas />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Categoria</CardTitle>
            <Tabs defaultValue="receitas" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="receitas">Receitas</TabsTrigger>
                <TabsTrigger value="despesas">Despesas</TabsTrigger>
              </TabsList>
              <TabsContent value="receitas" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                      <span>Vendas de Produtos</span>
                    </div>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span>Serviços</span>
                    </div>
                    <span className="font-medium">20%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span>Projetos Especiais</span>
                    </div>
                    <span className="font-medium">10%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                      <span>Outros</span>
                    </div>
                    <span className="font-medium">5%</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="despesas" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-rose-500 mr-2"></div>
                      <span>Matéria Prima</span>
                    </div>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                      <span>Folha de Pagamento</span>
                    </div>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-sky-500 mr-2"></div>
                      <span>Energia e Água</span>
                    </div>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                      <span>Outros</span>
                    </div>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

