import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5001/api";
                const response = await fetch(`${API_BASE_URL}/orders/myorders`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    setError('Failed to fetch orders');
                }
            } catch (err) {
                setError('Error connecting to server');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Loading your orders...</h2>
        </div>
    );

    return (
        <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
            <h1>My Orders</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <h3>You haven't placed any orders yet.</h3>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            backgroundColor: '#2a5298',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
                    {orders.slice().reverse().map(order => (
                        <div key={order.id} style={{
                            border: '1px solid #eee',
                            borderRadius: '10px',
                            padding: '20px',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid #eee',
                                paddingBottom: '10px',
                                marginBottom: '10px'
                            }}>
                                <div>
                                    <strong>Order #{order.id}</strong>
                                    <span style={{ marginLeft: '10px', color: '#666', fontSize: '0.9em' }}>
                                        {new Date(order.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <div>
                                    <span style={{
                                        padding: '5px 10px',
                                        borderRadius: '15px',
                                        backgroundColor: order.status === 'Processing' ? '#fff3e0' : '#e8f5e9',
                                        color: order.status === 'Processing' ? '#ef6c00' : '#2e7d32',
                                        fontSize: '0.85em',
                                        fontWeight: 'bold'
                                    }}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                {order.items.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                        {item.image && (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px', marginRight: '15px' }}
                                            />
                                        )}
                                        <div>
                                            <div style={{ fontWeight: '500' }}>{item.name}</div>
                                            <div style={{ fontSize: '0.9em', color: '#666' }}>
                                                ₹{item.price} {item.selectedSize && `| Size: ${item.selectedSize}`}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ textAlign: 'right', paddingTop: '10px', borderTop: '1px solid #eee' }}>
                                <strong>Total: ₹{order.total.toLocaleString()}</strong>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
