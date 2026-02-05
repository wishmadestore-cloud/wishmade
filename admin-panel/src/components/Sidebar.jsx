import React from 'react';

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'orders', label: 'Orders', icon: '📦' },
        { id: 'products', label: 'Products', icon: '🛍️' },
        { id: 'customers', label: 'Customers', icon: '👥' },
        { id: 'settings', label: 'Settings', icon: '⚙️' }
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>WishMade</h2>
                <span className="badge">Admin</span>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(item.id)}
                    >
                        <span className="icon">{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button onClick={onLogout} className="logout-btn">
                    <span className="icon">🚪</span> Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
