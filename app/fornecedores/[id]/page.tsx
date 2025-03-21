import type React from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { PageHeader, PageHeaderAction } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatusBadge } from "@/components/status-badge"
import type { Supplier } from "@/types/supplier"
import { formatCurrency, formatDate } from "@/lib/utils"
import { ArrowLeft, Building, FileEdit, Mail, MapPin, Phone, Star, Truck } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"

// Função para buscar fornecedor por ID (simulada)
function getSupplierById(id: string): Supplier | undefined {
  const suppliers: Record<string, Supplier> = {
    "SUPP-001": {
      id: "SUPP-001",
      name: "Cerâmicas Artesanais Ltda",
      document: "12.345.678/0001-90",
      stateRegistration: "123456789",
      address: {
        street: "Rua das Olarias",
        number: "500",
        district: "Distrito Industrial",
        city: "São Paulo",
        state: "SP",
        zipCode: "04001-000",
        country: "Brasil",
      },
      contacts: [
        {
          name: "Roberto Mendes",
          email: "roberto@ceramicasartesanais.com.br",
          phone: "(11) 98765-4321",
          position: "Gerente Comercial",
        },
        {
          name: "Maria Silva",
          email: "maria@ceramicasartesanais.com.br",
          phone: "(11) 91234-5678",
          position: "Atendimento",
        },
      ],
      status: "active",
      createdAt: "2023-01-10",
      updatedAt: "2023-06-15",
      paymentTerms: "30 dias",
      deliveryTime: 7,
      minOrderValue: 1000,
      notes: "Fornecedor de argila de alta qualidade e ferramentas especializadas.",
      categories: ["Argila", "Esmaltes", "Ferramentas"],
      rating: 4.8,
      lastPurchaseDate: "2023-06-10",
    },
  }

  return suppliers[id]
}

export default function SupplierDetailPage({ params }: { params: { id: string } }) {
  const supplier = getSupplierById(params.id)

  if (!supplier) {
    return notFound()
  }

  return (
    <DashboardShell>
      <PageHeader heading={supplier.name} text={`Detalhes do fornecedor ${supplier.id}`}>
        <div className="flex gap-2">
          <PageHeaderAction href="/fornecedores" variant="outline" icon={<ArrowLeft className="h-4 w-4" />}>
            Voltar
          </PageHeaderAction>
          <PageHeaderAction href={`/fornecedores/${supplier.id}/editar`} icon={<FileEdit className="h-4 w-4" />}>
            Editar
          </PageHeaderAction>
        </div>
      </PageHeader>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Informações do Fornecedor</CardTitle>
              <StatusBadge status={supplier.status} />
            </div>
            <CardDescription>Fornecedor de materiais para cerâmica</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList>
                <TabsTrigger value="basic">Dados Básicos</TabsTrigger>
                <TabsTrigger value="contacts">Contatos</TabsTrigger>
                <TabsTrigger value="purchases">Compras</TabsTrigger>
                <TabsTrigger value="products">Produtos</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem
                    label="Razão Social"
                    value={supplier.name}
                    icon={<Building className="h-4 w-4 text-muted-foreground" />}
                  />
                  <InfoItem
                    label="CNPJ"
                    value={supplier.document}
                    icon={<FileEdit className="h-4 w-4 text-muted-foreground" />}
                  />
                  {supplier.stateRegistration && (
                    <InfoItem
                      label="Inscrição Estadual"
                      value={supplier.stateRegistration}
                      icon={<FileEdit className="h-4 w-4 text-muted-foreground" />}
                    />
                  )}
                  <InfoItem
                    label="Data de Cadastro"
                    value={formatDate(supplier.createdAt)}
                    icon={<FileEdit className="h-4 w-4 text-muted-foreground" />}
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Endereço</h3>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p>{`${supplier.address.street}, ${supplier.address.number}`}</p>
                      {supplier.address.complement && <p>{supplier.address.complement}</p>}
                      <p>{`${supplier.address.district}, ${supplier.address.city} - ${supplier.address.state}`}</p>
                      <p>{`CEP: ${supplier.address.zipCode}, ${supplier.address.country}`}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Categorias de Produtos</h3>
                  <div className="flex flex-wrap gap-2">
                    {supplier.categories.map((category, index) => (
                      <Badge key={index} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                {supplier.notes && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Observações</h3>
                    <p className="text-sm text-muted-foreground">{supplier.notes}</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="contacts" className="space-y-4">
                {supplier.contacts.map((contact, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Truck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{contact.name}</h3>
                          {contact.position && <p className="text-sm text-muted-foreground">{contact.position}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{contact.phone}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="purchases" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="text-muted-foreground">Histórico de compras em desenvolvimento.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="products" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="text-muted-foreground">Lista de produtos fornecidos em desenvolvimento.</p>
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
                <StatusBadge status={supplier.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Avaliação</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                  <span className="font-medium">{supplier.rating?.toFixed(1) || "N/A"}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Prazo de Entrega</span>
                <span>{supplier.deliveryTime} dias</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Última Compra</span>
                <span>{supplier.lastPurchaseDate ? formatDate(supplier.lastPurchaseDate) : "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Fornecedor Desde</span>
                <span>{formatDate(supplier.createdAt)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dados Comerciais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Condições de Pagamento</span>
                <span>{supplier.paymentTerms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Valor Mínimo de Pedido</span>
                <span className="font-medium">{formatCurrency(supplier.minOrderValue || 0)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                href={`/compras/novo?fornecedor=${supplier.id}`}
                className="block w-full p-2 text-center bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Criar Nova Compra
              </Link>
              <Link
                href={`/fornecedores/${supplier.id}/editar`}
                className="block w-full p-2 text-center bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
              >
                Editar Fornecedor
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}

function InfoItem({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
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

