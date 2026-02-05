import React, { useEffect, useState } from 'react';
import { fetchOrders } from './api';
import './App.css';
import LoginPage from './LoginPage';
import Sidebar from './components/Sidebar';
import DashboardStats from './components/DashboardStats';
import OrderTable from './components/OrderTable';

function App() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    const loadOrders = async () => {
      try {
        const data = await fetchOrders(token);
        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        setError('Failed to fetch orders. You might not be an admin.');
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [token]);

  useEffect(() => {
    const results = orders.filter(order =>
      order.id.toString().includes(searchTerm) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(results);
  }, [searchTerm, orders]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
  };

  if (!token) {
    return <LoginPage setToken={setToken} />;
  }

  return (
    <div className="admin-layout">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <main className="main-content">
        <header className="top-bar">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search orders, customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="user-profile">
            <div className="avatar">A</div>
            <span>Admin User</span>
          </div>
        </header>

        <div className="content-area">
          {error && <div className="error-banner">{error}</div>}

          {loading ? (
            <div className="loading-state">Loading data...</div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <>
                  <h1 className="page-title">Dashboard Overview</h1>
                  <DashboardStats orders={orders} />

                  <div className="section-header">
                    <h2>Recent Orders</h2>
                  </div>
                  <OrderTable orders={filteredOrders} />
                </>
              )}

              {activeTab === 'orders' && (
                <>
                  <h1 className="page-title">All Orders</h1>
                  <OrderTable orders={filteredOrders} />
                </>
              )}

              {['products', 'customers', 'settings'].includes(activeTab) && (
                <div className="placeholder-content">
                  <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                  <p>This module is coming soon.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

