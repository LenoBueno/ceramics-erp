"use client"

import type React from "react"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { PageHeader, PageHeaderAction } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Check, Plus, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"

// Tipo para item de contagem
interface CountItem {
  id: string
  productId: string
  productName: string
  productCode: string
  expectedQuantity: number
  actualQuantity: number
  difference: number
  notes?: string
}

export default function InventoryCountPage() {
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()
  const [items, setItems] = useState<CountItem[]>([
    {
      id: "1",
      productId: "1",
      productName: "Quartinha de Barro Pequena",
      productCode: "QBP-001",
      expectedQuantity: 15,
      actualQuantity: 15,
      difference: 0
    },
    {
      id: "2",
      productId: "2",
      productName: "Quartinha de Barro Média",
      productCode: "QBM-002",
      expectedQuantity: 8,
      actualQuantity: 8,
      difference: 0
    },
    {
      id: "3",
      productId: "3",
      productName: "Quartinha de Barro Grande",
      productCode: "QBG-003",
      expectedQuantity: 5,
      actualQuantity: 5,
      difference: 0
    }
  ])
  
  const [location, setLocation] = useState("")
  const [notes, setNotes] = useState("")
  
  const updateActualQuantity = (id: string, quantity: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const actualQuantity = quantity
        const difference = actualQuantity - item.expectedQuantity
        return { ...item, actualQuantity, difference }
      }
      return item
    }))
  }
  
  const updateItemNotes = (id: string, notes: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, notes }
      }
      return item
    }))
  }
  
  const addProduct = () => {
    // Aqui seria implementada a lógica para adicionar um produto à contagem
    // Por simplicidade, adicionamos um produto fictício
    const newItem: CountItem = {
      id: `${items.length + 1}`,
      productId: "4",
      productName: "Quartinha de Porcelana Decorada",
      productCode: "QPD-004",
      expectedQuantity: 12,
      actualQuantity: 12,
      difference: 0
    }
    
    setItems([...items, newItem])
  }
  
  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Aqui seria implementada a lógica para salvar a contagem de estoque
    toast({
      title: "Contagem de estoque salva",
      description: "A contagem de estoque foi registrada com sucesso."
    })
    
    // Redirecionar para a lista de produtos em estoque
    setTimeout(() => {
      navigate("/estoque")
    }, 1500)
  }
  
  return (
    <DashboardShell>
      <PageHeader 
        heading="Contagem de Estoque" 
        text="Realize a contagem física do estoque."
      >
        <PageHeaderAction 
          href="/estoque" 
          variant="outline" 
          icon={<ArrowLeft className="h-4 w-4" />}
        >
          Voltar
        </PageHeaderAction>
      </PageHeader>
      
      <div className="mt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Contagem</CardTitle>
                <CardDescription>
                  Preencha os dados gerais da contagem de estoque.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Data da Contagem</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      defaultValue={new Date().toISOString().split('T')[0]} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Localização</Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Selecione a localização" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todo o Estoque</SelectItem>
                        <SelectItem value="shelf_a">Prateleira A</SelectItem>
                        <SelectItem value="shelf_b">Prateleira B</SelectItem>
                        <SelectItem value="shelf_c">Prateleira C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Observações Gerais</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Observações sobre a contagem..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Itens da Contagem</CardTitle>
                  <CardDescription>
                    Registre as quantidades encontradas durante a contagem física.
                  </CardDescription>
                </div>
                <Button type="button" variant="outline" onClick={addProduct}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Produto
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-10 px-4 text-left align-middle font-medium">Produto</th>
                        <th className="h-10 px-4 text-center align-middle font-medium">Estoque Sistema</th>
                        <th className="h-10 px-4 text-center align-middle font-medium">Contagem Física</th>
                        <th className="h-10 px-4 text-center align-middle font-medium">Diferença</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Observações</th>
                        <th className="h-10 px-4 text-center align-middle font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-b">
                            => (
                        <tr key={item.id} className="border-b">
                          <td className="p-4 align-middle">
                            <div>
                              <div className="font-medium">{item.productName}</div>
                              <div className="text-xs text-muted-foreground">{item.productCode}</div>
                            </div>
                          </td>
                          <td className="p-4 align-middle text-center">{item.expectedQuantity}</td>
                          <td className="p-4 align-middle text-center">
                            <Input 
                              type="number" 
                              min="0" 
                              value={item.actualQuantity}
                              onChange={(e) => updateActualQuantity(item.id, Number(e.target.value))}
                              className="w-20 mx-auto text-center"
                            />
                          </td>
                          <td className="p-4 align-middle text-center">
                            <span className={item.difference === 0 ? "" : item.difference > 0 ? "text-green-500" : "text-red-500"}>
                              {item.difference > 0 ? `+${item.difference}` : item.difference}
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <Input 
                              placeholder="Observações..."
                              value={item.notes || ""}
                              onChange={(e) => updateItemNotes(item.id, e.target.value)}
                            />
                          </td>
                          <td className="p-4 align-middle text-center">
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" asChild>
                  <Link to="/estoque">Cancelar</Link>
                </Button>
                <Button type="submit">
                  <Check className="h-4 w-4 mr-2" />
                  Finalizar Contagem
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </div>
    </DashboardShell>
  )
}

