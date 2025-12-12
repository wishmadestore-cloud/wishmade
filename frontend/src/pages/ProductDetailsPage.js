import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';

const ProductDetailsPage = ({ addToCart }) => {
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
                    // setSelectedSize(data.sizes[0]); 
                    // Let's force user to pick one
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
        navigate('/checkout'); // Or stay on page, but user flow suggests immediate action
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

                    <button
                        className="btn btn-primary"
                        onClick={handleAddToCart}
                        style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
