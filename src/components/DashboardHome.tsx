
import { TrendingUp, Terminal, AlertCircle, CheckCircle2, Clock, Activity, Layers, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const summaryData = [
  { name: 'Mon', transactions: 45, errors: 3, volume: 12.5 },
  { name: 'Tue', transactions: 52, errors: 1, volume: 18.7 },
  { name: 'Wed', transactions: 38, errors: 5, volume: 9.3 },
  { name: 'Thu', transactions: 61, errors: 2, volume: 22.1 },
  { name: 'Fri', transactions: 48, errors: 4, volume: 15.8 },
  { name: 'Sat', transactions: 29, errors: 1, volume: 8.2 },
  { name: 'Sun', transactions: 33, errors: 2, volume: 11.4 },
];

const recentActivity = [
  { time: '14:32', command: 'soroban contract deploy', status: 'success', duration: '2.3s', network: 'testnet' },
  { time: '14:28', command: 'stellar account create', status: 'success', duration: '0.8s', network: 'testnet' },
  { time: '14:25', command: 'soroban contract invoke', status: 'error', duration: '1.2s', network: 'testnet' },
  { time: '14:20', command: 'stellar payment send', status: 'success', duration: '0.5s', network: 'testnet' },
  { time: '14:15', command: 'soroban contract build', status: 'success', duration: '15.7s', network: 'local' },
];

export const DashboardHome = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-purple-300 bg-clip-text text-transparent">
          Stellar Command Center
        </h1>
        <p className="text-purple-300/80 mt-2 text-lg">Real-time insights into your Stellar blockchain development</p>
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-purple-500/30 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-purple-200">Transactions Today</CardTitle>
            <Layers className="h-5 w-5 text-purple-400" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white">1,247</div>
            <p className="text-xs text-purple-300/80">
              <span className="text-emerald-400">+12%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-purple-500/30 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-purple-200">Success Rate</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white">97.8%</div>
            <p className="text-xs text-purple-300/80">
              <span className="text-emerald-400">+2.1%</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-purple-500/30 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-purple-200">Avg Confirmation</CardTitle>
            <Clock className="h-5 w-5 text-yellow-400" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white">4.2s</div>
            <p className="text-xs text-purple-300/80">
              <span className="text-red-400">+0.3s</span> network load
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-purple-500/30 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-purple-200">Network Fees</CardTitle>
            <Zap className="h-5 w-5 text-yellow-400" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white">0.01 XLM</div>
            <p className="text-xs text-purple-300/80">
              <span className="text-emerald-400">-5%</span> avg fee cost
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-purple-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span>Transaction Volume</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={summaryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6B46C1" opacity={0.2} />
                <XAxis dataKey="name" stroke="#A855F7" />
                <YAxis stroke="#A855F7" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E1B4B', 
                    border: '1px solid #7C3AED',
                    borderRadius: '12px',
                    color: '#fff',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
                  }} 
                />
                <Line type="monotone" dataKey="transactions" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-purple-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span>Error Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={summaryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6B46C1" opacity={0.2} />
                <XAxis dataKey="name" stroke="#A855F7" />
                <YAxis stroke="#A855F7" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E1B4B', 
                    border: '1px solid #7C3AED',
                    borderRadius: '12px',
                    color: '#fff',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
                  }} 
                />
                <Bar dataKey="errors" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Live Activity Feed */}
      <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span>Live Stellar Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-xl hover:border-purple-400/40 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'success' ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-red-400 shadow-lg shadow-red-400/50'
                  }`} />
                  <span className="text-sm text-purple-200 font-mono">{activity.time}</span>
                  <code className="text-sm bg-slate-700/60 px-3 py-1 rounded-lg text-purple-300 border border-purple-500/30">
                    {activity.command}
                  </code>
                  <span className="text-xs bg-slate-600/60 px-2 py-1 rounded text-slate-300 border border-slate-600">
                    {activity.network}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-purple-300/80 font-mono">{activity.duration}</span>
                  {activity.status === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
