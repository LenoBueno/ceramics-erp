import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatarData, formatarMoeda } from "@/lib/utils"
import { Eye } from "lucide-react"
import { Link } from "react-router-dom"

const ultimasVendas = [
  {
    id: 1,
    numero: "V-2023-0128",
    cliente: "Cerâmica Artesanal Ltda",
    clienteAvatar: "CA",
    data: "2023-06-28T14:30:00",
    valorTotal: 3450.75,
    status: "entregue",
  },
  {
    id: 2,
    numero: "V-2023-0127",
    cliente: "Construtora Horizonte S.A.",
    clienteAvatar: "CH",
    data: "2023-06-27T11:15:00",
    valorTotal: 7890.5,
    status: "enviado",
  },
  {
    id: 3,
    numero: "V-2023-0126",
    cliente: "Decorações Modernas ME",
    clienteAvatar: "DM",
    data: "2023-06-26T09:45:00",
    valorTotal: 1250.0,
    status: "em_producao",
  },
  {
    id: 4,
    numero: "V-2023-0125",
    cliente: "Arquitetura & Design Ltda",
    clienteAvatar: "AD",
    data: "2023-06-25T16:20:00",
    valorTotal: 5670.25,
    status: "aprovado",
  },
  {
    id: 5,
    numero: "V-2023-0124",
    cliente: "Revestimentos Premium S.A.",
    clienteAvatar: "RP",
    data: "2023-06-24T10:30:00",
    valorTotal: 9870.0,
    status: "pendente",
  },
]

export function UltimasVendas() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pedido</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ultimasVendas.map((venda) => (
          <TableRow key={venda.id}>
            <TableCell className="font-medium">
              <Link href={`/vendas/pedidos/${venda.id}`} className="hover:underline">
                {venda.numero}
              </Link>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={venda.cliente} />
                  <AvatarFallback>{venda.clienteAvatar}</AvatarFallback>
                </Avatar>
                <span className="truncate max-w-[150px]">{venda.cliente}</span>
              </div>
            </TableCell>
            <TableCell>{formatarData(venda.data)}</TableCell>
            <TableCell>{formatarMoeda(venda.valorTotal)}</TableCell>
            <TableCell>
              <StatusBadge status={venda.status} />
            </TableCell>
            <TableCell className="text-right">
              <Link href={`/vendas/pedidos/${venda.id}`}>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<
    string,
    { label: string; variant: "default" | "outline" | "secondary" | "destructive" | "success" }
  > = {
    pendente: { label: "Pendente", variant: "outline" },
    aprovado: { label: "Aprovado", variant: "secondary" },
    em_producao: { label: "Em Produção", variant: "default" },
    enviado: { label: "Enviado", variant: "default" },
    entregue: { label: "Entregue", variant: "success" },
    cancelado: { label: "Cancelado", variant: "destructive" },
  }

  const config = statusConfig[status] || { label: status, variant: "outline" }

  return <Badge variant={config.variant}>{config.label}</Badge>
}

