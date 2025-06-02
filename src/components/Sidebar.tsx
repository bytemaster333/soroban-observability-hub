
import { 
  BarChart3, 
  Terminal, 
  Layers, 
  GitBranch, 
  PlayCircle, 
  Zap, 
  AlertTriangle,
  Home,
  ChevronLeft,
  ChevronRight,
  Stars
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ActiveModule } from '@/pages/Index';

interface SidebarProps {
  activeModule: ActiveModule;
  setActiveModule: (module: ActiveModule) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: 'dashboard' as ActiveModule, label: 'Dashboard', icon: Home },
  { id: 'cli-logger' as ActiveModule, label: 'Soroban CLI', icon: Terminal },
  { id: 'rpc-tracker' as ActiveModule, label: 'Horizon RPC', icon: Layers },
  { id: 'trace-viewer' as ActiveModule, label: 'Transaction Flow', icon: GitBranch },
  { id: 'dry-run' as ActiveModule, label: 'Contract Simulator', icon: PlayCircle },
  { id: 'performance' as ActiveModule, label: 'Network Performance', icon: Zap },
  { id: 'error-intelligence' as ActiveModule, label: 'Error Analytics', icon: AlertTriangle },
];

export const Sidebar = ({ activeModule, setActiveModule, collapsed, setCollapsed }: SidebarProps) => {
  return (
    <div className={cn(
      "bg-slate-900/70 backdrop-blur-xl border-r border-purple-500/20 transition-all duration-300 flex flex-col relative",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Stellar glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="p-4 border-b border-purple-500/20">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 via-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Stars className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-sm" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  Stellar SCI
                </h1>
                <p className="text-xs text-purple-300/80">Command Insights</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors text-purple-300 hover:text-purple-100"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-400/30 text-purple-100 shadow-lg shadow-purple-500/10" 
                  : "hover:bg-purple-500/10 text-slate-300 hover:text-purple-100 hover:border-purple-500/20 border border-transparent"
              )}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-xl blur-sm" />
              )}
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0 relative z-10", 
                isActive ? "text-purple-300" : "text-slate-400 group-hover:text-purple-300"
              )} />
              {!collapsed && (
                <span className="text-sm font-medium truncate relative z-10">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Network Status Footer */}
      <div className="p-4 border-t border-purple-500/20">
        <div className={cn("flex items-center space-x-3", collapsed && "justify-center")}>
          <div className="relative">
            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full animate-pulse opacity-60"></div>
          </div>
          {!collapsed && (
            <div>
              <span className="text-xs text-green-400 font-medium">Stellar Network</span>
              <div className="text-xs text-slate-400">Testnet Connected</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
