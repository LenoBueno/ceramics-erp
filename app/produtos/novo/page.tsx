import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProductForm } from "@/components/product-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewProductPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Novo Produto" text="Adicione um novo produto ao catálogo da 2103 Creative.">
        <Link href="/produtos">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
      </DashboardHeader>
      <div className="mt-6">
        <ProductForm />
      </div>
    </DashboardShell>
  )
}

