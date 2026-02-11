import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="product-card">
            <div className="product-image-container">
                <Link to={`/products/${product.id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                        loading="lazy"
                    />
                </Link>
                <button className="wishlist-btn" title="Add to wishlist">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>
            </div>

            <div className="product-info">
                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className="product-title">{product.name} // {product.subCategory}</h3>
                    <div className="product-footer">
                        <span className="product-price">RS.{product.price.toLocaleString()}</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
