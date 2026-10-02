import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import CategoryPage from "./Pages/CategoryPage";
import SubcategoryPage from "./Pages/SubcategoryPage";
import ProductDetails from "./Pages/ProductDetails";
import CartPage from "./Pages/CartPage";
import { CartProvider } from "./context/CartContext";
import FloatingFilter from "./components/FloatingFilter";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { ToastProvider } from "./context/ToastContext";
import { WishlistProvider } from "./context/WishlistContext";
import WishlistPage from "./Pages/WishListPage";
import OrderHistory from "./Pages/OrderHistory";

function App() {
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: null, // or image URL
  });

  const handleLogout = () => {
    setUser(null);
  };
  return (
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
        <Navbar user={user} onLogout={handleLogout} />
      <FloatingFilter />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/orders" element={<OrderHistory />} />
        {/* 2. Specific Product Route (Must stay ABOVE /:categorySlug) */}
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/product/:productId" element={<ProductDetails />} />

        {/* 3. Explicit Category/Subcategory Prefix Routes */}
        <Route path="/category/:categorySlug" element={<CategoryPage />} />
        <Route path="/subcategory/:subcategorySlug" element={<SubcategoryPage />} />
        <Route path="/category/:categorySlug/:subcategorySlug" element={<SubcategoryPage />} />

        {/* 4. Catch-all Dynamic Category/Subcategory Routes (Must stay at the BOTTOM) */}
        <Route path="/:categorySlug/:subcategorySlug" element={<SubcategoryPage />} />
        <Route path="/:categorySlug" element={<CategoryPage />} />
      </Routes>
      </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;