import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const vendas = [
  { id: "INV-2024-001", cliente: "Acme Corp", valor: "R$ 1.500,00", status: "Pago", data: "Hoje" },
  { id: "INV-2024-002", cliente: "Globex Inc", valor: "R$ 4.300,00", status: "Pendente", data: "Ontem" },
  { id: "INV-2024-003", cliente: "Stark Ind", valor: "R$ 12.000,00", status: "Pago", data: "12 Mar" },
  { id: "INV-2024-004", cliente: "Wayne Ent", valor: "R$ 8.900,00", status: "Cancelado", data: "10 Mar" },
  { id: "INV-2024-005", cliente: "Umbrella Corp", valor: "R$ 2.450,00", status: "Pendente", data: "08 Mar" },
];

export function VendasView() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-black tracking-tight text-white">Vendas</h2>
          <p className="text-slate-400 text-lg">Acompanhe e gerencie as suas vendas recentes.</p>
        </div>
        <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl h-11 px-6">
          <Download className="mr-2 h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      <Card className="bg-slate-900/40 border-slate-800/60 shadow-xl backdrop-blur-xl overflow-hidden">
        <CardHeader className="border-b border-slate-800/50 bg-slate-900/40 pb-4">
          <CardTitle className="text-xl font-bold text-white">Histórico de Faturas</CardTitle>
          <CardDescription className="text-slate-400">Transações e notas fiscais geradas recentemente.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-900/80">
              <TableRow className="border-slate-800/50 hover:bg-transparent">
                <TableHead className="w-[150px] font-semibold text-slate-300 h-12">Fatura</TableHead>
                <TableHead className="font-semibold text-slate-300">Cliente</TableHead>
                <TableHead className="font-semibold text-slate-300">Status</TableHead>
                <TableHead className="font-semibold text-slate-300">Data</TableHead>
                <TableHead className="text-right font-semibold text-slate-300">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendas.map((venda) => (
                <TableRow key={venda.id} className="border-slate-800/50 hover:bg-slate-800/30 transition-colors h-16 group">
                  <TableCell className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors">{venda.id}</TableCell>
                  <TableCell className="text-slate-300 font-medium">{venda.cliente}</TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider
                      ${venda.status === 'Pago' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                        venda.status === 'Pendente' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                        'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                      {venda.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-400">{venda.data}</TableCell>
                  <TableCell className="text-right text-slate-100 font-bold text-[15px]">{venda.valor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
