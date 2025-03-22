import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plus, Trash2, Save, CreditCard, Package } from "lucide-react"
import { Link } from "react-router-dom"
import { FormularioItensVenda } from "@/components/vendas/formulario-itens-venda"

export const metadata: Metadata = {
  title: "Nova Venda | Cerâmica ERP",
  description: "Criar um novo pedido de venda",
}

export default function NovaVendaPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/vendas">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Nova Venda</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Salvar Rascunho
          </Button>
          <Button>
            <CreditCard className="mr-2 h-4 w-4" />
            Finalizar Venda
          </Button>
        </div>
      </div>

      <Tabs defaultValue="cliente" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cliente">Cliente</TabsTrigger>
          <TabsTrigger value="itens">Itens</TabsTrigger>
          <TabsTrigger value="pagamento">Pagamento</TabsTrigger>
          <TabsTrigger value="entrega">Entrega</TabsTrigger>
          <TabsTrigger value="observacoes">Observações</TabsTrigger>
        </TabsList>

        <TabsContent value="cliente">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Cliente</CardTitle>
              <CardDescription>Selecione um cliente existente ou cadastre um novo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <Label htmlFor="cliente">Cliente</Label>
                    <Select>
                      <SelectTrigger id="cliente">
                        <SelectValue placeholder="Selecione um cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Cerâmica Artesanal Ltda</SelectItem>
                        <SelectItem value="2">Construtora Horizonte S.A.</SelectItem>
                        <SelectItem value="3">Decorações Modernas ME</SelectItem>
                        <SelectItem value="4">Arquitetura & Design Ltda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Cliente
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="documento">CPF/CNPJ</Label>
                    <Input id="documento" placeholder="000.000.000-00" disabled />
                  </div>
                  <div>
                    <Label htmlFor="inscricao">Inscrição Estadual</Label>
                    <Input id="inscricao" placeholder="Isento" disabled />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="cliente@exemplo.com" disabled />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" placeholder="(00) 00000-0000" disabled />
                  </div>
                </div>

                <div>
                  <Label htmlFor="vendedor">Vendedor Responsável</Label>
                  <Select defaultValue="1">
                    <SelectTrigger id="vendedor">
                      <SelectValue placeholder="Selecione um vendedor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">João Silva</SelectItem>
                      <SelectItem value="2">Maria Oliveira</SelectItem>
                      <SelectItem value="3">Carlos Santos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="itens">
          <Card>
            <CardHeader>
              <CardTitle>Itens do Pedido</CardTitle>
              <CardDescription>Adicione os produtos que fazem parte desta venda</CardDescription>
            </CardHeader>
            <CardContent>
              <FormularioItensVenda />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pagamento">
          <Card>
            <CardHeader>
              <CardTitle>Condições de Pagamento</CardTitle>
              <CardDescription>Defina a forma e condições de pagamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
                    <Select defaultValue="boleto">
                      <SelectTrigger id="formaPagamento">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dinheiro">Dinheiro</SelectItem>
                        <SelectItem value="cartao">Cartão de Crédito</SelectItem>
                        <SelectItem value="boleto">Boleto Bancário</SelectItem>
                        <SelectItem value="pix">PIX</SelectItem>
                        <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="condicaoPagamento">Condição de Pagamento</Label>
                    <Select defaultValue="30-60-90">
                      <SelectTrigger id="condicaoPagamento">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="avista">À Vista</SelectItem>
                        <SelectItem value="30dias">30 dias</SelectItem>
                        <SelectItem value="30-60">30/60 dias</SelectItem>
                        <SelectItem value="30-60-90">30/60/90 dias</SelectItem>
                        <SelectItem value="personalizado">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Parcelas</h3>
                  <div className="rounded-md border p-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-1 font-medium">#</div>
                        <div className="col-span-4 font-medium">Vencimento</div>
                        <div className="col-span-4 font-medium">Valor</div>
                        <div className="col-span-3 font-medium">Ações</div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-1">1</div>
                        <div className="col-span-4">
                          <Input type="date" defaultValue="2023-07-15" />
                        </div>
                        <div className="col-span-4">
                          <Input type="text" defaultValue="R$ 1.000,00" />
                        </div>
                        <div className="col-span-3">
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-1">2</div>
                        <div className="col-span-4">
                          <Input type="date" defaultValue="2023-08-15" />
                        </div>
                        <div className="col-span-4">
                          <Input type="text" defaultValue="R$ 1.000,00" />
                        </div>
                        <div className="col-span-3">
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-1">3</div>
                        <div className="col-span-4">
                          <Input type="date" defaultValue="2023-09-15" />
                        </div>
                        <div className="col-span-4">
                          <Input type="text" defaultValue="R$ 1.000,00" />
                        </div>
                        <div className="col-span-3">
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Adicionar Parcela
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entrega">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Entrega</CardTitle>
              <CardDescription>Defina o endereço e condições de entrega</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <Label htmlFor="enderecoEntrega">Endereço de Entrega</Label>
                    <Select defaultValue="mesmo">
                      <SelectTrigger id="enderecoEntrega">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mesmo">Mesmo do Cadastro</SelectItem>
                        <SelectItem value="outro">Outro Endereço</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Endereço
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="metodoEnvio">Método de Envio</Label>
                    <Select defaultValue="transportadora">
                      <SelectTrigger id="metodoEnvio">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retirada">Retirada na Loja</SelectItem>
                        <SelectItem value="transportadora">Transportadora</SelectItem>
                        <SelectItem value="entrega_propria">Entrega Própria</SelectItem>
                        <SelectItem value="correios">Correios</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="transportadora">Transportadora</Label>
                    <Select defaultValue="1">
                      <SelectTrigger id="transportadora">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Transportadora Rápida Ltda</SelectItem>
                        <SelectItem value="2">Logística Express S.A.</SelectItem>
                        <SelectItem value="3">Entregas Seguras ME</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="valorFrete">Valor do Frete</Label>
                    <Input id="valorFrete" placeholder="R$ 0,00" />
                  </div>
                  <div>
                    <Label htmlFor="previsaoEntrega">Previsão de Entrega</Label>
                    <Input id="previsaoEntrega" type="date" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="instrucoes">Instruções de Entrega</Label>
                  <Textarea id="instrucoes" placeholder="Informações adicionais para entrega..." rows={3} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="observacoes">
          <Card>
            <CardHeader>
              <CardTitle>Observações e Informações Adicionais</CardTitle>
              <CardDescription>Adicione notas e informações complementares ao pedido</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <Label htmlFor="observacoes">Observações Gerais</Label>
                  <Textarea id="observacoes" placeholder="Observações sobre o pedido..." rows={4} />
                </div>

                <div>
                  <Label htmlFor="observacoesInternas">Observações Internas</Label>
                  <Textarea
                    id="observacoesInternas"
                    placeholder="Observações visíveis apenas para a equipe interna..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="anexos">Anexos</Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/30"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Package className="w-8 h-8 mb-3 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                          </p>
                          <p className="text-xs text-muted-foreground">PDF, PNG, JPG (MAX. 10MB)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" multiple />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between mt-4">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Cancelar
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Salvar Rascunho
          </Button>
          <Button>
            <CreditCard className="mr-2 h-4 w-4" />
            Finalizar Venda
          </Button>
        </div>
      </div>
    </div>
  )
}

