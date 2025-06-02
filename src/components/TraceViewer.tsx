
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitBranch, Clock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

const traceData = {
  cliCommand: 'soroban contract invoke --id CCR6QKT... --fn transfer --arg 1000',
  steps: [
    {
      id: 1,
      type: 'RPC',
      method: 'simulateTransaction',
      status: 'success',
      duration: '0.8s',
      details: 'Transaction simulation completed successfully'
    },
    {
      id: 2,
      type: 'RPC',
      method: 'getAccount',
      status: 'success',
      duration: '0.3s',
      details: 'Retrieved account balance and sequence number'
    },
    {
      id: 3,
      type: 'RPC',
      method: 'sendTransaction',
      status: 'success',
      duration: '2.1s',
      details: 'Transaction submitted to network'
    },
    {
      id: 4,
      type: 'RPC',
      method: 'getTransaction',
      status: 'success',
      duration: '1.2s',
      details: 'Confirmation received'
    }
  ]
};

const recentTraces = [
  { command: 'contract deploy', steps: 5, duration: '3.2s', status: 'success' },
  { command: 'contract invoke', steps: 4, duration: '1.8s', status: 'success' },
  { command: 'network add', steps: 2, duration: '0.5s', status: 'success' },
  { command: 'contract build', steps: 3, duration: '15.7s', status: 'error' },
];

export const TraceViewer = () => {
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
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          CLI → RPC Trace Viewer
        </h1>
        <p className="text-slate-400 mt-1">Visualize the RPC call chain triggered by CLI commands</p>
      </div>

      {/* Current Trace */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <GitBranch className="w-5 h-5 text-blue-400" />
            <span>Current Trace</span>
          </CardTitle>
          <div className="mt-2">
            <code className="bg-slate-700/50 px-3 py-2 rounded-lg text-sm text-blue-300 font-mono">
              {traceData.cliCommand}
            </code>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {traceData.steps.map((step, index) => (
              <div key={step.id} className="flex items-center space-x-4">
                {/* Step Number */}
                <div className="w-8 h-8 bg-blue-600/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-300 text-sm font-medium">
                  {step.id}
                </div>
                
                {/* Step Content */}
                <div className="flex-1 bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-teal-300 border-teal-500/30">
                        {step.type}
                      </Badge>
                      <span className="font-medium text-white">{step.method}</span>
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span>{step.duration}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">{step.details}</p>
                </div>

                {/* Arrow for non-last items */}
                {index < traceData.steps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-slate-500 absolute right-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Traces */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Recent Traces</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTraces.map((trace, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(trace.status)}
                  <span className="text-white font-medium">{trace.command}</span>
                  <Badge variant="outline" className="text-slate-300 border-slate-600">
                    {trace.steps} steps
                  </Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-slate-400">{trace.duration}</span>
                  {getStatusBadge(trace.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trace Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Avg Steps per Trace</CardTitle>
            <GitBranch className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3.5</div>
            <p className="text-xs text-slate-400">steps per command</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Trace Success Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">92.1%</div>
            <p className="text-xs text-slate-400">end-to-end success</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Avg Trace Duration</CardTitle>
            <Clock className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2.8s</div>
            <p className="text-xs text-slate-400">total execution time</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
