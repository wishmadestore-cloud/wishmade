import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ cartCount }) => {
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="logo">
                    WISH<span>MADE</span>
                </Link>

                <div className="nav-links">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        Home
                    </Link>
                    <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>
                        Shop
                    </Link>

                    {user ? (
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <Link to="/profile" className="nav-link" style={{ fontWeight: '500' }}>
                                Account
                            </Link>
                        </div>
                    ) : (
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    )}
                </div>

                <Link to="/checkout" className="cart-icon">
                    🛒
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
