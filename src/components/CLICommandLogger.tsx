
import { useState } from 'react';
import { Search, Filter, Download, Terminal, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
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
    result: 'Contract deployed: CBQHNAXSI55GX2GN6D67GK7BHVPSLJUGZQEU7WJ5LKR5PNUCGLIMAO4K'
  },
  { 
    id: 2, 
    timestamp: '2024-06-02 14:28:42', 
    command: 'soroban rpc get-ledger --ledger-seq 12345', 
    status: 'success', 
    duration: '0.8s',
    user: 'dev-user',
    result: 'Ledger data retrieved successfully'
  },
  { 
    id: 3, 
    timestamp: '2024-06-02 14:25:11', 
    command: 'soroban contract invoke --id CCR6QKTVBGST... --fn transfer', 
    status: 'error', 
    duration: '1.2s',
    user: 'dev-user',
    result: 'Error: Insufficient balance for transfer'
  },
  { 
    id: 4, 
    timestamp: '2024-06-02 14:20:33', 
    command: 'soroban network add futurenet', 
    status: 'success', 
    duration: '0.5s',
    user: 'dev-user',
    result: 'Network futurenet added successfully'
  },
  { 
    id: 5, 
    timestamp: '2024-06-02 14:15:27', 
    command: 'soroban contract build', 
    status: 'success', 
    duration: '15.7s',
    user: 'dev-user',
    result: 'Build completed successfully'
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
      <CheckCircle2 className="w-4 h-4 text-green-400" /> : 
      <AlertCircle className="w-4 h-4 text-red-400" />;
  };

  const getStatusBadge = (status: string) => {
    return status === 'success' ? 
      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Success</Badge> :
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Error</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            CLI Command Logger
          </h1>
          <p className="text-slate-400 mt-1">Monitor and analyze all Soroban CLI command executions</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search commands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={selectedStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('all')}
                className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
              >
                All
              </Button>
              <Button 
                variant={selectedStatus === 'success' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('success')}
                className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
              >
                Success
              </Button>
              <Button 
                variant={selectedStatus === 'error' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('error')}
                className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
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
          <Card key={cmd.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(cmd.status)}
                    <span className="text-sm text-slate-400">{cmd.timestamp}</span>
                    {getStatusBadge(cmd.status)}
                    <Badge variant="outline" className="text-slate-300 border-slate-600">
                      {cmd.user}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <code className="bg-slate-700/50 px-3 py-2 rounded-lg text-sm text-blue-300 font-mono break-all">
                      {cmd.command}
                    </code>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-400">
                      <span className="font-medium">Result:</span> {cmd.result}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span>{cmd.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCommands.length === 0 && (
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="pt-6 text-center">
            <Terminal className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No commands found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
