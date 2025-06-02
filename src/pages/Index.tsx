
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopNavbar } from '@/components/TopNavbar';
import { DashboardHome } from '@/components/DashboardHome';
import { CLICommandLogger } from '@/components/CLICommandLogger';
import { RPCTracker } from '@/components/RPCTracker';
import { TraceViewer } from '@/components/TraceViewer';
import { DryRunSimulator } from '@/components/DryRunSimulator';
import { PerformanceAnalyzer } from '@/components/PerformanceAnalyzer';
import { ErrorIntelligence } from '@/components/ErrorIntelligence';

export type ActiveModule = 'dashboard' | 'cli-logger' | 'rpc-tracker' | 'trace-viewer' | 'dry-run' | 'performance' | 'error-intelligence';

const Index = () => {
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardHome />;
      case 'cli-logger':
        return <CLICommandLogger />;
      case 'rpc-tracker':
        return <RPCTracker />;
      case 'trace-viewer':
        return <TraceViewer />;
      case 'dry-run':
        return <DryRunSimulator />;
      case 'performance':
        return <PerformanceAnalyzer />;
      case 'error-intelligence':
        return <ErrorIntelligence />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Stellar-themed background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_40%)] pointer-events-none" />
      
      <div className="relative flex w-full min-h-screen">
        <Sidebar 
          activeModule={activeModule} 
          setActiveModule={setActiveModule}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        <div className="flex-1 flex flex-col">
          <TopNavbar 
            toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            sidebarCollapsed={sidebarCollapsed}
          />
          <main className="flex-1 p-6 overflow-auto">
            {renderActiveModule()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
