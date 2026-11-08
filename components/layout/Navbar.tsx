import { Search, UserCircle, Settings } from 'lucide-react';

export function Navbar() {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur flex items-center justify-between px-6">
      <div className="flex items-center flex-1">
        <div className="relative w-96 hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search telemetry streams, devices..."
            className="w-full bg-slate-900 border border-slate-800 rounded-md pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-slate-100 transition-colors">
          <Settings className="h-5 w-5" />
        </button>
        <button className="text-slate-400 hover:text-slate-100 transition-colors">
          <UserCircle className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
