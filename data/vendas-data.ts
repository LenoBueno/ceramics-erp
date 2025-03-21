export interface ItemPedido {
  produto: string
  codigo: string
  quantidade: number
  valorUnitario: number
}

export interface Parcela {
  vencimento: string
  valor: number
  status: string
}

export interface EnderecoEntrega {
  destinatario: string
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  uf: string
  cep: string
}

export interface PedidoVenda {
  id: number
  numero: string
  data: string
  cliente: string
  clienteId: number
  clienteDocumento: string
  clienteEmail: string
  clienteTelefone: string
  vendedor: string
  status: string
  formaPagamento: string
  condicaoPagamento: string
  statusPagamento: string
  valorTotal: number
  subtotal: number
  desconto: number
  frete: number
  itens: ItemPedido[]
  parcelas?: Parcela[]
  metodoEnvio?: string
  transportadora?: string
  previsaoEntrega?: string
  codigoRastreio?: string
  enderecoEntrega?: EnderecoEntrega
}

export const pedidosVenda: PedidoVenda[] = [
  {
    id: 1,
    numero: "V-2023-0128",
    data: "2023-06-28T14:30:00",
    cliente: "Cerâmica Artesanal Ltda",
    clienteId: 1,
    clienteDocumento: "12.345.678/0001-90",
    clienteEmail: "contato@ceramicaartesanal.com.br",
    clienteTelefone: "(11) 98765-4321",
    vendedor: "João Silva",
    status: "entregue",
    formaPagamento: "Boleto Bancário",
    condicaoPagamento: "30/60/90 dias",
    statusPagamento: "Pago",
    valorTotal: 3450.75,
    subtotal: 3300.75,
    desconto: 0,
    frete: 150.0,
    itens: [
      {
        produto: "Azulejo Decorativo 20x20cm",
        codigo: "AZ-2020-DEC",
        quantidade: 50,
        valorUnitario: 15.9,
      },
      {
        produto: "Porcelanato Polido 60x60cm",
        codigo: "PP-6060",
        quantidade: 30,
        valorUnitario: 89.9,
      },
    ],
    parcelas: [
      {
        vencimento: "2023-07-28",
        valor: 1150.25,
        status: "Pago",
      },
      {
        vencimento: "2023-08-28",
        valor: 1150.25,
        status: "Pago",
      },
      {
        vencimento: "2023-09-28",
        valor: 1150.25,
        status: "Pago",
      },
    ],
    metodoEnvio: "Transportadora",
    transportadora: "Transportadora Rápida Ltda",
    previsaoEntrega: "2023-07-05",
    codigoRastreio: "TR123456789BR",
    enderecoEntrega: {
      destinatario: "Cerâmica Artesanal Ltda",
      logradouro: "Rua das Artes",
      numero: "123",
      complemento: "Galpão 4",
      bairro: "Centro",
      cidade: "São Paulo",
      uf: "SP",
      cep: "01234-567",
    },
  },
  {
    id: 2,
    numero: "V-2023-0127",
    data: "2023-06-27T11:15:00",
    cliente: "Construtora Horizonte S.A.",
    clienteId: 2,
    clienteDocumento: "23.456.789/0001-01",
    clienteEmail: "compras@construtorahorizonte.com.br",
    clienteTelefone: "(11) 97654-3210",
    vendedor: "Maria Oliveira",
    status: "enviado",
    formaPagamento: "Transferência Bancária",
    condicaoPagamento: "30/60 dias",
    statusPagamento: "Parcial",
    valorTotal: 7890.5,
    subtotal: 7690.5,
    desconto: 0,
    frete: 200.0,
    itens: [
      {
        produto: "Revestimento Cerâmico 30x60cm",
        codigo: "RC-3060",
        quantidade: 120,
        valorUnitario: 45.5,
      },
      {
        produto: "Porcelanato Polido 60x60cm",
        codigo: "PP-6060",
        quantidade: 40,
        valorUnitario: 89.9,
      },
    ],
    parcelas: [
      {
        vencimento: "2023-07-27",
        valor: 3945.25,
        status: "Pago",
      },
      {
        vencimento: "2023-08-27",
        valor: 3945.25,
        status: "Pendente",
      },
    ],
    metodoEnvio: "Transportadora",
    transportadora: "Logística Express S.A.",
    previsaoEntrega: "2023-07-10",
    codigoRastreio: "LE987654321BR",
  },
  {
    id: 3,
    numero: "V-2023-0126",
    data: "2023-06-26T09:45:00",
    cliente: "Decorações Modernas ME",
    clienteId: 3,
    clienteDocumento: "34.567.890/0001-12",
    clienteEmail: "contato@decoracoesmodernas.com.br",
    clienteTelefone: "(11) 96543-2109",
    vendedor: "Carlos Santos",
    status: "em_producao",
    formaPagamento: "Cartão de Crédito",
    condicaoPagamento: "À Vista",
    statusPagamento: "Pago",
    valorTotal: 1250.0,
    subtotal: 1150.0,
    desconto: 0,
    frete: 100.0,
    itens: [
      {
        produto: "Pastilha de Porcelana 5x5cm",
        codigo: "PP-0505",
        quantidade: 50,
        valorUnitario: 23.0,
      },
    ],
  },
  {
    id: 4,
    numero: "V-2023-0125",
    data: "2023-06-25T16:20:00",
    cliente: "Arquitetura & Design Ltda",
    clienteId: 4,
    clienteDocumento: "45.678.901/0001-23",
    clienteEmail: "projetos@arquiteturadesign.com.br",
    clienteTelefone: "(11) 95432-1098",
    vendedor: "Ana Ferreira",
    status: "aprovado",
    formaPagamento: "Boleto Bancário",
    condicaoPagamento: "30/60/90 dias",
    statusPagamento: "Pendente",
    valorTotal: 5670.25,
    subtotal: 5470.25,
    desconto: 0,
    frete: 200.0,
    itens: [
      {
        produto: "Porcelanato Polido 60x60cm",
        codigo: "PP-6060",
        quantidade: 45,
        valorUnitario: 89.9,
      },
      {
        produto: "Revestimento Cerâmico 30x60cm",
        codigo: "RC-3060",
        quantidade: 30,
        valorUnitario: 45.5,
      },
    ],
  },
  {
    id: 5,
    numero: "V-2023-0124",
    data: "2023-06-24T10:30:00",
    cliente: "Revestimentos Premium S.A.",
    clienteId: 5,
    clienteDocumento: "56.789.012/0001-34",
    clienteEmail: "vendas@revestimentospremium.com.br",
    clienteTelefone: "(11) 94321-0987",
    vendedor: "Pedro Souza",
    status: "pendente",
    formaPagamento: "PIX",
    condicaoPagamento: "À Vista",
    statusPagamento: "Pendente",
    valorTotal: 9870.0,
    subtotal: 9670.0,
    desconto: 0,
    frete: 200.0,
    itens: [
      {
        produto: "Tijolo Aparente Cerâmico",
        codigo: "TAC-001",
        quantidade: 500,
        valorUnitario: 12.5,
      },
      {
        produto: "Azulejo Decorativo 20x20cm",
        codigo: "AZ-2020-DEC",
        quantidade: 120,
        valorUnitario: 15.9,
      },
    ],
  },
  {
    id: 6,
    numero: "V-2023-0123",
    data: "2023-06-23T14:45:00",
    cliente: "Construtora Horizonte S.A.",
    clienteId: 2,
    clienteDocumento: "23.456.789/0001-01",
    clienteEmail: "compras@construtorahorizonte.com.br",
    clienteTelefone: "(11) 97654-3210",
    vendedor: "João Silva",
    status: "cancelado",
    formaPagamento: "Boleto Bancário",
    condicaoPagamento: "30 dias",
    statusPagamento: "Cancelado",
    valorTotal: 2340.5,
    subtotal: 2240.5,
    desconto: 0,
    frete: 100.0,
    itens: [
      {
        produto: "Revestimento Cerâmico 30x60cm",
        codigo: "RC-3060",
        quantidade: 50,
        valorUnitario: 45.5,
      },
    ],
  },
  {
    id: 7,
    numero: "V-2023-0122",
    data: "2023-06-22T09:15:00",
    cliente: "Cerâmica Artesanal Ltda",
    clienteId: 1,
    clienteDocumento: "12.345.678/0001-90",
    clienteEmail: "contato@ceramicaartesanal.com.br",
    clienteTelefone: "(11) 98765-4321",
    vendedor: "Maria Oliveira",
    status: "entregue",
    formaPagamento: "Transferência Bancária",
    condicaoPagamento: "À Vista",
    statusPagamento: "Pago",
    valorTotal: 4560.3,
    subtotal: 4460.3,
    desconto: 0,
    frete: 100.0,
    itens: [
      {
        produto: "Azulejo Decorativo 20x20cm",
        codigo: "AZ-2020-DEC",
        quantidade: 80,
        valorUnitario: 15.9,
      },
      {
        produto: "Pastilha de Porcelana 5x5cm",
        codigo: "PP-0505",
        quantidade: 120,
        valorUnitario: 23.0,
      },
    ],
  },
  {
    id: 8,
    numero: "V-2023-0121",
    data: "2023-06-21T13:40:00",
    cliente: "Arquitetura & Design Ltda",
    clienteId: 4,
    clienteDocumento: "45.678.901/0001-23",
    clienteEmail: "projetos@arquiteturadesign.com.br",
    clienteTelefone: "(11) 95432-1098",
    vendedor: "Carlos Santos",
    status: "entregue",
    formaPagamento: "PIX",
    condicaoPagamento: "À Vista",
    statusPagamento: "Pago",
    valorTotal: 3245.7,
    subtotal: 3145.7,
    desconto: 0,
    frete: 100.0,
    itens: [
      {
        produto: "Porcelanato Polido 60x60cm",
        codigo: "PP-6060",
        quantidade: 35,
        valorUnitario: 89.9,
      },
    ],
  },
  {
    id: 9,
    numero: "V-2023-0120",
    data: "2023-06-20T10:10:00",
    cliente: "Decorações Modernas ME",
    clienteId: 3,
    clienteDocumento: "34.567.890/0001-12",
    clienteEmail: "contato@decoracoesmodernas.com.br",
    clienteTelefone: "(11) 96543-2109",
    vendedor: "Ana Ferreira",
    status: "aprovado",
    formaPagamento: "Cartão de Crédito",
    condicaoPagamento: "À Vista",
    statusPagamento: "Pago",
    valorTotal: 1890.5,
    subtotal: 1790.5,
    desconto: 0,
    frete: 100.0,
    itens: [
      {
        produto: "Pastilha de Porcelana 5x5cm",
        codigo: "PP-0505",
        quantidade: 80,
        valorUnitario: 23.0,
      },
    ],
  },
  {
    id: 10,
    numero: "V-2023-0119",
    data: "2023-06-19T15:30:00",
    cliente: "Revestimentos Premium S.A.",
    clienteId: 5,
    clienteDocumento: "56.789.012/0001-34",
    clienteEmail: "vendas@revestimentospremium.com.br",
    clienteTelefone: "(11) 94321-0987",
    vendedor: "Pedro Souza",
    status: "em_producao",
    formaPagamento: "Boleto Bancário",
    condicaoPagamento: "30/60 dias",
    statusPagamento: "Parcial",
    valorTotal: 6780.25,
    subtotal: 6580.25,
    desconto: 0,
    frete: 200.0,
    itens: [
      {
        produto: "Tijolo Aparente Cerâmico",
        codigo: "TAC-001",
        quantidade: 300,
        valorUnitario: 12.5,
      },
      {
        produto: "Revestimento Cerâmico 30x60cm",
        codigo: "RC-3060",
        quantidade: 60,
        valorUnitario: 45.5,
      },
    ],
  },
]

export function encontrarPedidoPorId(id: number): PedidoVenda | undefined {
  return pedidosVenda.find((pedido) => pedido.id === id)
}

