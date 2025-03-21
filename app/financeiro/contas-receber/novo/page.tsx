import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NovoRecebimentoPage() {
  return (
    <div className="flex flex-col gap-5 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/financeiro">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Novo Recebimento</h1>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Salvar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Recebimento</CardTitle>
          <CardDescription>Preencha os dados para registrar um novo recebimento</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente</Label>
                <Select>
                  <SelectTrigger id="cliente">
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="c001">Construtora Silva Ltda</SelectItem>
                    <SelectItem value="c002">Arquitetura Moderna S.A.</SelectItem>
                    <SelectItem value="c003">Decorações Interiores Ltda</SelectItem>
                    <SelectItem value="c004">Empreiteira Construções Rápidas</SelectItem>
                    <SelectItem value="c005">Casa & Cia Materiais</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pedido">Pedido (opcional)</Label>
                <Select>
                  <SelectTrigger id="pedido">
                    <SelectValue placeholder="Selecione um pedido" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ped12345">Pedido #12345</SelectItem>
                    <SelectItem value="ped12346">Pedido #12346</SelectItem>
                    <SelectItem value="ped12347">Pedido #12347</SelectItem>
                    <SelectItem value="ped12348">Pedido #12348</SelectItem>
                    <SelectItem value="ped12349">Pedido #12349</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input id="descricao" placeholder="Descrição do recebimento" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Select>
                  <SelectTrigger id="categoria">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vendas">Vendas</SelectItem>
                    <SelectItem value="servicos">Serviços</SelectItem>
                    <SelectItem value="projetos">Projetos Especiais</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor">Valor (R$)</Label>
                <Input id="valor" type="number" step="0.01" placeholder="0,00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-emissao">Data de Emissão</Label>
                <Input id="data-emissao" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-vencimento">Data de Vencimento</Label>
                <Input id="data-vencimento" type="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="forma-pagamento">Forma de Pagamento</Label>
                <Select>
                  <SelectTrigger id="forma-pagamento">
                    <SelectValue placeholder="Selecione uma forma de pagamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                    <SelectItem value="cartao_debito">Cartão de Débito</SelectItem>
                    <SelectItem value="boleto">Boleto</SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="transferencia">Transferência</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="conta-financeira">Conta Financeira</Label>
                <Select>
                  <SelectTrigger id="conta-financeira">
                    <SelectValue placeholder="Selecione uma conta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cf001">Conta Principal</SelectItem>
                    <SelectItem value="cf002">Conta Secundária</SelectItem>
                    <SelectItem value="cf003">Caixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="parcelas">Número de Parcelas</Label>
                <Select defaultValue="1">
                  <SelectTrigger id="parcelas">
                    <SelectValue placeholder="Selecione o número de parcelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacao">Observações</Label>
              <Textarea id="observacao" placeholder="Observações adicionais" rows={4} />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

