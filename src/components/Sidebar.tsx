
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
  Sparkles
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
  { id: 'performance' as ActiveModule, label: 'Performance', icon: Zap },
  { id: 'error-intelligence' as ActiveModule, label: 'Error Analytics', icon: AlertTriangle },
];

export const Sidebar = ({ activeModule, setActiveModule, collapsed, setCollapsed }: SidebarProps) => {
  return (
    <div className={cn(
      "bg-white/70 backdrop-blur-xl border-r border-slate-200/60 transition-all duration-300 flex flex-col relative shadow-lg",
      collapsed ? "w-16" : "w-72"
    )}>
      {/* Modern glassmorphism effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/40 pointer-events-none" />
      
      {/* Header */}
      <div className="p-6 border-b border-slate-200/60">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-sm" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Stellar SCI
                </h1>
                <p className="text-sm text-slate-500 font-medium">Command Insights</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-600 hover:text-slate-900"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={cn(
                "w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 group relative font-medium",
                isActive 
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 text-blue-700 shadow-sm" 
                  : "hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-transparent"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0", 
                isActive ? "text-blue-600" : "text-slate-500 group-hover:text-slate-700"
              )} />
              {!collapsed && (
                <span className="text-sm truncate">{item.label}</span>
              )}
              {isActive && (
                <div className="absolute right-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Network Status Footer */}
      <div className="p-4 border-t border-slate-200/60">
        <div className={cn("flex items-center space-x-3", collapsed && "justify-center")}>
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse opacity-80"></div>
          </div>
          {!collapsed && (
            <div>
              <span className="text-sm text-green-600 font-semibold">Stellar Network</span>
              <div className="text-xs text-slate-500">Testnet Connected</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
