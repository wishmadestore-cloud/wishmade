import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';

const ProductDetailsPage = ({ addToCart, wishlist = [], toggleWishlist }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await fetchProductById(id);
                setProduct(data);
                // Default to first size if available
                if (data.sizes && data.sizes.length > 0) {
                    setSelectedSize(data.sizes[0]);
                }
            } catch (err) {
                setError('Failed to load product details');
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        if (product.sizes && product.sizes.length > 0 && !selectedSize) {
            alert('Please select a size');
            return;
        }

        const productToAdd = {
            ...product,
            selectedSize: selectedSize || 'One Size'
        };

        addToCart(productToAdd);
        navigate('/cart');
    };

    if (loading) return <div className="container" style={{ padding: '50px' }}>Loading...</div>;
    if (error) return <div className="container" style={{ padding: '50px', color: 'red' }}>{error}</div>;
    if (!product) return <div className="container" style={{ padding: '50px' }}>Product not found</div>;

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', cursor: 'pointer', textDecoration: 'underline' }}>
                &larr; Back to Shop
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                {/* Image Side */}
                <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }}
                    />
                </div>

                {/* Info Side */}
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{product.name}</h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '24px' }}>{product.category}</p>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '24px' }}>₹{product.price.toLocaleString()}</p>

                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '32px' }}>
                        {product.description}
                    </p>

                    {/* Size Selector */}
                    {product.sizes && (
                        <div style={{ marginBottom: '32px' }}>
                            <h3 style={{ marginBottom: '12px', fontSize: '1rem' }}>Select Size:</h3>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        style={{
                                            padding: '12px 20px',
                                            border: selectedSize === size ? '2px solid black' : '1px solid #ddd',
                                            backgroundColor: selectedSize === size ? 'black' : 'white',
                                            color: selectedSize === size ? 'white' : 'black',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            minWidth: '60px',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '20px' }}>
                        <button
                            className="btn btn-primary"
                            onClick={handleAddToCart}
                            style={{ flex: 1, padding: '16px', fontSize: '1.1rem' }}
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={() => toggleWishlist(product)}
                            style={{
                                width: '60px',
                                border: '1.5px solid #ddd',
                                borderRadius: '8px',
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            title={wishlist.some(item => item.id === product.id) ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill={wishlist.some(item => item.id === product.id) ? "#ff4d4d" : "none"} stroke={wishlist.some(item => item.id === product.id) ? "#ff4d4d" : "currentColor"} strokeWidth="1.5">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
