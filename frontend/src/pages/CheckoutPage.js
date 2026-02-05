import React, { useState, useContext, useEffect } from 'react';
import { placeOrder, updateUserProfile } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const CheckoutPage = ({ cart, clearCart }) => {
    const { user, token, updateUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderId, setOrderId] = useState(null);

    // Autofill form if user is logged in
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                address: user.address || '',
                city: user.city || '',
                zip: user.zip || ''
            });
        }
    }, [user]);

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Update user profile with latest address if logged in
            if (user && token) {
                try {
                    const updatedUser = await updateUserProfile(formData, token);
                    updateUser(updatedUser);
                } catch (updateErr) {
                    console.error("Failed to update profile address", updateErr);
                }
            }

            const response = await placeOrder({
                customer: formData,
                items: cart,
                total
            });
            setOrderId(response.orderId);
            clearCart();
        } catch (err) {
            alert('Failed to place order');
        } finally {
            setIsSubmitting(false);
        }
    };

    const [isReviewing, setIsReviewing] = useState(false);

    const handleInitialSubmit = (e) => {
        e.preventDefault();
        setIsReviewing(true);
    };

    if (orderId) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎉</div>
                <h1>Thank you for your order!</h1>
                <p>Your order ID is #{orderId}</p>
                <p>We'll send you an email confirmation shortly.</p>
                <button
                    className="btn btn-secondary"
                    onClick={() => window.location.href = '/'}
                    style={{ marginTop: '20px' }}
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
                <h2>Your cart is empty</h2>
                <a href="/" className="btn btn-primary" style={{ marginTop: '20px' }}>
                    Start Shopping
                </a>
            </div>
        );
    }

    if (isReviewing) {
        return (
            <div className="review-container">
                <h1 className="review-title">Review Your Order</h1>

                <div className="review-card">
                    <h3 className="review-section-title">Shipping to:</h3>
                    <div className="review-details">
                        <p><strong>{formData.name}</strong></p>
                        <p>{formData.address}</p>
                        <p>{formData.city}, {formData.zip}</p>
                        <p>{formData.email}</p>
                    </div>
                    <button
                        className="review-edit-btn"
                        onClick={() => setIsReviewing(false)}
                    >
                        Edit Shipping Details
                    </button>
                </div>

                <div className="review-card">
                    <h3 className="review-section-title">Order Items:</h3>
                    {cart.map((item, i) => (
                        <div key={i} className="review-item">
                            <span className="review-item-name">{item.name} {item.selectedSize && `(Size: ${item.selectedSize})`}</span>
                            <span className="review-item-price">₹{item.price}</span>
                        </div>
                    ))}
                    <div className="review-total">
                        <span>Total Amount</span>
                        <span>₹{total.toLocaleString()}</span>
                    </div>
                </div>

                <div className="review-actions">
                    <button
                        className="btn-large btn-secondary"
                        onClick={() => setIsReviewing(false)}
                    >
                        Back
                    </button>
                    <button
                        className="btn-large btn-primary"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Processing...' : 'Confirm & Place Order'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <h1 style={{ marginBottom: '40px' }}>Checkout</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                {/* Form */}
                <div>
                    <h2 style={{ marginBottom: '20px' }}>Shipping Details</h2>
                    <form onSubmit={handleInitialSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Full Name</label>
                            <input
                                type="text"
                                required
                                className="checkout-input"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Email</label>
                            <input
                                type="email"
                                required
                                className="checkout-input"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Address</label>
                            <textarea
                                required
                                rows="3"
                                className="checkout-textarea"
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                            ></textarea>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px' }}>City</label>
                                <input
                                    type="text"
                                    required
                                    className="checkout-input"
                                    value={formData.city}
                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px' }}>ZIP Code</label>
                                <input
                                    type="text"
                                    required
                                    className="checkout-input"
                                    value={formData.zip}
                                    onChange={e => setFormData({ ...formData, zip: e.target.value })}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ marginTop: '16px', width: '100%', padding: '12px' }}
                        >
                            Review Order
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="order-summary-card">
                    <h2 style={{ marginBottom: '20px' }}>Order Summary</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                        {cart.map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #444', paddingBottom: '8px' }}>
                                <span>{item.name}</span>
                                <span>₹{item.price}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ borderTop: '1px solid #555', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
