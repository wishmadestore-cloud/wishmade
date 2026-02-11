import React from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const WishlistPage = ({ wishlist, toggleWishlist, addToCart }) => {
    return (
        <div className="container" style={{ padding: '60px 20px', minHeight: '70vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Your Wishlist</h1>
                <p style={{ color: '#666' }}>Items you've saved for later</p>
            </div>

            {wishlist.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#f9f9f9', borderRadius: '16px' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>❤️</div>
                    <h3>Your wishlist is empty</h3>
                    <p style={{ color: '#666', marginBottom: '24px' }}>Save items you love to find them easily later.</p>
                    <Link to="/products" className="btn btn-primary">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-4">
                    {wishlist.map(product => (
                        <div key={product.id} style={{ position: 'relative' }}>
                            <ProductCard
                                product={product}
                                wishlist={wishlist}
                                toggleWishlist={toggleWishlist}
                                onAddToCart={addToCart}
                            />
                            <div style={{ padding: '0 16px 16px' }}>
                                <button
                                    className="btn btn-primary"
                                    style={{ width: '100%', fontSize: '0.8rem', padding: '10px' }}
                                    onClick={() => addToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
