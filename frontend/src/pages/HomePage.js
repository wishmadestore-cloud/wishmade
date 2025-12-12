import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

const HomePage = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                setError("Unable to load products. Please ensure the backend is running.");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) return <div className="container" style={{ padding: '50px', textAlign: 'center' }}>Loading curated items...</div>;
    if (error) return <div className="container" style={{ padding: '50px', textAlign: 'center', color: 'red' }}>{error}</div>;

    return (
        <div>
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center',
                marginBottom: '40px'
            }}>
                <div>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '16px' }}>Redefine Your Style</h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 24px' }}>
                        Discover the latest trends in fashion with our premium collection.
                    </p>
                    <a href="#shop" className="btn btn-primary" style={{ backgroundColor: 'white', color: 'black' }}>
                        Shop Now
                    </a>
                </div>
            </div>

            {/* Products Section */}
            <div id="shop" className="container" style={{ paddingBottom: '60px' }}>
                <h2 style={{ marginBottom: '32px', fontSize: '2rem' }}>Latest Arrivals</h2>

                <div className="grid grid-cols-4">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={addToCart}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
