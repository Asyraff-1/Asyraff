'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Server, Bell, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/devices', label: 'Fleet Management', icon: Server },
  { href: '/alerts', label: 'Incident Log', icon: Bell },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/50 flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Activity className="h-6 w-6 text-emerald-500 mr-2" />
        <span className="font-bold text-lg tracking-wider text-slate-100">AETHER<span className="text-emerald-500">PULSE</span></span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              )}>
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          System Online
        </div>
      </div>
    </aside>
  );
}
