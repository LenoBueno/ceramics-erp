import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Box, Clock, FileCheck, LineChart, Plus, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProducaoStats } from "@/components/producao/producao-stats"
import { OrdensProducao } from "@/components/producao/ordens-producao"
import { GraficoEficiencia } from "@/components/producao/graficos/grafico-eficiencia"
import { GraficoProducaoDiaria } from "@/components/producao/graficos/grafico-producao-diaria"

export const metadata: Metadata = {
  title: "Produção | ERP Cerâmicas",
  description: "Gestão de produção para indústrias de cerâmicas",
}

export default function ProducaoPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Produção</h1>
          <p className="text-muted-foreground">Gerencie ordens de produção, processos e controle de qualidade</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/producao/nova-ordem">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Ordem
            </Button>
          </Link>
          <Link href="/producao/configuracoes">
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <ProducaoStats />

      <Tabs defaultValue="ordens" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ordens">Ordens de Produção</TabsTrigger>
          <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
          <TabsTrigger value="qualidade">Controle de Qualidade</TabsTrigger>
          <TabsTrigger value="processos">Processos</TabsTrigger>
        </TabsList>
        <TabsContent value="ordens" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Em Preparação</CardTitle>
                <Box className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Ordens aguardando início</p>
              </CardContent>
              <CardFooter>
                <Link href="/producao/ordens?status=preparacao" className="w-full">
                  <Button variant="outline" className="w-full">
                    Ver ordens
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Em Produção</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Ordens em andamento</p>
              </CardContent>
              <CardFooter>
                <Link href="/producao/ordens?status=producao" className="w-full">
                  <Button variant="outline" className="w-full">
                    Ver ordens
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Controle de Qualidade</CardTitle>
                <FileCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Ordens em inspeção</p>
              </CardContent>
              <CardFooter>
                <Link href="/producao/ordens?status=qualidade" className="w-full">
                  <Button variant="outline" className="w-full">
                    Ver ordens
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Nos últimos 30 dias</p>
              </CardContent>
              <CardFooter>
                <Link href="/producao/ordens?status=concluida" className="w-full">
                  <Button variant="outline" className="w-full">
                    Ver ordens
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <OrdensProducao />
        </TabsContent>
        <TabsContent value="desempenho" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Eficiência de Produção</CardTitle>
                <CardDescription>Eficiência por linha de produção nos últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <GraficoEficiencia />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Produção Diária</CardTitle>
                <CardDescription>Quantidade produzida nos últimos 14 dias</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <GraficoProducaoDiaria />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="qualidade" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Controle de Qualidade</CardTitle>
              <CardDescription>Acompanhe os indicadores de qualidade da produção</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4">
                <p className="text-sm text-muted-foreground">
                  O módulo de controle de qualidade permite acompanhar os indicadores de qualidade da produção,
                  registrar não conformidades e implementar ações corretivas.
                </p>
                <div className="mt-4 flex justify-center">
                  <Link href="/producao/qualidade">
                    <Button>
                      Acessar Controle de Qualidade
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="processos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Processos de Produção</CardTitle>
              <CardDescription>Gerencie os processos de produção da sua indústria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4">
                <p className="text-sm text-muted-foreground">
                  O módulo de processos permite configurar e gerenciar os processos de produção da sua indústria,
                  definindo etapas, recursos necessários e tempos de execução.
                </p>
                <div className="mt-4 flex justify-center">
                  <Link href="/producao/processos">
                    <Button>
                      Acessar Processos de Produção
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

