import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import OrdersPage from "./pages/OrdersPage";
import OffersPage from "./pages/OffersPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";



import IntroAnimation from "./components/IntroAnimation";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [showIntro, setShowIntro] = useState(true);

  // Persist wishlist
  React.useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    // Optional: Add simple toast/notification here if we had one
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    const isWishlisted = wishlist.some(item => item.id === product.id);
    if (isWishlisted) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <>
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      <AuthProvider>
        <Router>
          <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar cart={cart} wishlist={wishlist} removeFromCart={removeFromCart} />
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<HomePage addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
                <Route path="/products" element={<HomePage addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
                <Route path="/products/:id" element={<ProductDetailsPage addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
                <Route path="/offers" element={<OffersPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
                <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} />} />
                <Route path="/checkout" element={<CheckoutPage cart={cart} clearCart={clearCart} removeFromCart={removeFromCart} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
