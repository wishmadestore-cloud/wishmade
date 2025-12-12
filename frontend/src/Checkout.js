import React, { useState } from "react";

function Checkout({ cart, totalPrice, clearCart, goBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !address) {
      alert("Please fill all fields");
      return;
    }

    const order = {
      name,
      email,
      address,
      items: cart,
      total: totalPrice,
    };

    console.log("Order Placed:", order); // you can later send this to a backend
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return <h2>Thank you {name}, your order has been placed!</h2>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <button
      onClick={goBack}
      style={{
        padding: "8px 12px",
        backgroundColor: "#6c757d",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginBottom: "20px"
      }}
    >
      ← Back to Home
    </button> 
    
      <h2>Checkout</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Cart Summary</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ₹{item.price}
              </li>
            ))}
          </ul>
        )}
        <h4>Total: ₹{totalPrice}</h4>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <textarea
          placeholder="Your Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", resize: "vertical" }}
        />
        <button type="submit" style={{ padding: "10px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
