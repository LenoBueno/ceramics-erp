import { Button, type ButtonProps } from "@/components/ui/button"
import Link from "next/link"
import type { ReactNode } from "react"

interface PageHeaderProps {
  heading: string
  text?: string
  children?: ReactNode
}

export function PageHeader({ heading, text, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}

interface PageHeaderActionProps extends ButtonProps {
  href?: string
  icon?: ReactNode
  children: ReactNode
}

export function PageHeaderAction({ href, icon, children, ...props }: PageHeaderActionProps) {
  const ButtonComponent = (
    <Button {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Button>
  )

  if (href) {
    return <Link href={href}>{ButtonComponent}</Link>
  }

  return ButtonComponent
}

