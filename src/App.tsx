import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OccasionsPage from './pages/OccasionsPage';
import AboutPage from './pages/AboutPage';
import WishlistPage from './pages/WishlistPage';

const ScrollToTop = () => { const { pathname } = useLocation(); useEffect(() => { window.scrollTo(0,0); }, [pathname]); return null; };

const App: React.FC = () => (
  <BrowserRouter>
    <ScrollToTop />
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/occasions" element={<OccasionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-cream-50 pt-20">
              <div className="text-center px-4">
                <p className="text-7xl mb-4">🎁</p>
                <h1 className="font-display text-4xl font-bold text-charcoal-dark mb-3">Page Not Found</h1>
                <p className="font-body text-charcoal-light mb-8">This page doesn't exist, but great gifts do!</p>
                <a href="/" className="btn-primary text-white px-8 py-4 rounded-full font-body font-semibold inline-block">Go Home</a>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
    <Toaster position="top-right" gutter={8} containerStyle={{ top: 90 }} toastOptions={{ duration:3000, style:{ fontFamily:'DM Sans, sans-serif', fontSize:'14px' } }} />
  </BrowserRouter>
);
export default App;
