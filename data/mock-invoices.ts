import type { InvoiceData } from "@/types/invoice"

// Dados de exemplo para notas fiscais
export const mockInvoices: InvoiceData[] = [
  {
    id: "NF-e 123456789",
    number: "123456789",
    series: "001",
    date: "2025-03-19",
    customer: "Artesanato Brasil",
    cnpj: "12.345.678/0001-90",
    value: 5630.25,
    status: "authorized",
    accessKey: "35250319123456789012345678901234567890123456",
  },
  {
    id: "NF-e 123456790",
    number: "123456790",
    series: "001",
    date: "2025-03-18",
    customer: "Casa & Decoração",
    cnpj: "23.456.789/0001-01",
    value: 3210.5,
    status: "authorized",
    accessKey: "35250318234567890123456789012345678901234567",
  },
  {
    id: "NF-e 123456791",
    number: "123456791",
    series: "001",
    date: "2025-03-17",
    customer: "Cerâmicas Elite",
    cnpj: "34.567.890/0001-12",
    value: 2950.75,
    status: "authorized",
    accessKey: "35250317345678901234567890123456789012345678",
  },
  {
    id: "NF-e 123456792",
    number: "123456792",
    series: "001",
    date: "2025-03-16",
    customer: "Galeria Cerâmica",
    cnpj: "45.678.901/0001-23",
    value: 4850.0,
    status: "processing",
    accessKey: "",
  },
  {
    id: "NF-e 123456793",
    number: "123456793",
    series: "001",
    date: "2025-03-15",
    customer: "Decor Artesanal",
    cnpj: "56.789.012/0001-34",
    value: 1875.3,
    status: "rejected",
    accessKey: "35250315567890123456789012345678901234567890",
  },
  {
    id: "NF-e 123456794",
    number: "123456794",
    series: "001",
    date: "2025-03-14",
    customer: "Porcelanas Premium",
    cnpj: "67.890.123/0001-45",
    value: 8750.0,
    status: "canceled",
    accessKey: "35250314678901234567890123456789012345678901",
  },
]

// Dados detalhados de uma nota fiscal específica
export const getInvoiceDetailById = (id: string) => {
  const invoices = {
    "123456789": {
      id: "NF-e 123456789",
      number: "123456789",
      series: "001",
      date: "2025-03-19",
      customer: "Artesanato Brasil",
      cnpj: "12.345.678/0001-90",
      address: "Av. Brasil, 1500, Rio de Janeiro - RJ",
      value: 5630.25,
      status: "authorized",
      accessKey: "35250319123456789012345678901234567890123456",
      authDate: "2025-03-19 10:45:32",
      authProtocol: "135250319123456",
      items: [
        {
          id: 1,
          code: "PROD-001",
          description: "Vaso Cerâmico - Padrão Floral",
          ncm: "6913.90.00",
          quantity: 12,
          unitPrice: 125.0,
          total: 1500.0,
          tax: {
            icms: 270.0,
            ipi: 75.0,
            pis: 24.75,
            cofins: 114.0,
          },
        },
        {
          id: 2,
          code: "PROD-008",
          description: "Prato Decorativo Cerâmico - Pintado à Mão",
          ncm: "6911.10.10",
          quantity: 20,
          unitPrice: 150.0,
          total: 3000.0,
          tax: {
            icms: 540.0,
            ipi: 150.0,
            pis: 49.5,
            cofins: 228.0,
          },
        },
        {
          id: 3,
          code: "SERV-003",
          description: "Serviço de Personalização",
          ncm: "",
          quantity: 1,
          unitPrice: 850.0,
          total: 850.0,
          tax: {
            iss: 42.5,
            pis: 14.03,
            cofins: 64.6,
          },
        },
      ],
      totals: {
        products: 4500.0,
        services: 850.0,
        shipping: 280.25,
        subtotal: 5630.25,
        tax: {
          icms: 810.0,
          ipi: 225.0,
          pis: 88.28,
          cofins: 406.6,
          iss: 42.5,
        },
        total: 5630.25,
      },
      payment: {
        method: "À Vista",
        indicator: "Pagamento à Vista",
      },
      transport: {
        mode: "Por conta do Remetente",
        vehicle: "ABC-1234",
      },
      additionalInfo: "Mercadoria entregue conforme pedido ORD-2025-003.",
      fiscalInfo: "Imposto recolhido conforme Lei Complementar 123/2006 - Simples Nacional.",
    },
  }

  return invoices[id as keyof typeof invoices]
}

