
const API_BASE_URL = 'http://localhost:8000/api';

export interface CLILog {
  id: number;
  command: string;
  parameters?: string;
  status: 'success' | 'error';
  timestamp: string;
  duration_ms: number;
  output: string;
  user?: string;
}

export interface RPCLog {
  id: number;
  rpc_method: string;
  parameters: any;
  status: 'success' | 'error';
  timestamp: string;
  duration_ms: number;
  result?: any;
}

export interface AnalyticsSummary {
  total_commands: number;
  success_rate: number;
  avg_response_time: number;
  error_count: number;
  commands_per_hour: number;
  performance_score: number;
}

export interface ContractEvent {
  id: number;
  contract_id: string;
  event_type: string;
  timestamp: string;
  data: any;
}

export interface ContractMetrics {
  total_calls: number;
  gas_usage: any[];
  error_distribution: any[];
  performance_data: any[];
}

class APIService {
  async fetchCLILogs(): Promise<CLILog[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/cli-logs`);
      if (!response.ok) throw new Error('Failed to fetch CLI logs');
      return await response.json();
    } catch (error) {
      console.error('Error fetching CLI logs:', error);
      return [];
    }
  }

  async fetchRPCLogs(): Promise<RPCLog[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/rpc-logs`);
      if (!response.ok) throw new Error('Failed to fetch RPC logs');
      return await response.json();
    } catch (error) {
      console.error('Error fetching RPC logs:', error);
      return [];
    }
  }

  async fetchAnalyticsSummary(): Promise<AnalyticsSummary | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/summary`);
      if (!response.ok) throw new Error('Failed to fetch analytics summary');
      return await response.json();
    } catch (error) {
      console.error('Error fetching analytics summary:', error);
      return null;
    }
  }

  async fetchLiveEvents(): Promise<ContractEvent[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/events/live`);
      if (!response.ok) throw new Error('Failed to fetch live events');
      return await response.json();
    } catch (error) {
      console.error('Error fetching live events:', error);
      return [];
    }
  }

  async fetchContractMetrics(): Promise<ContractMetrics | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/metrics`);
      if (!response.ok) throw new Error('Failed to fetch contract metrics');
      return await response.json();
    } catch (error) {
      console.error('Error fetching contract metrics:', error);
      return null;
    }
  }
}

export const apiService = new APIService();
