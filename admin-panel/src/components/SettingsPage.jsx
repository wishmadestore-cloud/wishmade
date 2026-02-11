import React, { useState } from 'react';
import { updateProfile } from '../api';

const SettingsPage = ({ token }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: 'danger', text: 'Passwords do not match' });
            return;
        }

        setLoading(true);
        try {
            await updateProfile({
                name: formData.name,
                email: formData.email,
                password: formData.password
            }, token);
            setMessage({ type: 'success', text: 'Profile updated successfully' });
            setFormData({ ...formData, password: '', confirmPassword: '' });
        } catch (error) {
            setMessage({ type: 'danger', text: error.response?.data?.message || 'Failed to update profile' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="settings-page">
            <h1 className="page-title">Admin Settings</h1>

            <div className="placeholder-content" style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto', padding: '40px' }}>
                <h3>Profile Information</h3>
                <p style={{ color: '#666', marginBottom: '24px' }}>Update your administrative credentials and contact information.</p>

                {message && (
                    <div className={`status-badge ${message.type === 'success' ? 'delivered' : 'pending'}`} style={{ marginBottom: '20px', display: 'block' }}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Display Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Admin Name" />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="admin@wishmade.com" />
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '30px 0' }} />

                    <h3>Change Password</h3>
                    <div className="form-group">
                        <label>New Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep current" />
                    </div>
                    <div className="form-group">
                        <label>Confirm New Password</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;
