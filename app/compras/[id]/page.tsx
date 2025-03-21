import type React from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { PageHeader, PageHeaderAction } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatusBadge } from "@/components/status-badge"
import type { Purchase } from "@/types/purchase"
import { formatCurrency, formatDate } from "@/lib/utils"
import { ArrowLeft, Building, Calendar, FileEdit, FileText, Truck } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Separator } from "@/components/ui/separator"

// Função para buscar compra por ID (simulada)
function getPurchaseById(id: string): Purchase | undefined {
  const purchases: Record<string, Purchase> = {
    "PO-2025-001": {
      id: "PO-2025-001",
      supplierId: "SUPP-001",
      supplierName: "Cerâmicas Artesanais Ltda",
      date: "2025-03-15",
      status: "completed",
      items: [
        {
          id: "ITEM-001",
          productId: "1",
          productName: "Argila Vermelha",
          productCode: "ARG-001",
          quantity: 500,
          unitPrice: 5.0,
          total: 2500.0,
        },
        {
          id: "ITEM-002",
          productId: "2",
          productName: "Esmalte Transparente",
          productCode: "ESM-001",
          quantity: 20,
          unitPrice: 25.0,
          total: 500.0,
        },
      ],
      subtotal: 3000.0,
      shipping: 150.0,
      tax: 300.0,
      total: 3450.0,
      paymentMethod: "Transferência Bancária",
      paymentStatus: "completed",
      deliveryDate: "2025-03-20",
      notes: "Pedido de materiais para produção de quartinhas de barro.",
      createdAt: "2025-03-10",
      updatedAt: "2025-03-15",
    },
  }

  return purchases[id]
}

export default function PurchaseDetailPage({ params }: { params: { id: string } }) {
  const purchase = getPurchaseById(params.id)

  if (!purchase) {
    return notFound()
  }

  return (
    <DashboardShell>
      <PageHeader heading={`Pedido ${purchase.id}`} text={`Detalhes do pedido de compra`}>
        <div className="flex gap-2">
          <PageHeaderAction href="/compras" variant="outline" icon={<ArrowLeft className="h-4 w-4" />}>
            Voltar
          </PageHeaderAction>
          <PageHeaderAction
            href={`/compras/${purchase.id}/editar`}
            variant="outline"
            icon={<FileEdit className="h-4 w-4" />}
          >
            Editar
          </PageHeaderAction>
          <PageHeaderAction href="#" icon={<FileText className="h-4 w-4" />}>
            Gerar PDF
          </PageHeaderAction>
        </div>
      </PageHeader>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Detalhes do Pedido</CardTitle>
              <StatusBadge status={purchase.status} />
            </div>
            <CardDescription>Pedido realizado em {formatDate(purchase.date)}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="items" className="space-y-4">
              <TabsList>
                <TabsTrigger value="items">Itens</TabsTrigger>
                <TabsTrigger value="payment">Pagamento</TabsTrigger>
                <TabsTrigger value="shipping">Entrega</TabsTrigger>
                <TabsTrigger value="history">Histórico</TabsTrigger>
              </TabsList>

              <TabsContent value="items" className="space-y-4">
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-10 px-4 text-left align-middle font-medium">Produto</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Código</th>
                        <th className="h-10 px-4 text-center align-middle font-medium">Quantidade</th>
                        <th className="h-10 px-4 text-right align-middle font-medium">Preço Unit.</th>
                        <th className="h-10 px-4 text-right align-middle font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchase.items.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="p-4 align-middle font-medium">{item.productName}</td>
                          <td className="p-4 align-middle">{item.productCode}</td>
                          <td className="p-4 align-middle text-center">{item.quantity}</td>
                          <td className="p-4 align-middle text-right">{formatCurrency(item.unitPrice)}</td>
                          <td className="p-4 align-middle text-right font-medium">{formatCurrency(item.total)}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={4} className="p-4 align-middle text-right font-medium">
                          Subtotal:
                        </td>
                        <td className="p-4 align-middle text-right">{formatCurrency(purchase.subtotal)}</td>
                      </tr>
                      <tr>
                        <td colSpan={4} className="p-4 align-middle text-right font-medium">
                          Frete:
                        </td>
                        <td className="p-4 align-middle text-right">{formatCurrency(purchase.shipping)}</td>
                      </tr>
                      <tr>
                        <td colSpan={4} className="p-4 align-middle text-right font-medium">
                          Impostos:
                        </td>
                        <td className="p-4 align-middle text-right">{formatCurrency(purchase.tax)}</td>
                      </tr>
                      <tr>
                        <td colSpan={4} className="p-4 align-middle text-right font-bold">
                          Total:
                        </td>
                        <td className="p-4 align-middle text-right font-bold">{formatCurrency(purchase.total)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {purchase.notes && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Observações</h3>
                    <p className="text-sm text-muted-foreground">{purchase.notes}</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="payment" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem label="Método de Pagamento" value={purchase.paymentMethod} />
                  <InfoItem label="Status do Pagamento" value={<StatusBadge status={purchase.paymentStatus} />} />
                  <InfoItem label="Subtotal" value={formatCurrency(purchase.subtotal)} />
                  <InfoItem label="Impostos" value={formatCurrency(purchase.tax)} />
                  <InfoItem label="Frete" value={formatCurrency(purchase.shipping)} />
                  <InfoItem label="Total" value={formatCurrency(purchase.total)} />
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem label="Data de Entrega Prevista" value={formatDate(purchase.deliveryDate || "")} />
                  <InfoItem label="Status da Entrega" value={<StatusBadge status={purchase.status} />} />
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Endereço de Entrega</h3>
                  <p className="text-sm">Rua das Olarias, 500, Distrito Industrial</p>
                  <p className="text-sm">São Paulo - SP, 04001-000</p>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Pedido Concluído</p>
                      <p className="text-xs text-muted-foreground">{formatDate(purchase.updatedAt)}</p>
                      <p className="text-sm mt-1">O pedido foi entregue e concluído.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Truck className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Pedido Enviado</p>
                      <p className="text-xs text-muted-foreground">15/03/2025</p>
                      <p className="text-sm mt-1">O pedido foi enviado pelo fornecedor.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Building className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Pedido Criado</p>
                      <p className="text-xs text-muted-foreground">{formatDate(purchase.createdAt)}</p>
                      <p className="text-sm mt-1">O pedido foi criado no sistema.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fornecedor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{purchase.supplierName}</h3>
                  <p className="text-sm text-muted-foreground">Fornecedor de materiais cerâmicos</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">CNPJ</span>
                  <span>12.345.678/0001-90</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Telefone</span>
                  <span>(11) 98765-4321</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span>contato@ceramicasartesanais.com.br</span>
                </div>
              </div>

              <div className="pt-2">
                <Link href={`/fornecedores/${purchase.supplierId}`} className="text-sm text-primary hover:underline">
                  Ver detalhes do fornecedor
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <StatusBadge status={purchase.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Data do Pedido</span>
                <span>{formatDate(purchase.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Entrega Prevista</span>
                <span>{formatDate(purchase.deliveryDate || "")}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatCurrency(purchase.total)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                href={`/compras/${purchase.id}/receber`}
                className="block w-full p-2 text-center bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Receber Mercadoria
              </Link>
              <Link
                href={`/compras/${purchase.id}/editar`}
                className="block w-full p-2 text-center bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
              >
                Editar Pedido
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}

function InfoItem({ label, value, icon }: { label: string; value: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2">
        {icon}
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}

