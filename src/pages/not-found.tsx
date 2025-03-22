import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Página não encontrada</h2>
        <p className="text-muted-foreground">A página que você está procurando não existe ou foi removida.</p>
        <Link to="/">
          <Button className="mt-4">Voltar para o Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}

