import type React from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { PageHeader, PageHeaderAction } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatusBadge } from "@/components/status-badge"
import type { Customer } from "@/types/customer"
import { formatCurrency, formatDate } from "@/lib/utils"
import { ArrowLeft, FileEdit, FileText, Mail, MapPin, Phone, User } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Separator } from "@/components/ui/separator"

// Função para buscar cliente por ID (simulada)
function getCustomerById(id: string): Customer | undefined {
  const customers: Record<string, Customer> = {
    "CUST-001": {
      id: "CUST-001",
      name: "João Silva",
      document: "123.456.789-00",
      email: "joao.silva@email.com",
      phone: "(11) 98765-4321",
      address: {
        street: "Rua das Flores",
        number: "123",
        district: "Jardim Primavera",
        city: "São Paulo",
        state: "SP",
        zipCode: "01234-567",
        country: "Brasil",
      },
      status: "active",
      type: "person",
      createdAt: "2023-01-15",
      updatedAt: "2023-06-20",
      notes: "Cliente frequente, prefere quartinhas de barro pequenas.",
      totalOrders: 8,
      totalSpent: 1250.75,
      lastOrderDate: "2023-06-15",
    },
  }

  return customers[id]
}

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const customer = getCustomerById(params.id)

  if (!customer) {
    return notFound()
  }

  return (
    <DashboardShell>
      <PageHeader heading={customer.name} text={`Detalhes do cliente ${customer.id}`}>
        <div className="flex gap-2">
          <PageHeaderAction href="/clientes" variant="outline" icon={<ArrowLeft className="h-4 w-4" />}>
            Voltar
          </PageHeaderAction>
          <PageHeaderAction href={`/clientes/${customer.id}/editar`} icon={<FileEdit className="h-4 w-4" />}>
            Editar
          </PageHeaderAction>
        </div>
      </PageHeader>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Informações do Cliente</CardTitle>
              <StatusBadge status={customer.status} />
            </div>
            <CardDescription>Cliente desde {formatDate(customer.createdAt)}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList>
                <TabsTrigger value="basic">Dados Básicos</TabsTrigger>
                <TabsTrigger value="orders">Pedidos</TabsTrigger>
                <TabsTrigger value="financial">Financeiro</TabsTrigger>
                <TabsTrigger value="history">Histórico</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem
                    label="Nome"
                    value={customer.name}
                    icon={<User className="h-4 w-4 text-muted-foreground" />}
                  />
                  <InfoItem
                    label={customer.type === "person" ? "CPF" : "CNPJ"}
                    value={customer.document}
                    icon={<FileText className="h-4 w-4 text-muted-foreground" />}
                  />
                  <InfoItem
                    label="E-mail"
                    value={customer.email}
                    icon={<Mail className="h-4 w-4 text-muted-foreground" />}
                  />
                  <InfoItem
                    label="Telefone"
                    value={customer.phone}
                    icon={<Phone className="h-4 w-4 text-muted-foreground" />}
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Endereço</h3>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p>{`${customer.address.street}, ${customer.address.number}`}</p>
                      {customer.address.complement && <p>{customer.address.complement}</p>}
                      <p>{`${customer.address.district}, ${customer.address.city} - ${customer.address.state}`}</p>
                      <p>{`CEP: ${customer.address.zipCode}, ${customer.address.country}`}</p>
                    </div>
                  </div>
                </div>

                {customer.notes && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Observações</h3>
                    <p className="text-sm text-muted-foreground">{customer.notes}</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="orders" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pedidos Recentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="h-10 px-4 text-left align-middle font-medium">Pedido</th>
                            <th className="h-10 px-4 text-left align-middle font-medium">Data</th>
                            <th className="h-10 px-4 text-right align-middle font-medium">Valor</th>
                            <th className="h-10 px-4 text-left align-middle font-medium">Status</th>
                            <th className="h-10 px-4 text-right align-middle font-medium">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-4 align-middle font-medium">ORD-2023-008</td>
                            <td className="p-4 align-middle">{formatDate(customer.lastOrderDate || "")}</td>
                            <td className="p-4 align-middle text-right">{formatCurrency(189.9)}</td>
                            <td className="p-4 align-middle">
                              <StatusBadge status="completed" />
                            </td>
                            <td className="p-4 align-middle text-right">
                              <Link href={`/pedidos/ORD-2023-008`} className="text-sm text-primary hover:underline">
                                Ver detalhes
                              </Link>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-4 align-middle font-medium">ORD-2023-007</td>
                            <td className="p-4 align-middle">15/05/2023</td>
                            <td className="p-4 align-middle text-right">{formatCurrency(129.9)}</td>
                            <td className="p-4 align-middle">
                              <StatusBadge status="completed" />
                            </td>
                            <td className="p-4 align-middle text-right">
                              <Link href={`/pedidos/ORD-2023-007`} className="text-sm text-primary hover:underline">
                                Ver detalhes
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 align-middle font-medium">ORD-2023-006</td>
                            <td className="p-4 align-middle">02/04/2023</td>
                            <td className="p-4 align-middle text-right">{formatCurrency(249.9)}</td>
                            <td className="p-4 align-middle">
                              <StatusBadge status="completed" />
                            </td>
                            <td className="p-4 align-middle text-right">
                              <Link href={`/pedidos/ORD-2023-006`} className="text-sm text-primary hover:underline">
                                Ver detalhes
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 flex justify-center">
                      <Link href={`/pedidos?cliente=${customer.id}`} className="text-sm text-primary hover:underline">
                        Ver todos os pedidos
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financial" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Financeiras</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoItem label="Total Gasto" value={formatCurrency(customer.totalSpent || 0)} />
                        <InfoItem
                          label="Ticket Médio"
                          value={formatCurrency((customer.totalSpent || 0) / (customer.totalOrders || 1))}
                        />
                        <InfoItem label="Forma de Pagamento Preferida" value="Cartão de Crédito" />
                        <InfoItem label="Última Compra" value={formatDate(customer.lastOrderDate || "")} />
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-sm font-medium mb-2">Faturas Pendentes</h3>
                        <div className="rounded-md border">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b bg-muted/50">
                                <th className="h-10 px-4 text-left align-middle font-medium">Fatura</th>
                                <th className="h-10 px-4 text-left align-middle font-medium">Vencimento</th>
                                <th className="h-10 px-4 text-right align-middle font-medium">Valor</th>
                                <th className="h-10 px-4 text-left align-middle font-medium">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="p-4 align-middle text-center" colSpan={4}>
                                  Nenhuma fatura pendente
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Atividades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Pedido Realizado</p>
                          <p className="text-xs text-muted-foreground">{formatDate(customer.lastOrderDate || "")}</p>
                          <p className="text-sm mt-1">Cliente realizou o pedido ORD-2023-008 no valor de R$ 189,90.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">E-mail Enviado</p>
                          <p className="text-xs text-muted-foreground">20/05/2023</p>
                          <p className="text-sm mt-1">E-mail de promoção enviado para o cliente.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <FileEdit className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Cadastro Atualizado</p>
                          <p className="text-xs text-muted-foreground">{formatDate(customer.updatedAt)}</p>
                          <p className="text-sm mt-1">Informações do cliente foram atualizadas.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Cliente Cadastrado</p>
                          <p className="text-xs text-muted-foreground">{formatDate(customer.createdAt)}</p>
                          <p className="text-sm mt-1">Cliente foi cadastrado no sistema.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <StatusBadge status={customer.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total de Pedidos</span>
                <span className="font-medium">{customer.totalOrders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Gasto</span>
                <span className="font-medium">{formatCurrency(customer.totalSpent || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Último Pedido</span>
                <span>{customer.lastOrderDate ? formatDate(customer.lastOrderDate) : "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Cliente Desde</span>
                <span>{formatDate(customer.createdAt)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{customer.phone}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                href={`/pedidos/novo?cliente=${customer.id}`}
                className="block w-full p-2 text-center bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Criar Novo Pedido
              </Link>
              <Link
                href={`/clientes/${customer.id}/editar`}
                className="block w-full p-2 text-center bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
              >
                Editar Cliente
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

