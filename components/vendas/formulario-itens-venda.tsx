"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { formatarMoeda } from "@/lib/utils"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"

interface ItemVenda {
  id: number
  produto: string
  produtoId: number
  quantidade: number
  valorUnitario: number
  desconto: number
  subtotal: number
}

export function FormularioItensVenda() {
  const [itens, setItens] = useState<ItemVenda[]>([
    {
      id: 1,
      produto: "Azulejo Decorativo 20x20cm",
      produtoId: 1,
      quantidade: 50,
      valorUnitario: 15.9,
      desconto: 0,
      subtotal: 795.0,
    },
    {
      id: 2,
      produto: "Porcelanato Polido 60x60cm",
      produtoId: 2,
      quantidade: 30,
      valorUnitario: 89.9,
      desconto: 269.7,
      subtotal: 2427.3,
    },
  ])

  const adicionarItem = () => {
    const novoId = itens.length > 0 ? Math.max(...itens.map((item) => item.id)) + 1 : 1
    setItens([
      ...itens,
      {
        id: novoId,
        produto: "",
        produtoId: 0,
        quantidade: 1,
        valorUnitario: 0,
        desconto: 0,
        subtotal: 0,
      },
    ])
  }

  const removerItem = (id: number) => {
    setItens(itens.filter((item) => item.id !== id))
  }

  const calcularTotais = () => {
    const subtotal = itens.reduce((total, item) => total + item.subtotal, 0)
    const descontoTotal = itens.reduce((total, item) => total + item.desconto, 0)
    const frete = 150.0
    const total = subtotal + frete

    return { subtotal, descontoTotal, frete, total }
  }

  const totais = calcularTotais()

  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        <div className="p-4 space-y-4">
          {itens.map((item, index) => (
            <div key={item.id} className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-4">
                <Label htmlFor={`produto-${item.id}`}>Produto</Label>
                <Select defaultValue={item.produtoId.toString()}>
                  <SelectTrigger id={`produto-${item.id}`}>
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Azulejo Decorativo 20x20cm</SelectItem>
                    <SelectItem value="2">Porcelanato Polido 60x60cm</SelectItem>
                    <SelectItem value="3">Revestimento Cerâmico 30x60cm</SelectItem>
                    <SelectItem value="4">Pastilha de Porcelana 5x5cm</SelectItem>
                    <SelectItem value="5">Tijolo Aparente Cerâmico</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor={`quantidade-${item.id}`}>Quantidade</Label>
                <Input id={`quantidade-${item.id}`} type="number" min="1" defaultValue={item.quantidade} />
              </div>

              <div className="col-span-2">
                <Label htmlFor={`valor-${item.id}`}>Valor Unit.</Label>
                <Input id={`valor-${item.id}`} defaultValue={formatarMoeda(item.valorUnitario)} />
              </div>

              <div className="col-span-2">
                <Label htmlFor={`desconto-${item.id}`}>Desconto</Label>
                <Input id={`desconto-${item.id}`} defaultValue={formatarMoeda(item.desconto)} />
              </div>

              <div className="col-span-1">
                <Label htmlFor={`subtotal-${item.id}`}>Subtotal</Label>
                <Input id={`subtotal-${item.id}`} defaultValue={formatarMoeda(item.subtotal)} disabled />
              </div>

              <div className="col-span-1">
                <Button variant="ghost" size="icon" onClick={() => removerItem(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {index < itens.length - 1 && (
                <div className="col-span-12">
                  <Separator />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={adicionarItem}>
        <Plus className="mr-2 h-4 w-4" />
        Adicionar Produto
      </Button>

      <div className="flex justify-between mt-6">
        <div className="w-1/2">
          <Label htmlFor="observacoes-itens">Observações sobre os itens</Label>
          <Input id="observacoes-itens" placeholder="Observações sobre os produtos..." />
        </div>

        <div className="w-1/3 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>{formatarMoeda(totais.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Desconto:</span>
            <span>-{formatarMoeda(totais.descontoTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Frete:</span>
            <span>{formatarMoeda(totais.frete)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Total:</span>
            <span>{formatarMoeda(totais.total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

