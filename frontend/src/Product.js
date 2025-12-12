import React from "react";
import "./App.css"; // ensure CSS is applied

function Product({ product, addToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <div>
        <span className={`category-badge ${product.category === "Men" ? "category-men" : "category-women"}`}>
          {product.category}
        </span>
      </div>

      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p style={{ fontWeight: "bold", margin: "8px 0" }}>₹{product.price}</p>

      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default Product;
