import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

export default function ConfiguracoesFinanceirasPage() {
  return (
    <div className="flex flex-col gap-5 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/financeiro">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Configurações Financeiras</h1>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="contas" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contas">Contas Financeiras</TabsTrigger>
          <TabsTrigger value="categorias">Categorias</TabsTrigger>
          <TabsTrigger value="formas-pagamento">Formas de Pagamento</TabsTrigger>
          <TabsTrigger value="integracoes">Integrações</TabsTrigger>
        </TabsList>

        <TabsContent value="contas" className="space-y-4 pt-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Contas Financeiras</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Conta
            </Button>
          </div>

          <div className="grid gap-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Conta Principal</CardTitle>
                  <Switch defaultChecked />
                </div>
                <CardDescription>Banco do Brasil - Ag. 1234 / CC 56789-0</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Saldo Atual</div>
                    <div className="text-2xl font-bold text-emerald-600">R$ 125.000,00</div>
                  </div>
                  <div className="flex justify-end items-center gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      Conciliar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Conta Secundária</CardTitle>
                  <Switch defaultChecked />
                </div>
                <CardDescription>Caixa Econômica - Ag. 5678 / CC 12345-6</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Saldo Atual</div>
                    <div className="text-2xl font-bold text-emerald-600">R$ 45.000,00</div>
                  </div>
                  <div className="flex justify-end items-center gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      Conciliar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Caixa</CardTitle>
                  <Switch defaultChecked />
                </div>
                <CardDescription>Dinheiro em espécie na empresa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Saldo Atual</div>
                    <div className="text-2xl font-bold text-emerald-600">R$ 5.000,00</div>
                  </div>
                  <div className="flex justify-end items-center gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      Conciliar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categorias" className="space-y-4 pt-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Categorias Financeiras</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Categoria
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Categorias de Receitas</CardTitle>
              <CardDescription>Gerencie as categorias para classificação de receitas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <div className="font-medium">Vendas de Produtos</div>
                    <div className="text-sm text-muted-foreground">Receitas com vendas de produtos cerâmicos</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <div className="font-medium">Serviços</div>
                    <div className="text-sm text-muted-foreground">Receitas com prestação de serviços</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <div className="font-medium">Projetos Especiais</div>
                    <div className="text-sm text-muted-foreground">Receitas com projetos personalizados</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categorias de Despesas</CardTitle>
              <CardDescription>Gerencie as categorias para classificação de despesas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <div className="font-medium">Matéria Prima</div>
                    <div className="text-sm text-muted-foreground">Despesas com aquisição de matérias-primas</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <div className="font-medium">Folha de Pagamento</div>
                    <div className="text-sm text-muted-foreground">Despesas com salários e encargos</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <div className="font-medium">Energia e Água</div>
                    <div className="text-sm text-muted-foreground">Despesas com utilidades</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="formas-pagamento" className="space-y-4 pt-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Formas de Pagamento</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Forma de Pagamento
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Switch defaultChecked />
                    <div>
                      <div className="font-medium">Dinheiro</div>
                      <div className="text-sm text-muted-foreground">Pagamento em espécie</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>

                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Switch defaultChecked />
                    <div>
                      <div className="font-medium">Cartão de Crédito</div>
                      <div className="text-sm text-muted-foreground">Pagamento com cartão de crédito</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>

                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Switch defaultChecked />
                    <div>
                      <div className="font-medium">Cartão de Débito</div>
                      <div className="text-sm text-muted-foreground">Pagamento com cartão de débito</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>

                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Switch defaultChecked />
                    <div>
                      <div className="font-medium">Boleto</div>
                      <div className="text-sm text-muted-foreground">Pagamento via boleto bancário</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>

                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Switch defaultChecked />
                    <div>
                      <div className="font-medium">PIX</div>
                      <div className="text-sm text-muted-foreground">Pagamento via PIX</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>

                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Switch defaultChecked />
                    <div>
                      <div className="font-medium">Transferência</div>
                      <div className="text-sm text-muted-foreground">Pagamento via transferência bancária</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>

                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Switch defaultChecked />
                    <div>
                      <div className="font-medium">Cheque</div>
                      <div className="text-sm text-muted-foreground">Pagamento com cheque</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integracoes" className="space-y-4 pt-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Integrações Financeiras</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Integração
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Integração Bancária</CardTitle>
              <CardDescription>
                Configure a integração com bancos para importação automática de extratos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Switch defaultChecked />
                    <div>
                      <div className="font-medium">Banco do Brasil</div>
                      <div className="text-sm text-muted-foreground">Integração via API</div>
                    </div>
                  </div>
                  <Button variant="outline">Configurar</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Switch />
                    <div>
                      <div className="font-medium">Caixa Econômica</div>
                      <div className="text-sm text-muted-foreground">Integração via API</div>
                    </div>
                  </div>
                  <Button variant="outline">Configurar</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integração Fiscal</CardTitle>
              <CardDescription>Configure a integração com sistemas fiscais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Switch defaultChecked />
                    <div>
                      <div className="font-medium">Emissor NF-e</div>
                      <div className="text-sm text-muted-foreground">Integração para emissão de notas fiscais</div>
                    </div>
                  </div>
                  <Button variant="outline">Configurar</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Switch defaultChecked />
                    <div>
                      <div className="font-medium">SPED Fiscal</div>
                      <div className="text-sm text-muted-foreground">Integração para geração de arquivos SPED</div>
                    </div>
                  </div>
                  <Button variant="outline">Configurar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

