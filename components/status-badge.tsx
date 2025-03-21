import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status:
    | "active"
    | "inactive"
    | "pending"
    | "processing"
    | "completed"
    | "delivered"
    | "canceled"
    | "low_stock"
    | "out_of_stock"
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const badgeVariants = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    low_stock: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    out_of_stock: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        badgeVariants[status] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
      )}
    >
      {status
        .replace(/_/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")}
    </span>
  )
}

