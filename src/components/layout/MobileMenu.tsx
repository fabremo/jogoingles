import { Menu, Home, Users, DollarSign, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetClose } from '@/components/ui/sheet';

interface MobileMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function MobileMenu({ activeTab, setActiveTab }: MobileMenuProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'vendas', label: 'Vendas', icon: DollarSign },
    { id: 'jogo', label: 'Jogo', icon: Gamepad2 }

  ];

  return (
    <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <h1 className="text-2xl font-black tracking-tight bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
        DashApp.
      </h1>
      <Sheet>
        <SheetTrigger render={
          <Button variant="ghost" size="icon" className="text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <Menu className="h-6 w-6" />
          </Button>
        } />
        <SheetContent side="left" className="bg-slate-900 text-slate-100 border-r border-slate-800 p-0 flex flex-col w-[280px]">
          <SheetHeader className="p-6 text-left border-b border-slate-800/50">
            <SheetTitle className="text-3xl font-black bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent w-max">
              DashApp.
            </SheetTitle>
          </SheetHeader>
          <nav className="flex-1 space-y-2 p-4 mt-2">
            {navItems.map((item) => (
              <SheetClose key={item.id} render={
                <Button
                  variant={activeTab === item.id ? 'secondary' : 'ghost'}
                  className={`w-full justify-start text-[15px] font-medium h-12 ${activeTab === item.id
                    ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100 border border-transparent'
                    }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="mr-4 h-5 w-5" />
                  {item.label}
                </Button>
              } />
            ))}
          </nav>
          <div className="p-4 border-t border-slate-800/50">
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/40 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md ring-2 ring-slate-800">
                JL
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">João Lucas</p>
                <p className="text-xs text-slate-400">Admin</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
