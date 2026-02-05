import React from 'react';

const OrderTable = ({ orders }) => {
    if (orders.length === 0) {
        return (
            <div className="empty-state">
                <p>No orders found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td className="mono-font">#{order.id.toString().slice(-6)}</td>
                            <td>{new Date(order.date).toLocaleDateString()}</td>
                            <td>
                                <div className="customer-cell">
                                    <strong>{order.customer.name}</strong>
                                    <span>{order.customer.email}</span>
                                </div>
                            </td>
                            <td>
                                <div className="items-cell">
                                    {order.items.slice(0, 2).map((item, i) => (
                                        <div key={i} className="mini-item">
                                            {item.image && <img src={item.image} alt="product" />}
                                            <span>{item.name}</span>
                                        </div>
                                    ))}
                                    {order.items.length > 2 && (
                                        <span className="more-items">+{order.items.length - 2} more</span>
                                    )}
                                </div>
                            </td>
                            <td className="amount">₹{order.total.toLocaleString()}</td>
                            <td>
                                <span className={`status-badge ${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
