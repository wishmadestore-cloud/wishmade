import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { user, logout, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    if (loading || !user) return <div className="container" style={{ padding: '50px' }}>Loading...</div>;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '40px',
                borderBottom: '1px solid #eee',
                paddingBottom: '20px'
            }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>My Account</h1>
                    <p style={{ color: '#666' }}>Welcome back, {user.name}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="btn"
                    style={{
                        padding: '10px 20px',
                        border: '1px solid #000',
                        backgroundColor: 'transparent',
                        color: '#000',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }}
                >
                    Logout
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
                {/* Left Column: Account Info */}
                <div>
                    <div style={{
                        backgroundColor: '#f9f9f9',
                        padding: '30px',
                        borderRadius: '12px',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: '#000',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            margin: '0 auto 20px'
                        }}>
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{user.name}</h3>
                        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0' }}>{user.email}</p>
                    </div>
                </div>

                {/* Right Column: Order History */}
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Order History</h2>
                    <div style={{
                        border: '1px solid #eee',
                        borderRadius: '8px',
                        padding: '40px',
                        textAlign: 'center',
                        color: '#888'
                    }}>
                        <p style={{ marginBottom: '10px' }}>You haven't placed any orders yet.</p>
                        <button
                            onClick={() => navigate('/products')}
                            style={{
                                color: 'var(--accent)',
                                background: 'none',
                                border: 'none',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}
                        >
                            Start Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
