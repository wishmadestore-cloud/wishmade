import React, { useEffect, useState } from 'react';
import { fetchOrders } from './api';
import './App.css';

import LoginPage from './LoginPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  if (!token) {
    return <LoginPage setToken={setToken} />;
  }

  if (loading) return (
    <div style={{ padding: '50px', display: 'flex', justifyContent: 'center' }}>
      Loading orders...
    </div>
  );

  if (error) return (
    <div style={{ padding: '50px', color: 'red', textAlign: 'center' }}>
      {error}
      <button onClick={() => {
        localStorage.removeItem('adminToken');
        setToken('');
      }} style={{ display: 'block', margin: '20px auto', padding: '10px' }}>Logout</button>
    </div>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ margin: 0 }}>WishMade Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem('adminToken');
            setToken('');
          }}
          style={{ padding: '8px 16px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>

      {/* Search Filter */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search by name, email, or order ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '12px',
            width: '100%',
            maxWidth: '500px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '16px'
          }}
        />
      </div>

      {filteredOrders.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No orders found matching your criteria.</p>
      ) : (
        <div style={{ overflowX: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: 'white' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ padding: '16px', borderBottom: '2px solid #eee' }}>Order ID</th>
                <th style={{ padding: '16px', borderBottom: '2px solid #eee' }}>Date</th>
                <th style={{ padding: '16px', borderBottom: '2px solid #eee' }}>Customer</th>
                <th style={{ padding: '16px', borderBottom: '2px solid #eee' }}>Items</th>
                <th style={{ padding: '16px', borderBottom: '2px solid #eee' }}>Total</th>
                <th style={{ padding: '16px', borderBottom: '2px solid #eee' }}>Overview</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.slice().reverse().map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '16px', fontFamily: 'monospace' }}>{order.id}</td>
                  <td style={{ padding: '16px' }}>
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 'bold' }}>{order.customer.name}</div>
                    <div style={{ fontSize: '0.9em', color: '#666' }}>{order.customer.email}</div>
                    <div style={{ marginTop: '8px', fontSize: '0.85em', color: '#444' }}>
                      <div>{order.customer.address}</div>
                      <div>
                        {order.customer.city && order.customer.zip
                          ? `${order.customer.city}, ${order.customer.zip}`
                          : ''}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {order.items.map((item, i) => (
                        <li key={i} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                          )}
                          <div>
                            <span style={{ fontWeight: '500' }}>{item.name}</span>
                            {item.selectedSize && (
                              <span style={{
                                marginLeft: '6px',
                                padding: '2px 6px',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '4px',
                                fontSize: '0.8em'
                              }}>
                                Size: {item.selectedSize}
                              </span>
                            )}
                            <div style={{ fontSize: '0.8em', color: '#666' }}>₹{item.price}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ padding: '16px' }}>₹{order.total.toLocaleString()}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      background: '#e3f2fd',
                      color: '#1565c0',
                      fontSize: '0.9em'
                    }}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
