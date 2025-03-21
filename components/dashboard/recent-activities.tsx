import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Box, CreditCard, DollarSign, FileText, Package, ShoppingCart, User } from "lucide-react"

const activities = [
  {
    id: 1,
    description: "Pedido #1234 foi aprovado",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    icon: ShoppingCart,
    module: "Vendas",
  },
  {
    id: 2,
    description: "Ordem de produção #567 concluída",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    icon: Box,
    module: "Produção",
  },
  {
    id: 3,
    description: "Pagamento de R$ 12.450,00 recebido",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    icon: DollarSign,
    module: "Financeiro",
  },
  {
    id: 4,
    description: "Novo cliente cadastrado: Cerâmicas Silva Ltda",
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    icon: User,
    module: "Clientes",
  },
  {
    id: 5,
    description: "Entrada de estoque: 500 unidades de Porcelanato 60x60",
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    icon: Package,
    module: "Estoque",
  },
  {
    id: 6,
    description: "Nota fiscal #9876 emitida",
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
    icon: FileText,
    module: "Fiscal",
  },
  {
    id: 7,
    description: "Pedido de compra #432 enviado ao fornecedor",
    timestamp: new Date(Date.now() - 1000 * 60 * 360),
    icon: CreditCard,
    module: "Compras",
  },
]

export function RecentActivities() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 rounded-md p-2 transition-all hover:bg-accent">
            <div className="rounded-full bg-primary/10 p-1">
              <activity.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{activity.description}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{activity.module}</span>
                <span className="mx-1">•</span>
                <span>
                  {formatDistanceToNow(activity.timestamp, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

