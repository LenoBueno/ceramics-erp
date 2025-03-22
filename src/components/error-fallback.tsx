"use client"

import { Button } from "./ui/button"
import { AlertCircle } from "lucide-react"

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <AlertCircle className="h-16 w-16 text-destructive" />
        <h2 className="text-2xl font-bold">Algo deu errado</h2>
        <p className="max-w-md text-muted-foreground">
          Ocorreu um erro ao carregar esta página. Por favor, tente novamente.
        </p>
        {import.meta.env.DEV && (
          <pre className="mt-4 max-h-96 max-w-md overflow-auto rounded-md bg-muted p-4 text-sm">{error.message}</pre>
        )}
        <Button onClick={resetErrorBoundary} className="mt-4">
          Tentar novamente
        </Button>
      </div>
    </div>
  )
}

