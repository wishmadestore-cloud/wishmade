import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="product-card">
            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="product-image-container">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                        loading="lazy"
                    />
                </div>
            </Link>

            <div className="product-info">
                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <div className="product-category">{product.category}</div>
                    <h3 className="product-title" title={product.name}>{product.name}</h3>
                </Link>

                <div className="product-footer">
                    <span className="product-price">₹{product.price.toLocaleString()}</span>
                    <button
                        className="add-btn"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent link click if nested (though it's not here)
                            onAddToCart(product);
                        }}
                        aria-label="Add to cart"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
