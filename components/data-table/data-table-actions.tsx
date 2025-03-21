"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import type { ReactNode } from "react"
import Link from "next/link"

interface ActionItem {
  label: string
  icon?: ReactNode
  onClick?: () => void
  href?: string
  variant?: "default" | "destructive"
}

interface DataTableActionsProps {
  actions: ActionItem[]
}

export function DataTableActions({ actions }: DataTableActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((action, index) => {
          const className = action.variant === "destructive" ? "text-destructive" : undefined

          const content = (
            <>
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </>
          )

          if (action.href) {
            return (
              <DropdownMenuItem key={index} className={className} asChild>
                <Link href={action.href}>{content}</Link>
              </DropdownMenuItem>
            )
          }

          return (
            <DropdownMenuItem key={index} className={className} onClick={action.onClick}>
              {content}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

