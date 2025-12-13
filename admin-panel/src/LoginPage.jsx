import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [shake, setShake] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
            const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });

            localStorage.setItem('adminToken', data.token);
            setToken(data.token);
        } catch (err) {
            setError('Invalid credentials. Access Denied.');
            setShake(true);
            setTimeout(() => setShake(false), 500); // Reset shake after 0.5s
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', // Nice blue gradient
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <style>
                {`
                    @keyframes shake {
                        0% { transform: translateX(0); }
                        25% { transform: translateX(-5px); }
                        50% { transform: translateX(5px); }
                        75% { transform: translateX(-5px); }
                        100% { transform: translateX(0); }
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    .input-group:focus-within svg { color: #4facfe; }
                    .glass-input:focus { 
                        outline: none; 
                        border-color: #4facfe !important;
                        box-shadow: 0 0 10px rgba(79, 172, 254, 0.3);
                    }
                `}
            </style>

            <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                padding: '50px',
                borderRadius: '20px',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                width: '100%',
                maxWidth: '400px',
                color: 'white',
                animation: shake ? 'shake 0.4s ease-in-out' : 'none'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px', fontWeight: '300', letterSpacing: '2px' }}>
                    ADMIN PANEL
                </h2>

                {error && (
                    <div style={{
                        background: 'rgba(255, 87, 87, 0.2)',
                        color: '#ffcccc',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        textAlign: 'center',
                        fontSize: '14px',
                        border: '1px solid rgba(255, 87, 87, 0.3)'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="input-group" style={{ marginBottom: '20px', position: 'relative' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            style={{ position: 'absolute', left: '15px', top: '12px', color: '#ccc', transition: 'color 0.3s' }}>
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <input
                            className="glass-input"
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            style={{
                                width: '100%', padding: '12px 12px 12px 45px',
                                borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.05)', color: 'white',
                                fontSize: '16px', boxSizing: 'border-box'
                            }}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="input-group" style={{ marginBottom: '30px', position: 'relative' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            style={{ position: 'absolute', left: '15px', top: '12px', color: '#ccc', transition: 'color 0.3s' }}>
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <input
                            className="glass-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            style={{
                                width: '100%', padding: '12px 12px 12px 45px',
                                borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.05)', color: 'white',
                                fontSize: '16px', boxSizing: 'border-box'
                            }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%', padding: '14px',
                            background: isLoading ? '#555' : 'linear-gradient(to right, #4facfe, #00f2fe)',
                            color: 'white', border: 'none', borderRadius: '8px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            fontSize: '16px', fontWeight: 'bold',
                            letterSpacing: '1px',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
                            boxShadow: isLoading ? 'none' : '0 4px 15px rgba(0, 242, 254, 0.4)'
                        }}
                        onMouseOver={(e) => !isLoading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                        onMouseOut={(e) => !isLoading && (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                        {isLoading ? (
                            <>
                                <div style={{
                                    border: '3px solid rgba(255,255,255,0.3)',
                                    borderTop: '3px solid white',
                                    borderRadius: '50%',
                                    width: '20px', height: '20px',
                                    animation: 'spin 1s linear infinite'
                                }}></div>
                                Signing In...
                            </>
                        ) : (
                            'LOGIN'
                        )}
                    </button>

                    <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                        Secure Admin Environment &copy; {new Date().getFullYear()}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
