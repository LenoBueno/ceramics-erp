"use client"

import type React from "react"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { PageHeader, PageHeaderAction } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X } from "lucide-react"
import { Link } from "react-router-dom"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"

export default function NewSupplierPage() {
  const [activeTab, setActiveTab] = useState("basic")
  const [categories, setCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState("")
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory])
      setNewCategory("")
    }
  }

  const handleRemoveCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui seria implementada a lógica de criação do fornecedor
    toast({
      title: "Fornecedor criado com sucesso",
      description: "O fornecedor foi adicionado ao sistema.",
    })

    // Redirecionar para a lista de fornecedores
    setTimeout(() => {
      navigate("/fornecedores")
    }, 1500)
  }

  return (
    <DashboardShell>
      <PageHeader heading="Novo Fornecedor" text="Adicione um novo fornecedor ao sistema.">
        <PageHeaderAction href="/fornecedores" variant="outline" icon={<ArrowLeft className="h-4 w-4" />}>
          Voltar
        </PageHeaderAction>
      </PageHeader>

      <div className="mt-6">
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">Dados Básicos</TabsTrigger>
              <TabsTrigger value="address">Endereço</TabsTrigger>
              <TabsTrigger value="contacts">Contatos</TabsTrigger>
              <TabsTrigger value="commercial">Dados Comerciais</TabsTrigger>
            </TabsList>

            <Card>
              <CardContent className="pt-6">
                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Razão Social</Label>
                      <Input id="name" placeholder="Razão social completa" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="document">CNPJ</Label>
                      <Input id="document" placeholder="00.000.000/0000-00" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stateRegistration">Inscrição Estadual</Label>
                      <Input id="stateRegistration" placeholder="Inscrição Estadual" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select defaultValue="active">
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Ativo</SelectItem>
                          <SelectItem value="inactive">Inativo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="notes">Observações</Label>
                      <Textarea id="notes" placeholder="Observações sobre o fornecedor" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="address" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="street">Rua/Avenida</Label>
                      <Input id="street" placeholder="Nome da rua ou avenida" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="number">Número</Label>
                      <Input id="number" placeholder="Número" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="complement">Complemento</Label>
                      <Input id="complement" placeholder="Complemento" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="district">Bairro</Label>
                      <Input id="district" placeholder="Bairro" />
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

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">CEP</Label>
                      <Input id="zipCode" placeholder="00000-000" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">País</Label>
                      <Input id="country" placeholder="País" defaultValue="Brasil" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contacts" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Nome do Contato</Label>
                      <Input id="contactName" placeholder="Nome completo" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPosition">Cargo</Label>
                      <Input id="contactPosition" placeholder="Cargo ou função" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">E-mail</Label>
                      <Input id="contactEmail" type="email" placeholder="email@exemplo.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Telefone</Label>
                      <Input id="contactPhone" placeholder="(00) 00000-0000" />
                    </div>
                  </div>

                  <Button type="button" variant="outline" className="mt-2">
                    Adicionar Outro Contato
                  </Button>
                </TabsContent>

                <TabsContent value="commercial" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="paymentTerms">Condições de Pagamento</Label>
                      <Select>
                        <SelectTrigger id="paymentTerms">
                          <SelectValue placeholder="Selecione as condições" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a_vista">À Vista</SelectItem>
                          <SelectItem value="15_dias">15 Dias</SelectItem>
                          <SelectItem value="30_dias">30 Dias</SelectItem>
                          <SelectItem value="45_dias">45 Dias</SelectItem>
                          <SelectItem value="60_dias">60 Dias</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deliveryTime">Prazo de Entrega (dias)</Label>
                      <Input id="deliveryTime" type="number" min="1" placeholder="7" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="minOrderValue">Valor Mínimo de Pedido (R$)</Label>
                      <Input id="minOrderValue" type="number" min="0" step="0.01" placeholder="0.00" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rating">Avaliação (1-5)</Label>
                      <Input id="rating" type="number" min="1" max="5" step="0.1" placeholder="5.0" />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Categorias de Produtos</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {categories.map((category) => (
                          <Badge key={category} variant="secondary" className="flex items-center gap-1">
                            {category}
                            <button
                              type="button"
                              onClick={() => handleRemoveCategory(category)}
                              className="ml-1 rounded-full hover:bg-destructive/20"
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remover</span>
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          placeholder="Nova categoria"
                        />
                        <Button type="button" variant="outline" onClick={handleAddCategory} disabled={!newCategory}>
                          <Plus className="h-4 w-4 mr-1" />
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4 mt-4">
              <Button type="button" variant="outline" asChild>
                <Link to="/fornecedores">Cancelar</Link>
              </Button>
              <Button type="submit">Salvar Fornecedor</Button>
            </div>
          </Tabs>
        </form>
      </div>
    </DashboardShell>
  )
}

