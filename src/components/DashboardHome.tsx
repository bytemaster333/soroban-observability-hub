
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Terminal, TrendingUp, Clock, AlertTriangle, CheckCircle2, Activity } from 'lucide-react';

// Mock data for charts
const activityData = [
  { time: '00:00', commands: 12, rpc: 24 },
  { time: '04:00', commands: 5, rpc: 15 },
  { time: '08:00', commands: 28, rpc: 42 },
  { time: '12:00', commands: 45, rpc: 67 },
  { time: '16:00', commands: 52, rpc: 89 },
  { time: '20:00', commands: 31, rpc: 56 },
];

const topCommands = [
  { name: 'contract invoke', count: 234 },
  { name: 'account create', count: 156 },
  { name: 'contract deploy', count: 89 },
  { name: 'payment send', count: 67 },
];

const recentActivity = [
  { type: 'CLI', command: 'soroban contract deploy', status: 'success', time: '2 min ago' },
  { type: 'RPC', command: 'simulateTransaction', status: 'success', time: '3 min ago' },
  { type: 'CLI', command: 'stellar account create', status: 'success', time: '5 min ago' },
  { type: 'RPC', command: 'sendTransaction', status: 'error', time: '7 min ago' },
];

export const DashboardHome = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Stellar Command Insights
        </h1>
        <p className="text-slate-600 mt-2 text-lg">Real-time monitoring and analytics for your Stellar development</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">Total Commands</CardTitle>
            <Terminal className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">2,847</div>
            <p className="text-sm text-slate-600">
              <span className="text-green-500 font-medium">+12%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">Success Rate</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">97.2%</div>
            <p className="text-sm text-slate-600">
              <span className="text-green-500 font-medium">+2.1%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">Avg Response</CardTitle>
            <Clock className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">1.3s</div>
            <p className="text-sm text-slate-600">
              <span className="text-red-500 font-medium">+0.2s</span> from baseline
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">Active Errors</CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">23</div>
            <p className="text-sm text-slate-600">
              <span className="text-green-500 font-medium">-8</span> from last hour
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <span>Activity Over Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }} 
                />
                <Line type="monotone" dataKey="commands" stroke="#3b82f6" strokeWidth={3} />
                <Line type="monotone" dataKey="rpc" stroke="#6366f1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span>Top Commands</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topCommands} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="name" type="category" stroke="#64748b" width={120} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }} 
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-200/40">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-200 px-2 py-1 rounded-md">
                      {activity.type}
                    </span>
                    <span className="text-sm font-medium text-slate-900">{activity.command}</span>
                  </div>
                </div>
                <span className="text-sm text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
