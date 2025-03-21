import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProductDetail } from "@/components/product-detail"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ProductDetailPageProps {
  params: {
    id: string
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return (
    <DashboardShell>
      <DashboardHeader heading="Detalhes do Produto" text="Visualize e edite informações detalhadas do produto.">
        <Link href="/produtos">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Produtos
          </Button>
        </Link>
      </DashboardHeader>
      <div className="mt-6">
        <ProductDetail id={params.id} />
      </div>
    </DashboardShell>
  )
}

