import { Link } from "react-router-dom"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, FileText, Printer, Download, Copy, CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react"
import type { InvoiceDetail, InvoiceStatus } from "@/types/invoice"
import { formatCurrency } from "@/lib/invoice-helpers"
import { getInvoiceDetailById } from "@/data/mock-invoices"

// Obter informações de status da nota fiscal
function getStatusInfo(status: InvoiceStatus) {
  switch (status) {
    case "authorized":
      return {
        color: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
        icon: <CheckCircle className="h-4 w-4 mr-2" />,
        text: "Autorizada",
      }
    case "processing":
      return {
        color: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
        icon: <Clock className="h-4 w-4 mr-2" />,
        text: "Processando",
      }
    case "rejected":
      return {
        color: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
        icon: <XCircle className="h-4 w-4 mr-2" />,
        text: "Rejeitada",
      }
    case "canceled":
      return {
        color: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
        icon: <AlertCircle className="h-4 w-4 mr-2" />,
        text: "Cancelada",
      }
    default:
      return {
        color: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
        icon: <AlertCircle className="h-4 w-4 mr-2" />,
        text: status.charAt(0).toUpperCase() + status.slice(1),
      }
  }
}

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const invoice = getInvoiceDetailById(params.id)

  if (!invoice) {
    return notFound()
  }

  return (
    <div className="flex flex-col space-y-6 p-6">
      <PageHeader invoice={invoice} />
      <InvoiceDetailContent invoice={invoice} />
    </div>
  )
}

// Componente para o cabeçalho da página
function PageHeader({ invoice }: { invoice: InvoiceDetail }) {
  const statusInfo = getStatusInfo(invoice.status)

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link to="/finance/invoices">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Nota Fiscal: {invoice.number}</h1>
        <Badge className={statusInfo.color} variant="outline">
          <div className="flex items-center">
            {statusInfo.icon}
            {statusInfo.text}
          </div>
        </Badge>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Printer className="mr-2 h-4 w-4" />
          Imprimir DANFE
        </Button>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Baixar XML
        </Button>
        {invoice.status === "authorized" && (
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Cancelar NF-e
          </Button>
        )}
      </div>
    </div>
  )
}

// Componente para o conteúdo principal da página
function InvoiceDetailContent({ invoice }: { invoice: InvoiceDetail }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Detalhes da Nota Fiscal</CardTitle>
          <CardDescription>Informações completas da NF-e {invoice.number}</CardDescription>
        </CardHeader>
        <CardContent>
          <InvoiceDetailTabs invoice={invoice} />
        </CardContent>
      </Card>

      <div className="space-y-6">
        <InvoiceAccessKeyCard accessKey={invoice.accessKey} />
        <InvoiceAuthorizationCard protocol={invoice.authProtocol} date={invoice.authDate} />
        <CustomerInfoCard customer={invoice.customer} cnpj={invoice.cnpj} address={invoice.address} />
        <InvoiceTotalsCard totals={invoice.totals} />
      </div>
    </div>
  )
}

// Componente para as abas de detalhes da nota fiscal
function InvoiceDetailTabs({ invoice }: { invoice: InvoiceDetail }) {
  return (
    <Tabs defaultValue="items">
      <TabsList className="mb-4">
        <TabsTrigger value="items">Itens</TabsTrigger>
        <TabsTrigger value="taxes">Impostos</TabsTrigger>
        <TabsTrigger value="additional">Informações Adicionais</TabsTrigger>
      </TabsList>

      <TabsContent value="items">
        <InvoiceItemsTab items={invoice.items} totals={invoice.totals} />
      </TabsContent>

      <TabsContent value="taxes">
        <InvoiceTaxesTab totals={invoice.totals} />
      </TabsContent>

      <TabsContent value="additional">
        <InvoiceAdditionalInfoTab
          payment={invoice.payment}
          transport={invoice.transport}
          additionalInfo={invoice.additionalInfo}
          fiscalInfo={invoice.fiscalInfo}
        />
      </TabsContent>
    </Tabs>
  )
}

// Componente para a aba de itens
function InvoiceItemsTab({
  items,
  totals,
}: {
  items: InvoiceDetail["items"]
  totals: InvoiceDetail["totals"]
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Código</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="w-[100px]">NCM</TableHead>
            <TableHead className="w-[80px]">Qtd</TableHead>
            <TableHead className="text-right">Valor Unit.</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.code}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.ncm}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
              <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={5} className="text-right font-medium">
              Subtotal
            </TableCell>
            <TableCell className="text-right">{formatCurrency(totals.subtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="text-right font-medium">
              Frete
            </TableCell>
            <TableCell className="text-right">{formatCurrency(totals.shipping)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="text-right font-medium">
              Total
            </TableCell>
            <TableCell className="text-right font-bold">{formatCurrency(totals.total)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

// Componente para a aba de impostos
function InvoiceTaxesTab({ totals }: { totals: InvoiceDetail["totals"] }) {
  const totalTaxes =
    (totals.tax.icms || 0) +
    (totals.tax.ipi || 0) +
    (totals.tax.pis || 0) +
    (totals.tax.cofins || 0) +
    (totals.tax.iss || 0)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imposto</TableHead>
            <TableHead className="text-right">Base de Cálculo</TableHead>
            <TableHead className="text-right">Alíquota</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {totals.tax.icms !== undefined && (
            <TableRow>
              <TableCell className="font-medium">ICMS</TableCell>
              <TableCell className="text-right">{formatCurrency(totals.products)}</TableCell>
              <TableCell className="text-right">18%</TableCell>
              <TableCell className="text-right">{formatCurrency(totals.tax.icms)}</TableCell>
            </TableRow>
          )}
          {totals.tax.ipi !== undefined && (
            <TableRow>
              <TableCell className="font-medium">IPI</TableCell>
              <TableCell className="text-right">{formatCurrency(totals.products)}</TableCell>
              <TableCell className="text-right">5%</TableCell>
              <TableCell className="text-right">{formatCurrency(totals.tax.ipi)}</TableCell>
            </TableRow>
          )}
          {totals.tax.pis !== undefined && (
            <TableRow>
              <TableCell className="font-medium">PIS</TableCell>
              <TableCell className="text-right">{formatCurrency(totals.subtotal)}</TableCell>
              <TableCell className="text-right">1.65%</TableCell>
              <TableCell className="text-right">{formatCurrency(totals.tax.pis)}</TableCell>
            </TableRow>
          )}
          {totals.tax.cofins !== undefined && (
            <TableRow>
              <TableCell className="font-medium">COFINS</TableCell>
              <TableCell className="text-right">{formatCurrency(totals.subtotal)}</TableCell>
              <TableCell className="text-right">7.6%</TableCell>
              <TableCell className="text-right">{formatCurrency(totals.tax.cofins)}</TableCell>
            </TableRow>
          )}
          {totals.tax.iss !== undefined && (
            <TableRow>
              <TableCell className="font-medium">ISS</TableCell>
              <TableCell className="text-right">{formatCurrency(totals.services)}</TableCell>
              <TableCell className="text-right">5%</TableCell>
              <TableCell className="text-right">{formatCurrency(totals.tax.iss)}</TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell colSpan={3} className="text-right font-medium">
              Total de Impostos
            </TableCell>
            <TableCell className="text-right font-bold">{formatCurrency(totalTaxes)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

// Componente para a aba de informações adicionais
function InvoiceAdditionalInfoTab({
  payment,
  transport,
  additionalInfo,
  fiscalInfo,
}: {
  payment: InvoiceDetail["payment"]
  transport: InvoiceDetail["transport"]
  additionalInfo: string
  fiscalInfo: string
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Forma de Pagamento</h3>
          <p>{payment.method}</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Indicador de Pagamento</h3>
          <p>{payment.indicator}</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Modalidade de Frete</h3>
          <p>{transport.mode}</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Veículo de Transporte</h3>
          <p>{transport.vehicle}</p>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Informações Complementares</h3>
        <p>{additionalInfo}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Informações Fiscais</h3>
        <p>{fiscalInfo}</p>
      </div>
    </div>
  )
}

// Componente para o card de chave de acesso
function InvoiceAccessKeyCard({ accessKey }: { accessKey: string }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Chave de Acesso</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-sm font-mono break-all">{accessKey}</p>
          <Button variant="ghost" size="icon" title="Copiar chave de acesso">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente para o card de informações de autorização
function InvoiceAuthorizationCard({
  protocol,
  date,
}: {
  protocol: string
  date: string
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Informações de Autorização</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Protocolo de Autorização</p>
            <p className="font-mono">{protocol}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Data de Autorização</p>
            <p>{date}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente para o card de informações do cliente
function CustomerInfoCard({
  customer,
  cnpj,
  address,
}: {
  customer: string
  cnpj: string
  address: string
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Informações do Destinatário</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Nome/Razão Social</p>
            <p className="font-medium">{customer}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">CNPJ/CPF</p>
            <p>{cnpj}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Endereço</p>
            <p>{address}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente para o card de totais da nota fiscal
function InvoiceTotalsCard({ totals }: { totals: InvoiceDetail["totals"] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Valores Totais</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Produtos:</span>
            <span>{formatCurrency(totals.products)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Serviços:</span>
            <span>{formatCurrency(totals.services)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Frete:</span>
            <span>{formatCurrency(totals.shipping)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>{formatCurrency(totals.total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

