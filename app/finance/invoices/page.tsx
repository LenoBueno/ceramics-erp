import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, ArrowUpDown, FileText, Download, Eye, MoreHorizontal, RefreshCw } from "lucide-react"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import type { InvoiceData } from "@/types/invoice"
import { getInvoiceStatusConfig } from "@/lib/invoice-helpers"

// Dados de exemplo movidos para um arquivo separado
import { mockInvoices } from "@/data/mock-invoices"

export default function InvoicesPage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <PageHeader />
      <InvoicesList invoices={mockInvoices} />
    </div>
  )
}

// Componente para o cabeçalho da página
function PageHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Notas Fiscais</h1>
      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link href="/finance/invoices/import">
            <Download className="mr-2 h-4 w-4" />
            Importar XML
          </Link>
        </Button>
        <Button asChild>
          <Link href="/finance/invoices/new">
            <Plus className="mr-2 h-4 w-4" />
            Emitir Nota Fiscal
          </Link>
        </Button>
      </div>
    </div>
  )
}

// Componente para a lista de notas fiscais
function InvoicesList({ invoices }: { invoices: InvoiceData[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Notas Fiscais Eletrônicas</CardTitle>
              <CardDescription>Gerencie todas as notas fiscais emitidas</CardDescription>
            </div>
          </div>

          <InvoicesFilter />
        </div>
      </CardHeader>
      <CardContent>
        <InvoicesTabs invoices={invoices} />
      </CardContent>
    </Card>
  )
}

// Componente para os filtros de notas fiscais
function InvoicesFilter() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="authorized">Autorizadas</TabsTrigger>
          <TabsTrigger value="processing">Processando</TabsTrigger>
          <TabsTrigger value="rejected">Rejeitadas</TabsTrigger>
          <TabsTrigger value="canceled">Canceladas</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <DateRangePicker />

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar notas fiscais..." className="pl-8 w-full sm:w-[250px]" />
        </div>
      </div>
    </div>
  )
}

// Componente para as abas de notas fiscais
function InvoicesTabs({ invoices }: { invoices: InvoiceData[] }) {
  return (
    <Tabs defaultValue="all">
      <TabsContent value="all" className="m-0">
        <InvoicesTable invoices={invoices} />
      </TabsContent>

      <TabsContent value="authorized" className="m-0">
        <InvoicesTable invoices={invoices.filter((invoice) => invoice.status === "authorized")} />
      </TabsContent>

      <TabsContent value="processing" className="m-0">
        <InvoicesTable invoices={invoices.filter((invoice) => invoice.status === "processing")} />
      </TabsContent>

      <TabsContent value="rejected" className="m-0">
        <InvoicesTable invoices={invoices.filter((invoice) => invoice.status === "rejected")} />
      </TabsContent>

      <TabsContent value="canceled" className="m-0">
        <InvoicesTable invoices={invoices.filter((invoice) => invoice.status === "canceled")} />
      </TabsContent>
    </Tabs>
  )
}

// Componente para a tabela de notas fiscais
function InvoicesTable({ invoices }: { invoices: InvoiceData[] }) {
  if (invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md">
        <FileText className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">Nenhuma nota fiscal encontrada.</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">
              <div className="flex items-center space-x-1">
                <span>Número</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>Série</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>CNPJ/CPF</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <InvoiceTableRow key={invoice.id} invoice={invoice} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// Componente para cada linha da tabela de notas fiscais
function InvoiceTableRow({ invoice }: { invoice: InvoiceData }) {
  const statusConfig = getInvoiceStatusConfig(invoice.status)

  return (
    <TableRow>
      <TableCell className="font-medium">
        <Link href={`/finance/invoices/${invoice.number}`} className="hover:underline">
          {invoice.number}
        </Link>
      </TableCell>
      <TableCell>{invoice.series}</TableCell>
      <TableCell>{invoice.date}</TableCell>
      <TableCell>{invoice.customer}</TableCell>
      <TableCell>{invoice.cnpj}</TableCell>
      <TableCell className="text-right">R$ {invoice.value.toFixed(2)}</TableCell>
      <TableCell>
        <Badge className={statusConfig.className} variant="outline">
          {statusConfig.label}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <InvoiceActions invoice={invoice} />
      </TableCell>
    </TableRow>
  )
}

// Componente para as ações de cada nota fiscal
function InvoiceActions({ invoice }: { invoice: InvoiceData }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/finance/invoices/${invoice.number}`}>
            <Eye className="mr-2 h-4 w-4" />
            Visualizar
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download className="mr-2 h-4 w-4" />
          Baixar PDF
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download className="mr-2 h-4 w-4" />
          Baixar XML
        </DropdownMenuItem>
        {invoice.status === "processing" && (
          <DropdownMenuItem>
            <RefreshCw className="mr-2 h-4 w-4" />
            Verificar Status
          </DropdownMenuItem>
        )}
        {invoice.status === "authorized" && (
          <DropdownMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            Cancelar NF-e
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

