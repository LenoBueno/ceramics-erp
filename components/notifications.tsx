"use client"

import { useState } from "react"
import { Bell, Check, Package, ShoppingCart, AlertTriangle, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Dados simulados para notificações
const initialNotifications = [
  {
    id: "1",
    title: "Estoque baixo",
    description: "Quartinha de Barro Grande está com estoque baixo",
    time: "2h atrás",
    read: false,
    type: "warning",
  },
  {
    id: "2",
    title: "Novo pedido",
    description: "Pedido #1234 foi criado com sucesso",
    time: "5h atrás",
    read: false,
    type: "order",
  },
  {
    id: "3",
    title: "Produto atualizado",
    description: "Ibá Médio teve seu preço atualizado",
    time: "1d atrás",
    read: true,
    type: "product",
  },
  {
    id: "4",
    title: "Entrega confirmada",
    description: "Pedido #1230 foi entregue ao cliente",
    time: "2d atrás",
    read: true,
    type: "order",
  },
]

export function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "order":
        return <ShoppingCart className="h-4 w-4 text-blue-500" />
      case "product":
        return <Package className="h-4 w-4 text-green-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notificações</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h4 className="font-semibold">Notificações</h4>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-muted-foreground"
              onClick={markAllAsRead}
            >
              <Check className="mr-1 h-3 w-3" />
              Marcar todas como lidas
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Bell className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Não há notificações</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn("flex items-start gap-3 p-3 border-b last:border-0", !notification.read && "bg-muted/50")}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <div className="flex items-center gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3" />
                          <span className="sr-only">Marcar como lida</span>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeNotification(notification.id)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remover</span>
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t p-2">
          <Button variant="ghost" size="sm" className="w-full justify-center text-xs">
            Ver todas as notificações
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

