import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">João da Silva</p>
          <p className="text-sm text-muted-foreground">joao.silva@email.com</p>
        </div>
        <div className="ml-auto font-medium">+R$1.999,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Maria Santos</p>
          <p className="text-sm text-muted-foreground">maria.santos@email.com</p>
        </div>
        <div className="ml-auto font-medium">+R$1.249,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>CA</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Carlos Almeida</p>
          <p className="text-sm text-muted-foreground">carlos.almeida@email.com</p>
        </div>
        <div className="ml-auto font-medium">+R$399,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>AP</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ana Pereira</p>
          <p className="text-sm text-muted-foreground">ana.pereira@email.com</p>
        </div>
        <div className="ml-auto font-medium">+R$2.499,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>LO</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Lucas Oliveira</p>
          <p className="text-sm text-muted-foreground">lucas.oliveira@email.com</p>
        </div>
        <div className="ml-auto font-medium">+R$699,00</div>
      </div>
    </div>
  )
}

