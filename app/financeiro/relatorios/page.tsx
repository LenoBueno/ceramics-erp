import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, FileText, BarChart3, TrendingUp, Filter } from "lucide-react"
import Link from "next/link"
import { GraficoReceitasDespesas } from "@/components/financeiro/graficos/grafico-receitas-despesas"
import { GraficoFluxoCaixa } from "@/components/financeiro/graficos/grafico-fluxo-caixa"
import { formatCurrency } from "@/lib/utils"

// Dados simulados para demonstração
const resumoFinanceiro = {
  receitas: 125000,
  despesas: 85000,
  lucro: 40000,
  margemLucro: 32,
  contasReceber: 87500,
  contasPagar: 45000,
  fluxoCaixa: 42500,
}

export default function RelatoriosFinanceirosPage() {
  return (
    <div className="flex flex-col gap-5 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/financeiro">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios Financeiros</h1>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDateRangePicker />
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(resumoFinanceiro.receitas)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <TrendingUp className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(resumoFinanceiro.despesas)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(resumoFinanceiro.lucro)}</div>
            <p className="text-xs text-muted-foreground">Margem: {resumoFinanceiro.margemLucro}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fluxo de Caixa</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(resumoFinanceiro.fluxoCaixa)}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dre" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dre">DRE</TabsTrigger>
          <TabsTrigger value="fluxo-caixa">Fluxo de Caixa</TabsTrigger>
          <TabsTrigger value="contas">Contas a Pagar/Receber</TabsTrigger>
          <TabsTrigger value="categorias">Análise por Categoria</TabsTrigger>
        </TabsList>

        <TabsContent value="dre" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Demonstrativo de Resultado</CardTitle>
                  <CardDescription>Período: 01/03/2023 a 31/03/2023</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>Receita Bruta</span>
                    <span>{formatCurrency(125000)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span>Vendas de Produtos</span>
                    <span>{formatCurrency(95000)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span>Serviços</span>
                    <span>{formatCurrency(20000)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span>Projetos Especiais</span>
                    <span>{formatCurrency(10000)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>Deduções</span>
                    <span>- {formatCurrency(15000)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span>Impostos sobre Vendas</span>
                    <span>{formatCurrency(12000)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span>Devoluções</span>
                    <span>{formatCurrency(3000)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-medium border-t pt-2">
                  <span>Receita Líquida</span>
                  <span>{formatCurrency(110000)}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>Custos</span>
                    <span>- {formatCurrency(55000)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span>Matéria Prima</span>
                    <span>{formatCurrency(35000)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span>Mão de Obra Direta</span>
                    <span>{formatCurrency(15000)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span>Energia Elétrica (Produção)</span>
                    <span>{formatCurrency(5000)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-medium border-t pt-2">
                  <span>Lucro Bruto</span>
                  <span>{formatCurrency(55000)}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>Despesas Operacionais</span>
                    <span>- {formatCurrency(30000)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span>Administrativas</span>
                    <span>{formatCurrency(12000)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span>Comerciais</span>
                    <span>{formatCurrency(10000)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span>Financeiras</span>
                    <span>{formatCurrency(8000)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-medium text-lg border-t pt-2">
                  <span>Lucro Líquido</span>
                  <span className="text-emerald-600">{formatCurrency(25000)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Margem Líquida</span>
                  <span>20%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Evolução de Receitas e Despesas</CardTitle>
              <CardDescription>Últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <GraficoReceitasDespesas />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fluxo-caixa" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Fluxo de Caixa</CardTitle>
                  <CardDescription>Período: 01/03/2023 a 31/03/2023</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex justify-between font-medium">
                  <span>Saldo Inicial</span>
                  <span>{formatCurrency(85000)}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between font-medium text-emerald-600">
                    <span>Entradas</span>
                    <span>+ {formatCurrency(125000)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span>Recebimentos de Clientes</span>
                    <span>{formatCurrency(115000)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span>Rendimentos Financeiros</span>
                    <span>{formatCurrency(5000)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span>Outros Recebimentos</span>
                    <span>{formatCurrency(5000)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between font-medium text-rose-600">
                    <span>Saídas</span>
                    <span>- {formatCurrency(85000)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span>Pagamentos a Fornecedores</span>
                    <span>{formatCurrency(35000)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span>Folha de Pagamento</span>
                    <span>{formatCurrency(25000)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span>Impostos</span>
                    <span>{formatCurrency(15000)}</span>
                  </div>
                  <div className="flex justify-between text-sm pl-4">
                    <span>Despesas Operacionais</span>
                    <span>{formatCurrency(10000)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-medium text-lg border-t pt-2">
                  <span>Saldo Final</span>
                  <span className="text-emerald-600">{formatCurrency(125000)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Variação no Período</span>
                  <span className="text-emerald-600">+ {formatCurrency(40000)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Evolução do Fluxo de Caixa</CardTitle>
              <CardDescription>Últimos 30 dias</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <GraficoFluxoCaixa />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contas" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Contas a Receber</CardTitle>
                    <CardDescription>Análise por vencimento</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Total a Receber</span>
                    <span className="font-bold">{formatCurrency(87500)}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-rose-600">Vencidas</span>
                      <span className="font-medium text-rose-600">{formatCurrency(15000)}</span>
                    </div>
                    <div className="flex justify-between text-sm pl-4">
                      <span>Até 15 dias</span>
                      <span>{formatCurrency(10000)}</span>
                    </div>
                    <div className="flex justify-between text-sm pl-4">
                      <span>16 a 30 dias</span>
                      <span>{formatCurrency(3000)}</span>
                    </div>
                    <div className="flex justify-between text-sm pl-4">
                      <span>Acima de 30 dias</span>
                      <span>{formatCurrency(2000)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-amber-600">A vencer</span>
                      <span className="font-medium text-amber-600">{formatCurrency(72500)}</span>
                    </div>
                    <div className="flex justify-between text-sm pl-4">
                      <span>Próximos 15 dias</span>
                      <span>{formatCurrency(45000)}</span>
                    </div>
                    <div className="flex justify-between text-sm pl-4">
                      <span>16 a 30 dias</span>
                      <span>{formatCurrency(20000)}</span>
                    </div>
                    <div className="flex justify-between text-sm pl-4">
                      <span>Acima de 30 dias</span>
                      <span>{formatCurrency(7500)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Contas a Pagar</CardTitle>
                    <CardDescription>Análise por vencimento</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Total a Pagar</span>
                    <span className="font-bold">{formatCurrency(45000)}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-rose-600">Vencidas</span>
                      <span className="font-medium text-rose-600">{formatCurrency(5000)}</span>
                    </div>
                    <div className="flex justify-between text-sm pl-4">
                      <span>Até 15 dias</span>
                      <span>{formatCurrency(3500)}</span>
                    </div>
                    <div className="flex justify-between text-sm pl-4">
                      <span>16 a 30 dias</span>
                      <span>{formatCurrency(1000)}</span>
                    </div>
                    <div className="flex justify-between text-sm pl-4">
                      <span>Acima de 30 dias</span>
                      <span>{formatCurrency(500)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-amber-600">A vencer</span>
                      <span className="font-medium text-amber-600">{formatCurrency(40000)}</span>
                    </div>
                    <div className="flex justify-between text-sm pl-4">
                      <span>Próximos 15 dias</span>
                      <span>{formatCurrency(25000)}</span>
                    </div>
                    <div className="flex justify-between text-sm pl-4">
                      <span>16 a 30 dias</span>
                      <span>{formatCurrency(10000)}</span>
                    </div>
                    <div className="flex justify-between text-sm pl-4">
                      <span>Acima de 30 dias</span>
                      <span>{formatCurrency(5000)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Índice de Inadimplência</CardTitle>
              <CardDescription>Últimos 12 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Taxa de Inadimplência Atual</span>
                  <span className="font-bold text-amber-600">3.8%</span>
                </div>

                <div className="h-10 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "3.8%" }}></div>
                </div>

                <div className="grid grid-cols-4 gap-4 text-center text-sm">
                  <div>
                    <div className="font-medium">1º Trimestre</div>
                    <div className="text-rose-600">4.2%</div>
                  </div>
                  <div>
                    <div className="font-medium">2º Trimestre</div>
                    <div className="text-amber-600">3.9%</div>
                  </div>
                  <div>
                    <div className="font-medium">3º Trimestre</div>
                    <div className="text-amber-600">3.7%</div>
                  </div>
                  <div>
                    <div className="font-medium">4º Trimestre</div>
                    <div className="text-emerald-600">3.5%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categorias" className="space-y-4 pt-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Análise por Categoria</h2>
            <Select defaultValue="receitas">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="receitas">Receitas</SelectItem>
                <SelectItem value="despesas">Despesas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Receitas por Categoria</CardTitle>
              <CardDescription>Período: 01/03/2023 a 31/03/2023</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Total de Receitas</span>
                  <span className="font-bold">{formatCurrency(125000)}</span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                        <span>Vendas de Produtos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{formatCurrency(81250)}</span>
                        <span className="text-sm text-muted-foreground">65%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span>Serviços</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{formatCurrency(25000)}</span>
                        <span className="text-sm text-muted-foreground">20%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span>Projetos Especiais</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{formatCurrency(12500)}</span>
                        <span className="text-sm text-muted-foreground">10%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                        <span>Outros</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{formatCurrency(6250)}</span>
                        <span className="text-sm text-muted-foreground">5%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "5%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comparativo Mensal poror Categoria</CardTitle>
              <CardDescription>Últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Categoria</th>
                      <th className="text-right py-2">Out/22</th>
                      <th className="text-right py-2">Nov/22</th>
                      <th className="text-right py-2">Dez/22</th>
                      <th className="text-right py-2">Jan/23</th>
                      <th className="text-right py-2">Fev/23</th>
                      <th className="text-right py-2">Mar/23</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Vendas de Produtos</td>
                      <td className="text-right py-2">{formatCurrency(61750)}</td>
                      <td className="text-right py-2">{formatCurrency(68250)}</td>
                      <td className="text-right py-2">{formatCurrency(78000)}</td>
                      <td className="text-right py-2">{formatCurrency(71500)}</td>
                      <td className="text-right py-2">{formatCurrency(74750)}</td>
                      <td className="text-right py-2">{formatCurrency(81250)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Serviços</td>
                      <td className="text-right py-2">{formatCurrency(19000)}</td>
                      <td className="text-right py-2">{formatCurrency(21000)}</td>
                      <td className="text-right py-2">{formatCurrency(24000)}</td>
                      <td className="text-right py-2">{formatCurrency(22000)}</td>
                      <td className="text-right py-2">{formatCurrency(23000)}</td>
                      <td className="text-right py-2">{formatCurrency(25000)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Projetos Especiais</td>
                      <td className="text-right py-2">{formatCurrency(9500)}</td>
                      <td className="text-right py-2">{formatCurrency(10500)}</td>
                      <td className="text-right py-2">{formatCurrency(12000)}</td>
                      <td className="text-right py-2">{formatCurrency(11000)}</td>
                      <td className="text-right py-2">{formatCurrency(11500)}</td>
                      <td className="text-right py-2">{formatCurrency(12500)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Outros</td>
                      <td className="text-right py-2">{formatCurrency(4750)}</td>
                      <td className="text-right py-2">{formatCurrency(5250)}</td>
                      <td className="text-right py-2">{formatCurrency(6000)}</td>
                      <td className="text-right py-2">{formatCurrency(5500)}</td>
                      <td className="text-right py-2">{formatCurrency(5750)}</td>
                      <td className="text-right py-2">{formatCurrency(6250)}</td>
                    </tr>
                    <tr className="font-medium">
                      <td className="py-2">Total</td>
                      <td className="text-right py-2">{formatCurrency(95000)}</td>
                      <td className="text-right py-2">{formatCurrency(105000)}</td>
                      <td className="text-right py-2">{formatCurrency(120000)}</td>
                      <td className="text-right py-2">{formatCurrency(110000)}</td>
                      <td className="text-right py-2">{formatCurrency(115000)}</td>
                      <td className="text-right py-2">{formatCurrency(125000)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

