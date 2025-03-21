"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptyStateProps {
  title: string
  description: string
  icon: ReactNode
  actionLabel?: string
  actionHref?: string
  actionOnClick?: () => void
}

export function EmptyState({ title, description, icon, actionLabel, actionHref, actionOnClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">{icon}</div>
      <h3 className="mt-6 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">{description}</p>
      {(actionLabel && actionHref) || actionOnClick ? (
        <div className="mt-6">
          {actionHref ? (
            <Button asChild>
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          ) : (
            <Button onClick={actionOnClick}>{actionLabel}</Button>
          )}
        </div>
      ) : null}
    </div>
  )
}

