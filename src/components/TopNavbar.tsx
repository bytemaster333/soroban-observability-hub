
import { Search, Settings, User, Menu, Bell, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TopNavbarProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

export const TopNavbar = ({ toggleSidebar, sidebarCollapsed }: TopNavbarProps) => {
  return (
    <header className="h-16 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-6 relative shadow-sm">
      {/* Modern glassmorphism effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/80 pointer-events-none" />
      
      <div className="flex items-center space-x-4 relative z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search transactions, contracts, accounts..."
            className="pl-10 w-96 bg-white/80 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 relative z-10">
        {/* Network Selector */}
        <div className="flex items-center space-x-2 px-4 py-2 bg-white/80 border border-slate-200 rounded-xl shadow-sm">
          <Globe className="w-4 h-4 text-emerald-500" />
          <span className="text-sm text-slate-700 font-medium">Testnet</span>
        </div>

        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl">
          <Bell className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl">
          <Settings className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-xl shadow-sm">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-sm">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <div className="text-sm text-slate-900 font-semibold">Developer</div>
            <div className="text-xs text-slate-500">stellar.dev</div>
          </div>
        </div>
      </div>
    </header>
  );
};
