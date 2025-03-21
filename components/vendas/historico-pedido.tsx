import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatarData } from "@/lib/utils"
import { CheckCircle2, Clock, FileText, Package, Send, Truck } from "lucide-react"

interface HistoricoPedidoProps {
  pedidoId: number
}

const historicoEventos = [
  {
    id: 1,
    pedidoId: 1,
    data: "2023-06-25T09:30:00",
    tipo: "criacao",
    descricao: "Pedido criado",
    usuario: "João Silva",
    usuarioAvatar: "JS",
    detalhes: "Pedido criado via sistema",
    icone: <FileText className="h-5 w-5" />,
  },
  {
    id: 2,
    pedidoId: 1,
    data: "2023-06-25T10:15:00",
    tipo: "aprovacao",
    descricao: "Pedido aprovado",
    usuario: "Maria Oliveira",
    usuarioAvatar: "MO",
    detalhes: "Aprovação financeira realizada",
    icone: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    id: 3,
    pedidoId: 1,
    data: "2023-06-26T14:20:00",
    tipo: "producao",
    descricao: "Em produção",
    usuario: "Carlos Santos",
    usuarioAvatar: "CS",
    detalhes: "Pedido enviado para produção",
    icone: <Package className="h-5 w-5" />,
  },
  {
    id: 4,
    pedidoId: 1,
    data: "2023-06-27T11:45:00",
    tipo: "envio",
    descricao: "Pedido enviado",
    usuario: "Ana Ferreira",
    usuarioAvatar: "AF",
    detalhes: "Enviado via transportadora",
    icone: <Truck className="h-5 w-5" />,
  },
  {
    id: 5,
    pedidoId: 1,
    data: "2023-06-28T09:10:00",
    tipo: "entrega",
    descricao: "Pedido entregue",
    usuario: "Sistema",
    usuarioAvatar: "SI",
    detalhes: "Confirmação de entrega registrada",
    icone: <Send className="h-5 w-5" />,
  },
]

export function HistoricoPedido({ pedidoId }: HistoricoPedidoProps) {
  // Filtra eventos pelo ID do pedido
  const eventos = historicoEventos.filter((evento) => evento.pedidoId === pedidoId)

  return (
    <div className="space-y-6">
      {eventos.map((evento) => (
        <div key={evento.id} className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">{evento.icone}</div>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{evento.descricao}</p>
              <p className="text-xs text-muted-foreground">{formatarData(evento.data)}</p>
            </div>
            <p className="text-sm text-muted-foreground">{evento.detalhes}</p>
            <div className="flex items-center gap-2 mt-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={evento.usuario} />
                <AvatarFallback>{evento.usuarioAvatar}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{evento.usuario}</span>
            </div>
          </div>
        </div>
      ))}

      {eventos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Clock className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">Nenhum histórico disponível para este pedido</p>
        </div>
      )}
    </div>
  )
}

