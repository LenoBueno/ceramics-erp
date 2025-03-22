"use client"

import { useState, useCallback, useMemo } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, Plus, Trash2, Save, Send, Calculator } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import type { InvoiceItem } from "@/types/invoice"
import { calculateInvoiceTotals, formatCurrency } from "@/lib/invoice-helpers"

export default function NewInvoicePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 1, description: "", code: "", ncm: "", quantity: 1, unitPrice: 0, total: 0 },
  ])

  // Adicionar um novo item à nota fiscal
  const addItem = useCallback(() => {
    const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1
    setItems((prevItems) => [
      ...prevItems,
      {
        id: newId,
        description: "",
        code: "",
        ncm: "",
        quantity: 1,
        unitPrice: 0,
        total: 0,
      },
    ])
  }, [items])

  // Remover um item da nota fiscal
  const removeItem = useCallback(
    (id: number) => {
      if (items.length > 1) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id))
      }
    },
    [items.length],
  )

  // Atualizar um campo de um item
  const updateItem = useCallback((id: number, field: keyof InvoiceItem, value: string | number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }

          // Recalcular o total se quantidade ou preço unitário mudar
          if (field === "quantity" || field === "unitPrice") {
            updatedItem.total = Number(updatedItem.quantity) * Number(updatedItem.unitPrice)
          }

          return updatedItem
        }
        return item
      }),
    )
  }, [])

  // Calcular totais da nota fiscal
  const { subtotal, tax, total } = useMemo(() => {
    return calculateInvoiceTotals(items)
  }, [items])

  // Função para lidar com a submissão do formulário
  const handleSubmit = useCallback(
    (draft = false) => {
      // Aqui seria implementada a lógica de envio para a API
      console.log({
        date,
        items,
        totals: { subtotal, tax, total },
        isDraft: draft,
      })

      // Exibir feedback ao usuário
      alert(draft ? "Rascunho salvo com sucesso!" : "Nota fiscal enviada para processamento!")
    },
    [date, items, subtotal, tax, total],
  )

  return (
    <div className="flex flex-col space-y-6 p-6">
      <PageHeader onSaveDraft={() => handleSubmit(true)} onSubmit={() => handleSubmit(false)} />

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Dados Básicos</TabsTrigger>
          <TabsTrigger value="items">Itens</TabsTrigger>
          <TabsTrigger value="additional">Dados Adicionais</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <BasicInfoTab date={date} setDate={setDate} />
        </TabsContent>

        <TabsContent value="items">
          <ItemsTab
            items={items}
            onAddItem={addItem}
            onRemoveItem={removeItem}
            onUpdateItem={updateItem}
            subtotal={subtotal}
            tax={tax}
            total={total}
          />
        </TabsContent>

        <TabsContent value="additional">
          <AdditionalInfoTab onSubmit={() => handleSubmit(false)} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Componente para o cabeçalho da página
function PageHeader({
  onSaveDraft,
  onSubmit,
}: {
  onSaveDraft: () => void
  onSubmit: () => void
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link to="/finance/invoices">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Emitir Nota Fiscal</h1>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onSaveDraft}>
          <Save className="mr-2 h-4 w-4" />
          Salvar Rascunho
        </Button>
        <Button onClick={onSubmit}>
          <Send className="mr-2 h-4 w-4" />
          Emitir NF-e
        </Button>
      </div>
    </div>
  )
}

// Componente para a aba de informações básicas
function BasicInfoTab({
  date,
  setDate,
}: {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações da Nota Fiscal</CardTitle>
        <CardDescription>Preencha os dados básicos da nota fiscal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <InvoiceBasicInfo date={date} setDate={setDate} />

        <Separator />

        <CustomerInfo />
      </CardContent>
    </Card>
  )
}

// Componente para informações básicas da nota fiscal
function InvoiceBasicInfo({
  date,
  setDate,
}: {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <Label htmlFor="operation-type">Tipo de Operação</Label>
        <Select defaultValue="1">
          <SelectTrigger id="operation-type">
            <SelectValue placeholder="Selecione o tipo de operação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Saída</SelectItem>
            <SelectItem value="0">Entrada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nature">Natureza da Operação</Label>
        <Select defaultValue="venda">
          <SelectTrigger id="nature">
            <SelectValue placeholder="Selecione a natureza" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="venda">Venda de Mercadorias</SelectItem>
            <SelectItem value="servico">Prestação de Serviços</SelectItem>
            <SelectItem value="devolucao">Devolução</SelectItem>
            <SelectItem value="outras">Outras</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="invoice-date">Data de Emissão</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione a data</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

// Componente para informações do cliente
function CustomerInfo() {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Dados do Cliente</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="customer-type">Tipo de Cliente</Label>
          <Select defaultValue="legal">
            <SelectTrigger id="customer-type">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="legal">Pessoa Jurídica</SelectItem>
              <SelectItem value="individual">Pessoa Física</SelectItem>
              <SelectItem value="foreign">Estrangeiro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customer">Cliente</Label>
          <Select>
            <SelectTrigger id="customer">
              <SelectValue placeholder="Selecione o cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Artesanato Brasil</SelectItem>
              <SelectItem value="2">Casa & Decoração</SelectItem>
              <SelectItem value="3">Cerâmicas Elite</SelectItem>
              <SelectItem value="4">Galeria Cerâmica</SelectItem>
              <SelectItem value="5">Decor Artesanal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cnpj">CNPJ/CPF</Label>
          <Input id="cnpj" placeholder="00.000.000/0000-00" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ie">Inscrição Estadual</Label>
          <Input id="ie" placeholder="Inscrição Estadual" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Endereço</Label>
          <Input id="address" placeholder="Endereço completo" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" placeholder="Cidade" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Select>
            <SelectTrigger id="state">
              <SelectValue placeholder="UF" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SP">SP</SelectItem>
              <SelectItem value="RJ">RJ</SelectItem>
              <SelectItem value="MG">MG</SelectItem>
              <SelectItem value="ES">ES</SelectItem>
              {/* Outros estados brasileiros seriam listados aqui */}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

// Componente para a aba de itens
function ItemsTab({
  items,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
  subtotal,
  tax,
  total,
}: {
  items: InvoiceItem[]
  onAddItem: () => void
  onRemoveItem: (id: number) => void
  onUpdateItem: (id: number, field: keyof InvoiceItem, value: string | number) => void
  subtotal: number
  tax: number
  total: number
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Itens da Nota Fiscal</CardTitle>
        <CardDescription>Adicione os produtos ou serviços</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Código</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="w-[100px]">NCM</TableHead>
                <TableHead className="w-[100px]">Qtd</TableHead>
                <TableHead className="w-[150px]">Valor Unit.</TableHead>
                <TableHead className="w-[150px]">Total</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <InvoiceItemRow
                  key={item.id}
                  item={item}
                  onRemove={onRemoveItem}
                  onUpdate={onUpdateItem}
                  canRemove={items.length > 1}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex justify-between">
          <Button variant="outline" onClick={onAddItem}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Item
          </Button>

          <Button variant="outline">
            <Calculator className="mr-2 h-4 w-4" />
            Calcular Impostos
          </Button>
        </div>

        <InvoiceTotals subtotal={subtotal} tax={tax} total={total} />
      </CardContent>
    </Card>
  )
}

// Componente para uma linha de item da nota fiscal
function InvoiceItemRow({
  item,
  onRemove,
  onUpdate,
  canRemove,
}: {
  item: InvoiceItem
  onRemove: (id: number) => void
  onUpdate: (id: number, field: keyof InvoiceItem, value: string | number) => void
  canRemove: boolean
}) {
  return (
    <TableRow>
      <TableCell>
        <Input value={item.code} onChange={(e) => onUpdate(item.id, "code", e.target.value)} placeholder="Código" />
      </TableCell>
      <TableCell>
        <Input
          value={item.description}
          onChange={(e) => onUpdate(item.id, "description", e.target.value)}
          placeholder="Descrição do produto"
        />
      </TableCell>
      <TableCell>
        <Input value={item.ncm} onChange={(e) => onUpdate(item.id, "ncm", e.target.value)} placeholder="NCM" />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onUpdate(item.id, "quantity", Number(e.target.value))}
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          min="0"
          step="0.01"
          value={item.unitPrice}
          onChange={(e) => onUpdate(item.id, "unitPrice", Number(e.target.value))}
          className="text-right"
        />
      </TableCell>
      <TableCell className="text-right font-medium">{formatCurrency(item.total)}</TableCell>
      <TableCell>
        <Button variant="ghost" size="icon" onClick={() => onRemove(item.id)} disabled={!canRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
}

// Componente para exibir os totais da nota fiscal
function InvoiceTotals({
  subtotal,
  tax,
  total,
}: {
  subtotal: number
  tax: number
  total: number
}) {
  return (
    <div className="mt-6 flex flex-col items-end">
      <div className="w-full max-w-md space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Impostos (18%):</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  )
}

// Componente para a aba de informações adicionais
function AdditionalInfoTab({ onSubmit }: { onSubmit: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Adicionais</CardTitle>
        <CardDescription>Preencha os dados complementares da nota fiscal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="payment-method">Forma de Pagamento</Label>
            <Select defaultValue="avista">
              <SelectTrigger id="payment-method">
                <SelectValue placeholder="Selecione a forma de pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="avista">À Vista</SelectItem>
                <SelectItem value="prazo">A Prazo</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-indicator">Indicador de Pagamento</Label>
            <Select defaultValue="0">
              <SelectTrigger id="payment-indicator">
                <SelectValue placeholder="Selecione o indicador" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Pagamento à Vista</SelectItem>
                <SelectItem value="1">Pagamento a Prazo</SelectItem>
                <SelectItem value="2">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transport-mode">Modalidade de Frete</Label>
            <Select defaultValue="0">
              <SelectTrigger id="transport-mode">
                <SelectValue placeholder="Selecione a modalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Por conta do Remetente</SelectItem>
                <SelectItem value="1">Por conta do Destinatário</SelectItem>
                <SelectItem value="2">Por conta de Terceiros</SelectItem>
                <SelectItem value="9">Sem Frete</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transport-vehicle">Veículo de Transporte</Label>
            <Input id="transport-vehicle" placeholder="Placa do veículo" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="additional-info">Informações Complementares</Label>
          <Textarea
            id="additional-info"
            placeholder="Informações adicionais para a nota fiscal"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fiscal-info">Informações Fiscais</Label>
          <Textarea id="fiscal-info" placeholder="Informações de interesse do fisco" className="min-h-[100px]" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/finance/invoices">Cancelar</Link>
        </Button>
        <Button onClick={onSubmit}>
          <Send className="mr-2 h-4 w-4" />
          Emitir NF-e
        </Button>
      </CardFooter>
    </Card>
  )
}

