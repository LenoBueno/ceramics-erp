import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProductList } from "@/components/product-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function ProductsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Produtos" text="Gerencie o catálogo de produtos da 2103 Creative.">
        <Link href="/produtos/novo">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Produto
          </Button>
        </Link>
      </DashboardHeader>
      <div className="mt-6">
        <ProductList />
      </div>
    </DashboardShell>
  )
}

