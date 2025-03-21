import { Badge } from "@/components/ui/badge"

export function InventoryStatus() {
  const lowStockItems = [
    {
      id: 1,
      name: "Quartinha de Barro Pequena",
      stock: 5,
      minStock: 10,
      category: "Quartinhas de Barro",
    },
    {
      id: 2,
      name: "Ibá Médio",
      stock: 3,
      minStock: 8,
      category: "Ibás",
    },
    {
      id: 3,
      name: "Alguidar Grande",
      stock: 2,
      minStock: 5,
      category: "Alguidar",
    },
    {
      id: 4,
      name: "Quartinha de Porcelana Decorada",
      stock: 4,
      minStock: 7,
      category: "Quartinhas de Porcelana",
    },
    {
      id: 5,
      name: "Ibá Pequeno",
      stock: 1,
      minStock: 6,
      category: "Ibás",
    },
  ]

  return (
    <div className="space-y-4">
      {lowStockItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{item.name}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">Categoria: {item.category}</p>
              <Badge variant="outline" className="text-xs">
                Mínimo: {item.minStock}
              </Badge>
            </div>
          </div>
          <Badge variant="destructive">Estoque: {item.stock}</Badge>
        </div>
      ))}
    </div>
  )
}

