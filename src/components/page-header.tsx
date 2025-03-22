import type React from "react"
import { cn } from "../lib/utils"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function PageHeader({ heading, text, children, className, ...props }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <h1 className="font-bold text-3xl">{heading}</h1>
      {text && <p className="text-muted-foreground">{text}</p>}
      {children}
    </div>
  )
}

