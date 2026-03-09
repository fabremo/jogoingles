import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MoreHorizontal, Plus } from "lucide-react";

const leads = [
  { name: "Ana Silva", email: "ana.silva@example.com", initial: "A", status: "Quente" },
  { name: "Bruno Costa", email: "bruno.costa@example.com", initial: "B", status: "Frio" },
  { name: "Carlos Mendes", email: "carlos.m@example.com", initial: "C", status: "Morno" },
  { name: "Diana Rocha", email: "diana.r@example.com", initial: "D", status: "Quente" },
  { name: "Eduardo Lima", email: "eduardo.l@example.com", initial: "E", status: "Novo" },
];

export function LeadsView() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-black tracking-tight text-white">Leads</h2>
        <p className="text-slate-400 text-lg">Gerencie e acompanhe as suas oportunidades de negócio.</p>
      </div>

      <Card className="bg-slate-900/40 border-slate-800/60 shadow-xl backdrop-blur-xl">
        <CardHeader className="pb-6 border-b border-slate-800/50">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle className="text-xl font-bold text-white">Últimos Leads Cadastrados</CardTitle>
              <CardDescription className="text-slate-400 mt-1">Mostrando os 5 leads mais recentes para contato.</CardDescription>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition-all font-semibold rounded-xl h-11 px-6">
              <Plus className="mr-2 h-5 w-5" />
              Adicionar Lead
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {leads.map((lead, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-800/60 bg-slate-800/20 hover:bg-slate-800/60 hover:border-blue-500/40 transition-all duration-300 gap-4 group">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-slate-700/50 group-hover:border-blue-500/50 transition-colors">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white text-lg">
                      {lead.initial}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base font-semibold text-slate-100">{lead.name}</p>
                    <p className="text-sm text-slate-400">{lead.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase
                      ${lead.status === 'Quente' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                        lead.status === 'Morno' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                        lead.status === 'Frio' ? 'bg-slate-500/10 text-slate-300 border border-slate-500/20' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                      {lead.status}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-blue-400 hover:bg-blue-500/20 rounded-full transition-colors">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/20 rounded-full transition-colors">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
