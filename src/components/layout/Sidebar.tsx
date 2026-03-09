import { Home, Users, DollarSign, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'vendas', label: 'Vendas', icon: DollarSign },
    { id: 'jogo', label: 'Jogo', icon: Gamepad2 }
  ];

  return (
    <div className="hidden lg:flex w-64 flex-col bg-slate-900 text-slate-100 border-r border-slate-800 p-4 h-full">
      <div className="mb-8 px-4 py-2">
        <h1 className="text-3xl font-black tracking-tight bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Inglês pra Viagem.
        </h1>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? 'secondary' : 'ghost'}
            className={`w-full justify-start font-medium text-[15px] h-11 ${activeTab === item.id
              ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 shadow-sm border border-blue-500/20'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100 border border-transparent'
              } transition-all duration-300`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </nav>
      <div className="mt-auto">
        <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-2xl hover:bg-slate-800/80 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md ring-2 ring-slate-800">
            JL
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">Fábio Bressane</p>
            <p className="text-xs text-slate-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
