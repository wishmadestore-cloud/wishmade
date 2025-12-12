import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
            const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });

            // Check if user is admin (we can also check this on backend, but good UX here)
            // Note: The backend login returns user info. We should technically ideally have an dedicated admin login
            // but reusing the main login is fine as long as we verify.
            // However, the standard /auth/login returns a token. We can store it.
            // The backend /api/orders will strictly deny if the user isn't admin.

            localStorage.setItem('adminToken', data.token);
            setToken(data.token);
        } catch (err) {
            setError('Invalid credentials or not an admin');
        }
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
            backgroundColor: '#f5f5f5', fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                background: 'white', padding: '40px', borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Admin Login</h2>
                {error && <div style={{ color: 'red', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%', padding: '12px', background: 'black', color: 'white',
                            border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px'
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
