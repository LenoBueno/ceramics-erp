import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowLeft,
  Printer,
  FileText,
  Truck,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Clock,
  Package,
  Send,
} from "lucide-react"
import { Link } from "react-router-dom"
import { encontrarPedidoPorId } from "@/data/vendas-data"
import { formatarData, formatarMoeda } from "@/lib/utils"
import { notFound } from "next/navigation"
import { HistoricoPedido } from "@/components/vendas/historico-pedido"

export const metadata: Metadata = {
  title: "Detalhes do Pedido | Cerâmica ERP",
  description: "Visualização detalhada do pedido de venda",
}

export default function DetalhesPedidoPage({ params }: { params: { id: string } }) {
  const pedidoId = Number.parseInt(params.id)
  const pedido = encontrarPedidoPorId(pedidoId)

  if (!pedido) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/vendas/pedidos">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Pedido #{pedido.numero}</h1>
          <StatusBadge status={pedido.status} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Gerar NF-e
          </Button>
          <Button>
            <Truck className="mr-2 h-4 w-4" />
            Atualizar Status
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Detalhes do Pedido</CardTitle>
            <CardDescription>
              Criado em {formatarData(pedido.data)} por {pedido.vendedor}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="itens" className="space-y-4">
              <TabsList>
                <TabsTrigger value="itens">Itens</TabsTrigger>
                <TabsTrigger value="pagamento">Pagamento</TabsTrigger>
                <TabsTrigger value="entrega">Entrega</TabsTrigger>
                <TabsTrigger value="historico">Histórico</TabsTrigger>
              </TabsList>

              <TabsContent value="itens">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead className="text-right">Qtd</TableHead>
                        <TableHead className="text-right">Valor Unit.</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pedido.itens.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{item.produto}</div>
                              <div className="text-sm text-muted-foreground">{item.codigo}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{item.quantidade}</TableCell>
                          <TableCell className="text-right">{formatarMoeda(item.valorUnitario)}</TableCell>
                          <TableCell className="text-right">
                            {formatarMoeda(item.quantidade * item.valorUnitario)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 flex flex-col items-end">
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>{formatarMoeda(pedido.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Desconto:</span>
                      <span>-{formatarMoeda(pedido.desconto)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Frete:</span>
                      <span>{formatarMoeda(pedido.frete)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>{formatarMoeda(pedido.valorTotal)}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pagamento">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Informações de Pagamento</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Forma de Pagamento:</span>
                          <span className="font-medium">{pedido.formaPagamento}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Condição:</span>
                          <span className="font-medium">{pedido.condicaoPagamento}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="font-medium">
                            <Badge variant={pedido.statusPagamento === "Pago" ? "success" : "outline"}>
                              {pedido.statusPagamento}
                            </Badge>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Parcelas</h3>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Vencimento</TableHead>
                              <TableHead className="text-right">Valor</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {pedido.parcelas?.map((parcela, index) => (
                              <TableRow key={index}>
                                <TableCell>{formatarData(parcela.vencimento)}</TableCell>
                                <TableCell className="text-right">{formatarMoeda(parcela.valor)}</TableCell>
                                <TableCell>
                                  <Badge variant={parcela.status === "Pago" ? "success" : "outline"}>
                                    {parcela.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Registrar Pagamento
                    </Button>
                    <Button variant="outline">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Marcar como Pendente
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="entrega">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Endereço de Entrega</h3>
                      <div className="p-4 border rounded-md">
                        <p className="font-medium">{pedido.enderecoEntrega?.destinatario}</p>
                        <p>
                          {pedido.enderecoEntrega?.logradouro}, {pedido.enderecoEntrega?.numero}
                        </p>
                        <p>{pedido.enderecoEntrega?.complemento}</p>
                        <p>
                          {pedido.enderecoEntrega?.bairro} - {pedido.enderecoEntrega?.cidade}/
                          {pedido.enderecoEntrega?.uf}
                        </p>
                        <p>{pedido.enderecoEntrega?.cep}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Informações de Envio</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Método de Envio:</span>
                          <span className="font-medium">{pedido.metodoEnvio}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Transportadora:</span>
                          <span className="font-medium">{pedido.transportadora}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Previsão de Entrega:</span>
                          <span className="font-medium">{formatarData(pedido.previsaoEntrega)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Código de Rastreio:</span>
                          <span className="font-medium">{pedido.codigoRastreio || "Não disponível"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline">
                      <Package className="mr-2 h-4 w-4" />
                      Preparar Envio
                    </Button>
                    <Button variant="outline">
                      <Send className="mr-2 h-4 w-4" />
                      Registrar Envio
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="historico">
                <HistoricoPedido pedidoId={pedido.id} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="font-medium">{pedido.cliente}</div>
                <div className="text-sm text-muted-foreground">{pedido.clienteDocumento}</div>
                <Separator className="my-2" />
                <div className="text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{pedido.clienteEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Telefone:</span>
                    <span>{pedido.clienteTelefone}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Link href={`/clientes/${pedido.clienteId}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Ver Perfil Completo
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <StatusTimeline status={pedido.status} />

                <div className="pt-2">
                  <Button className="w-full">Atualizar Status</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir Pedido
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Gerar NF-e
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Registrar Pagamento
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar por Email
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Cancelar Pedido
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<
    string,
    { label: string; variant: "default" | "outline" | "secondary" | "destructive" | "success" }
  > = {
    pendente: { label: "Pendente", variant: "outline" },
    aprovado: { label: "Aprovado", variant: "secondary" },
    em_producao: { label: "Em Produção", variant: "default" },
    enviado: { label: "Enviado", variant: "default" },
    entregue: { label: "Entregue", variant: "success" },
    cancelado: { label: "Cancelado", variant: "destructive" },
  }

  const config = statusConfig[status] || { label: status, variant: "outline" }

  return <Badge variant={config.variant}>{config.label}</Badge>
}

function StatusTimeline({ status }: { status: string }) {
  const statusOrder = ["pendente", "aprovado", "em_producao", "enviado", "entregue"]
  const currentIndex = statusOrder.indexOf(status)

  return (
    <div className="space-y-3">
      {statusOrder.map((step, index) => {
        const isCompleted = index <= currentIndex
        const isCurrent = index === currentIndex

        return (
          <div key={step} className="flex items-center gap-3">
            {isCompleted ? (
              <CheckCircle2 className="h-5 w-5 text-primary" />
            ) : (
              <Clock className="h-5 w-5 text-muted-foreground" />
            )}
            <div className={`flex-1 ${isCurrent ? "font-medium" : ""}`}>
              {step === "pendente" && "Pendente"}
              {step === "aprovado" && "Aprovado"}
              {step === "em_producao" && "Em Produção"}
              {step === "enviado" && "Enviado"}
              {step === "entregue" && "Entregue"}
            </div>
          </div>
        )
      })}
    </div>
  )
}

