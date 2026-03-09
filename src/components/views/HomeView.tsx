'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, Users, DollarSign, Activity } from "lucide-react";

const data = [
  { name: 'Jan', vendas: 4000, leads: 2400 },
  { name: 'Fev', vendas: 3000, leads: 1398 },
  { name: 'Mar', vendas: 2000, leads: 9800 },
  { name: 'Abr', vendas: 2780, leads: 3908 },
  { name: 'Mai', vendas: 1890, leads: 4900 },
  { name: 'Jun', vendas: 2390, leads: 3800 },
  { name: 'Jul', vendas: 3490, leads: 4300 },
];

export function HomeView() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-black tracking-tight text-white">Dashboard</h2>
        <p className="text-slate-400 text-lg">Aqui está o resumo do seu negócio hoje.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Receita Total", value: "R$ 46.231,89", icon: DollarSign, trend: "+20.1% em relação ao mês anterior", trendUp: true },
          { title: "Novos Leads", value: "+2350", icon: Users, trend: "+180.1% em relação ao mês anterior", trendUp: true },
          { title: "Vendas Concluídas", value: "+12,234", icon: Activity, trend: "+19% em relação ao mês anterior", trendUp: true },
          { title: "Ativos Agora", value: "+573", icon: ArrowUpRight, trend: "+201 desde a última hora", trendUp: true },
        ].map((stat, i) => (
          <Card key={i} className="bg-slate-900/40 border-slate-800/60 shadow-xl backdrop-blur-xl hover:bg-slate-800/40 transition-all duration-300 hover:border-blue-500/30 group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">{stat.title}</CardTitle>
              <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                <stat.icon className="w-4 h-4 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight text-white">{stat.value}</div>
              <p className={`text-xs mt-2 font-medium ${stat.trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-900/40 border-slate-800/60 shadow-xl backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Visão Geral de Desempenho</CardTitle>
          <CardDescription className="text-slate-400">Relação de leads e vendas nos últimos 7 meses.</CardDescription>
        </CardHeader>
        <CardContent className="h-[450px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} dx={-10} />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                itemStyle={{ color: '#f8fafc', fontWeight: 600 }}
                cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area type="monotone" dataKey="vendas" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVendas)" activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }} />
              <Area type="monotone" dataKey="leads" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" activeDot={{ r: 6, strokeWidth: 0, fill: '#8b5cf6' }} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
