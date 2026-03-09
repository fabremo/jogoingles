'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { MobileMenu } from './MobileMenu';
import { HomeView } from '../views/HomeView';
import { LeadsView } from '../views/LeadsView';
import { VendasView } from '../views/VendasView';
import { JogoView } from '../views/JogoView';

export function AppLayout() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="flex h-screen bg-[#020817] text-slate-50 overflow-hidden font-sans selection:bg-blue-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        <MobileMenu activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both ease-out">
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'leads' && <LeadsView />}
            {activeTab === 'vendas' && <VendasView />}
            {activeTab === 'jogo' && <JogoView />}
          </div>
        </main>
      </div>
    </div>
  );
}
