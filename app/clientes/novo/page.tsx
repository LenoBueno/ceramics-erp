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
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"

export default function NewCustomerPage() {
  const [activeTab, setActiveTab] = useState("basic")
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui seria implementada a lógica de criação do cliente
    toast({
      title: "Cliente criado com sucesso",
      description: "O cliente foi adicionado ao sistema.",
    })

    // Redirecionar para a lista de clientes
    setTimeout(() => {
      navigate("/clientes")
    }, 1500)
  }

  return (
    <DashboardShell>
      <PageHeader heading="Novo Cliente" text="Adicione um novo cliente ao sistema.">
        <PageHeaderAction href="/clientes" variant="outline" icon={<ArrowLeft className="h-4 w-4" />}>
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
              <TabsTrigger value="financial">Dados Financeiros</TabsTrigger>
            </TabsList>

            <Card>
              <CardContent className="pt-6">
                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome/Razão Social</Label>
                      <Input id="name" placeholder="Nome completo ou razão social" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo de Cliente</Label>
                      <Select defaultValue="company">
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="company">Pessoa Jurídica</SelectItem>
                          <SelectItem value="individual">Pessoa Física</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="document">CNPJ/CPF</Label>
                      <Input id="document" placeholder="00.000.000/0000-00" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stateRegistration">Inscrição Estadual</Label>
                      <Input id="stateRegistration" placeholder="Inscrição Estadual" />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="notes">Observações</Label>
                      <Textarea id="notes" placeholder="Observações sobre o cliente" />
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

                <TabsContent value="financial" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="creditLimit">Limite de Crédito (R$)</Label>
                      <Input id="creditLimit" type="number" placeholder="0.00" />
                    </div>

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
                  </div>
                </TabsContent>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4 mt-4">
              <Button type="button" variant="outline" asChild>
                <Link to="/clientes">Cancelar</Link>
              </Button>
              <Button type="submit">Salvar Cliente</Button>
            </div>
          </Tabs>
        </form>
      </div>
    </DashboardShell>
  )
}

