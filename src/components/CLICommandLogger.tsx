
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
      <CheckCircle2 className="w-4 h-4 text-green-500" /> : 
      <AlertCircle className="w-4 h-4 text-red-500" />;
  };

  const getStatusBadge = (status: string) => {
    return status === 'success' ? 
      <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">Success</Badge> :
      <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100">Error</Badge>;
  };

  const getNetworkBadge = (network: string) => {
    const colors = {
      'testnet': 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
      'mainnet': 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
      'local': 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
    };
    return <Badge className={colors[network as keyof typeof colors] || colors.local}>{network}</Badge>;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Soroban CLI Logger
          </h1>
          <p className="text-slate-600 mt-2 text-lg">Monitor and analyze all Stellar CLI command executions</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg">
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search Stellar commands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-400"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={selectedStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('all')}
                className={selectedStatus === 'all' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'hover:bg-slate-50'}
              >
                All
              </Button>
              <Button 
                variant={selectedStatus === 'success' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('success')}
                className={selectedStatus === 'success' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'hover:bg-slate-50'}
              >
                Success
              </Button>
              <Button 
                variant={selectedStatus === 'error' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('error')}
                className={selectedStatus === 'error' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'hover:bg-slate-50'}
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
          <Card key={cmd.id} className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-3 flex-wrap gap-2">
                    {getStatusIcon(cmd.status)}
                    <span className="text-sm text-slate-500 font-mono">{cmd.timestamp}</span>
                    {getStatusBadge(cmd.status)}
                    {getNetworkBadge(cmd.network)}
                    <Badge variant="outline" className="text-slate-600 border-slate-300">
                      {cmd.user}
                    </Badge>
                    <Badge variant="outline" className="text-amber-600 border-amber-300">
                      <Layers className="w-3 h-3 mr-1" />
                      {cmd.gasUsed}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <code className="bg-slate-100 px-4 py-3 rounded-xl text-sm text-slate-800 font-mono break-all border border-slate-200">
                      {cmd.command}
                    </code>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-700 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                      <span className="font-semibold text-blue-600">Result:</span> {cmd.result}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono font-medium">{cmd.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCommands.length === 0 && (
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
          <CardContent className="pt-6 text-center py-12">
            <Terminal className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 text-lg font-medium">No Stellar commands found</p>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
