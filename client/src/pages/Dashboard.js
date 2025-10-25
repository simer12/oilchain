import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Warehouse, Zap } from 'lucide-react';
import api from '../utils/api';
import './Dashboard.css';

function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalFarmers: 0,
    activeTransactions: 0,
    totalWarehouses: 0,
    averagePrice: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/dashboard/summary');
      setMetrics(response.data.metrics);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const mockChartData = [
    { month: 'Jan', soybean: 45000, groundnut: 32000, mustard: 28000 },
    { month: 'Feb', soybean: 52000, groundnut: 35000, mustard: 31000 },
    { month: 'Mar', soybean: 48000, groundnut: 38000, mustard: 34000 },
    { month: 'Apr', soybean: 61000, groundnut: 42000, mustard: 37000 },
    { month: 'May', soybean: 55000, groundnut: 40000, mustard: 35000 },
    { month: 'Jun', soybean: 67000, groundnut: 45000, mustard: 40000 }
  ];

  const pieData = [
    { name: 'Soybean', value: 35 },
    { name: 'Groundnut', value: 30 },
    { name: 'Mustard', value: 20 },
    { name: 'Sunflower', value: 15 }
  ];

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to OilChain - Your AI-Powered Value Chain Platform</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon farmers">
            <Users size={32} />
          </div>
          <div className="metric-content">
            <p className="metric-label">Total Farmers</p>
            <p className="metric-value">{metrics.totalFarmers}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon transactions">
            <Zap size={32} />
          </div>
          <div className="metric-content">
            <p className="metric-label">Active Transactions</p>
            <p className="metric-value">{metrics.activeTransactions}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon warehouses">
            <Warehouse size={32} />
          </div>
          <div className="metric-content">
            <p className="metric-label">Total Warehouses</p>
            <p className="metric-value">{metrics.totalWarehouses}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon price">
            <TrendingUp size={32} />
          </div>
          <div className="metric-content">
            <p className="metric-label">Avg Price (₹/Quintal)</p>
            <p className="metric-value">₹{metrics.averagePrice.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Price Trends (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
              />
              <Legend />
              <Line type="monotone" dataKey="soybean" stroke="#667eea" strokeWidth={2} dot={{ fill: '#667eea' }} />
              <Line type="monotone" dataKey="groundnut" stroke="#764ba2" strokeWidth={2} dot={{ fill: '#764ba2' }} />
              <Line type="monotone" dataKey="mustard" stroke="#f093fb" strokeWidth={2} dot={{ fill: '#f093fb' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Oilseed Production Mix</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Market Volume (Quintals)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="soybean" fill="#667eea" radius={[8, 8, 0, 0]} />
              <Bar dataKey="groundnut" fill="#764ba2" radius={[8, 8, 0, 0]} />
              <Bar dataKey="mustard" fill="#f093fb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Platform Statistics</h3>
          <div className="stats-list">
            <div className="stat-item">
              <span className="stat-label">Total Transactions</span>
              <span className="stat-value">2,547</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Success Rate</span>
              <span className="stat-value">94.2%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Avg Transaction Value</span>
              <span className="stat-value">₹85,430</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Value Transacted</span>
              <span className="stat-value">₹217.3 Cr</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Warehouse Capacity Used</span>
              <span className="stat-value">67%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Avg Delivery Time</span>
              <span className="stat-value">2.4 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
