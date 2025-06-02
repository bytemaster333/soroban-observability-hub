
import { Search, Settings, User, Menu, Bell, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TopNavbarProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

export const TopNavbar = ({ toggleSidebar, sidebarCollapsed }: TopNavbarProps) => {
  return (
    <header className="h-16 bg-slate-900/50 backdrop-blur-xl border-b border-purple-500/20 flex items-center justify-between px-6 relative">
      {/* Stellar glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-violet-500/5 pointer-events-none" />
      
      <div className="flex items-center space-x-4 relative z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="text-slate-300 hover:text-purple-100 hover:bg-purple-500/20"
        >
          <Menu className="w-4 h-4" />
        </Button>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
          <Input 
            placeholder="Search transactions, contracts, accounts..."
            className="pl-10 w-96 bg-slate-800/60 border-purple-500/30 text-white placeholder:text-purple-300/60 focus:border-purple-400 focus:ring-purple-400/20"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 relative z-10">
        {/* Network Selector */}
        <div className="flex items-center space-x-2 px-3 py-2 bg-slate-800/60 border border-purple-500/30 rounded-lg">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span className="text-sm text-slate-300">Testnet</span>
        </div>

        <Button variant="ghost" size="sm" className="text-slate-300 hover:text-purple-100 hover:bg-purple-500/20">
          <Bell className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="text-slate-300 hover:text-purple-100 hover:bg-purple-500/20">
          <Settings className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-400/30 rounded-lg">
          <div className="w-7 h-7 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center shadow-sm">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <div className="text-sm text-purple-100 font-medium">Developer</div>
            <div className="text-xs text-purple-300/80">stellar.dev</div>
          </div>
        </div>
      </div>
    </header>
  );
};
