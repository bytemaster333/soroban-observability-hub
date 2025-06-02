
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertTriangle, Bug, Shield, Network, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const errorCategoryData = [
  { name: 'Gas Limit', value: 125, color: '#EF4444' },
  { name: 'Authorization', value: 89, color: '#F59E0B' },
  { name: 'Network Timeout', value: 67, color: '#8B5CF6' },
  { name: 'Invalid Parameters', value: 45, color: '#EC4899' },
  { name: 'Contract Error', value: 32, color: '#06B6D4' },
];

const errorTimelineData = [
  { time: '00:00', errors: 3, severity: 'low' },
  { time: '04:00', errors: 1, severity: 'low' },
  { time: '08:00', errors: 8, severity: 'medium' },
  { time: '12:00', errors: 15, severity: 'high' },
  { time: '16:00', errors: 12, severity: 'high' },
  { time: '20:00', errors: 5, severity: 'medium' },
];

const frequentErrors = [
  {
    error: 'Transaction failed: Insufficient balance',
    count: 45,
    lastSeen: '2 minutes ago',
    category: 'Contract Error',
    suggestion: 'Check account balance before transfer operations'
  },
  {
    error: 'RPC timeout: Connection timeout after 30s',
    count: 23,
    lastSeen: '15 minutes ago',
    category: 'Network',
    suggestion: 'Implement retry logic with exponential backoff'
  },
  {
    error: 'Gas limit exceeded: Required 250000, provided 200000',
    count: 18,
    lastSeen: '1 hour ago',
    category: 'Gas',
    suggestion: 'Increase gas limit or optimize contract logic'
  },
  {
    error: 'Authorization failed: Invalid signature',
    count: 12,
    lastSeen: '3 hours ago',
    category: 'Auth',
    suggestion: 'Verify signing key and transaction format'
  }
];

export const ErrorIntelligence = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Gas': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'Auth': return <Shield className="w-4 h-4 text-yellow-400" />;
      case 'Network': return <Network className="w-4 h-4 text-purple-400" />;
      case 'Contract Error': return <Bug className="w-4 h-4 text-cyan-400" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getSeverityColor = (count: number) => {
    if (count >= 40) return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (count >= 20) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          Error Intelligence Dashboard
        </h1>
        <p className="text-slate-400 mt-1">Analyze error patterns and get intelligent insights for faster debugging</p>
      </div>

      {/* Error Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Errors</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">358</div>
            <p className="text-xs text-slate-400">
              <span className="text-green-400">-12%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Error Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">5.8%</div>
            <p className="text-xs text-slate-400">
              <span className="text-green-400">-1.2%</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">MTTR</CardTitle>
            <Bug className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">4.2m</div>
            <p className="text-xs text-slate-400">
              Mean time to resolution
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Critical Errors</CardTitle>
            <Shield className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">8</div>
            <p className="text-xs text-slate-400">
              <span className="text-red-400">+2</span> need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Error Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={errorCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {errorCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Error Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={errorTimelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line type="monotone" dataKey="errors" stroke="#EF4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Frequent Errors */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Bug className="w-5 h-5 text-red-400" />
            <span>Most Frequent Errors</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {frequentErrors.map((error, index) => (
              <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getCategoryIcon(error.category)}
                    <Badge className={getSeverityColor(error.count)}>
                      {error.count} occurrences
                    </Badge>
                    <Badge variant="outline" className="text-slate-300 border-slate-600">
                      {error.category}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate-400">{error.lastSeen}</span>
                </div>
                
                <div className="mb-3">
                  <code className="text-sm bg-red-500/10 border border-red-500/30 px-3 py-2 rounded text-red-300 font-mono break-all block">
                    {error.error}
                  </code>
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <div className="text-sm text-blue-300">
                    <span className="font-medium">💡 Suggestion:</span> {error.suggestion}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Error Insights */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-green-400" />
            <span>Intelligent Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="font-medium text-green-400 mb-1">📈 Positive Trend</div>
              <div className="text-sm text-slate-300">
                Gas-related errors have decreased by 23% this week after implementing automatic gas estimation.
              </div>
            </div>
            
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="font-medium text-yellow-400 mb-1">⚠️ Watch Out</div>
              <div className="text-sm text-slate-300">
                Network timeout errors spike during 12:00-16:00. Consider implementing request queuing during peak hours.
              </div>
            </div>
            
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <div className="font-medium text-purple-400 mb-1">🔍 Pattern Detected</div>
              <div className="text-sm text-slate-300">
                Authorization errors correlate with new developer onboarding. Consider updating documentation for key management.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
