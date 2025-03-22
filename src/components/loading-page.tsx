import { Loader2 } from "lucide-react"

export default function LoadingPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <h2 className="text-xl font-semibold">Carregando...</h2>
      </div>
    </div>
  )
}

