import React from 'react';
import { Link } from 'react-router-dom';

const CartPage = ({ cart, removeFromCart }) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '3rem', fontFamily: 'Bebas Neue, sans-serif' }}>Your Cart</h1>

            {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px 0' }}>
                    <h2 style={{ marginBottom: '20px', color: '#ccc' }}>Your cart is empty</h2>
                    <Link to="/" className="btn btn-primary" style={{ padding: '12px 30px', textDecoration: 'none' }}>
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <>
                    <div className="cart-list" style={{ backgroundColor: '#2c2c2c', borderRadius: '10px', overflow: 'hidden', border: '1px solid #444', marginBottom: '30px' }}>
                        {cart.map((item, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #444' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div style={{ width: '80px', height: '80px', backgroundColor: '#444', borderRadius: '8px', overflow: 'hidden' }}>
                                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>{item.name}</h3>
                                        <div style={{ color: '#aaa', fontSize: '0.9rem' }}>{item.category} / {item.gender}</div>
                                        {item.selectedSize && <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Size: {item.selectedSize}</div>}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹{item.price.toLocaleString()}</div>
                                    <button
                                        onClick={() => removeFromCart(index)}
                                        style={{ background: '#dc3545', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}
                                        title="Remove Item"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '30px', padding: '20px', backgroundColor: '#2c2c2c', borderRadius: '10px', border: '1px solid #444' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            Total: <span style={{ color: '#28a745' }}>₹{total.toLocaleString()}</span>
                        </div>
                        <Link to="/checkout" className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem', textDecoration: 'none' }}>
                            Proceed to Checkout
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
