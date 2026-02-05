import React, { useContext, useEffect } from 'react';
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
        <div className="profile-page">
            {/* Gradient Background */}
            <div className="profile-gradient-bg"></div>

            <div className="container" style={{ padding: '80px 20px', maxWidth: '1000px', position: 'relative' }}>
                {/* Header with Logout */}
                <div className="profile-header">
                    <div>
                        <h1 className="profile-title">My Account</h1>
                        <p className="profile-subtitle">Welcome back, {user.name} 👋</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn logout-btn"
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M7 16H4a1 1 0 01-1-1V3a1 1 0 011-1h3M12 13l4-4-4-4M16 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Logout
                    </button>
                </div>

                <div className="profile-grid">
                    {/* Left Column: Account Info Card */}
                    <div className="profile-card account-card">
                        <div className="profile-avatar-large">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <h3 className="profile-name">{user.name}</h3>
                        <p className="profile-email">{user.email}</p>

                        <div className="profile-stats">
                            <div className="stat-item">
                                <div className="stat-value">0</div>
                                <div className="stat-label">Orders</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-value">Member</div>
                                <div className="stat-label">Status</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order History & Info */}
                    <div>
                        <h2 className="section-title">Order History</h2>
                        <div className="profile-card orders-card">
                            <div className="empty-state">
                                <div className="empty-icon">📦</div>
                                <h3 className="empty-title">No orders yet</h3>
                                <p className="empty-text">Start exploring our collection and place your first order!</p>
                                <button
                                    onClick={() => navigate('/products')}
                                    className="btn btn-primary shop-now-btn"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
