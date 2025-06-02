
import { useState } from 'react';
import { Search, Filter, Download, Terminal, Clock, CheckCircle2, AlertCircle, Layers } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockCommands = [
  { 
    id: 1, 
    timestamp: '2024-06-02 14:32:15', 
    command: 'soroban contract deploy --wasm target/wasm32-unknown-unknown/release/hello_world.wasm', 
    status: 'success', 
    duration: '2.3s',
    user: 'dev-user',
    network: 'testnet',
    gasUsed: '1.2M',
    result: 'Contract deployed: CBQHNAXSI55GX2GN6D67GK7BHVPSLJUGZQEU7WJ5LKR5PNUCGLIMAO4K'
  },
  { 
    id: 2, 
    timestamp: '2024-06-02 14:28:42', 
    command: 'stellar account create --fund', 
    status: 'success', 
    duration: '0.8s',
    user: 'dev-user',
    network: 'testnet',
    gasUsed: '100K',
    result: 'Account created: GDAQ...7XLM funded from friendbot'
  },
  { 
    id: 3, 
    timestamp: '2024-06-02 14:25:11', 
    command: 'soroban contract invoke --id CCR6QKTVBGST... --fn transfer', 
    status: 'error', 
    duration: '1.2s',
    user: 'dev-user',
    network: 'testnet',
    gasUsed: '800K',
    result: 'Error: Insufficient balance for transfer operation'
  },
  { 
    id: 4, 
    timestamp: '2024-06-02 14:20:33', 
    command: 'stellar payment send --amount 100 --destination GDAQ...', 
    status: 'success', 
    duration: '0.5s',
    user: 'dev-user',
    network: 'testnet',
    gasUsed: '100K',
    result: '100 XLM sent successfully'
  },
  { 
    id: 5, 
    timestamp: '2024-06-02 14:15:27', 
    command: 'soroban contract build', 
    status: 'success', 
    duration: '15.7s',
    user: 'dev-user',
    network: 'local',
    gasUsed: 'N/A',
    result: 'Wasm contract built successfully'
  }
];

export const CLICommandLogger = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'success' | 'error'>('all');

  const filteredCommands = mockCommands.filter(cmd => {
    const matchesSearch = cmd.command.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || cmd.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    return status === 'success' ? 
      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : 
      <AlertCircle className="w-4 h-4 text-red-400" />;
  };

  const getStatusBadge = (status: string) => {
    return status === 'success' ? 
      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Success</Badge> :
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Error</Badge>;
  };

  const getNetworkBadge = (network: string) => {
    const colors = {
      'testnet': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'mainnet': 'bg-green-500/20 text-green-400 border-green-500/30',
      'local': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return <Badge className={colors[network as keyof typeof colors] || colors.local}>{network}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            Soroban CLI Logger
          </h1>
          <p className="text-purple-300/80 mt-1">Monitor and analyze all Stellar CLI command executions</p>
          <div className="absolute -top-2 -left-2 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 shadow-lg shadow-purple-500/25">
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-purple-500/30 backdrop-blur-xl">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
              <Input 
                placeholder="Search Stellar commands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/60 border-purple-500/30 text-white placeholder:text-purple-300/60 focus:border-purple-400"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={selectedStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('all')}
                className="bg-slate-700/60 hover:bg-slate-600/60 text-white border-purple-500/30"
              >
                All
              </Button>
              <Button 
                variant={selectedStatus === 'success' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('success')}
                className="bg-slate-700/60 hover:bg-slate-600/60 text-white border-purple-500/30"
              >
                Success
              </Button>
              <Button 
                variant={selectedStatus === 'error' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('error')}
                className="bg-slate-700/60 hover:bg-slate-600/60 text-white border-purple-500/30"
              >
                Error
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Commands List */}
      <div className="space-y-4">
        {filteredCommands.map((cmd) => (
          <Card key={cmd.id} className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-3 flex-wrap gap-2">
                    {getStatusIcon(cmd.status)}
                    <span className="text-sm text-purple-300/80 font-mono">{cmd.timestamp}</span>
                    {getStatusBadge(cmd.status)}
                    {getNetworkBadge(cmd.network)}
                    <Badge variant="outline" className="text-slate-300 border-slate-600">
                      {cmd.user}
                    </Badge>
                    <Badge variant="outline" className="text-yellow-300 border-yellow-600/30">
                      <Layers className="w-3 h-3 mr-1" />
                      {cmd.gasUsed}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <code className="bg-slate-700/60 px-4 py-3 rounded-lg text-sm text-purple-300 font-mono break-all border border-purple-500/20">
                      {cmd.command}
                    </code>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-300 bg-slate-800/60 px-3 py-2 rounded-lg border border-purple-500/20">
                      <span className="font-medium text-purple-300">Result:</span> {cmd.result}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-purple-300/80">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono">{cmd.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCommands.length === 0 && (
        <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-purple-500/30 backdrop-blur-xl">
          <CardContent className="pt-6 text-center py-12">
            <Terminal className="w-16 h-16 text-purple-600/60 mx-auto mb-4" />
            <p className="text-purple-300/80 text-lg">No Stellar commands found</p>
            <p className="text-purple-400/60 text-sm mt-1">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
