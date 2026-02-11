import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '../api';

const CustomerManagement = ({ token }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await fetchUsers(token);
            setUsers(data);
        } catch (error) {
            console.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
            try {
                await deleteUser(id, token);
                loadUsers();
            } catch (error) {
                alert(error.response?.data?.message || 'Failed to delete user');
            }
        }
    };

    return (
        <div className="customer-management">
            <h1 className="page-title">Customer Directory</h1>

            {loading ? (
                <div className="loading">Loading customers...</div>
            ) : (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joined Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        <div className="customer-cell">
                                            <strong>{user.name}</strong>
                                        </div>
                                    </td>
                                    <td className="mono-font">{user.email}</td>
                                    <td>
                                        <span className={`status-badge ${user.isAdmin ? 'delivered' : 'shipped'}`}>
                                            {user.isAdmin ? 'Admin' : 'Customer'}
                                        </span>
                                    </td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        {!user.isAdmin && (
                                            <button className="action-btn delete" onClick={() => handleDelete(user._id)}>🗑️</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CustomerManagement;
