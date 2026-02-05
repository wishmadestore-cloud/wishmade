import React from 'react';

const DashboardStats = ({ orders }) => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'Processing').length;

    return (
        <div className="stats-grid">
            <div className="stat-card">
                <div className="stat-icon revenue">💰</div>
                <div className="stat-info">
                    <h3>Total Revenue</h3>
                    <p>₹{totalRevenue.toLocaleString()}</p>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon orders">📦</div>
                <div className="stat-info">
                    <h3>Total Orders</h3>
                    <p>{totalOrders}</p>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon pending">⏳</div>
                <div className="stat-info">
                    <h3>Pending Orders</h3>
                    <p>{pendingOrders}</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
