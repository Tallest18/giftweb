import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
const WishlistPage: React.FC = () => (
  <div className="min-h-screen bg-cream-50 pt-32 pb-16 flex items-center justify-center">
    <div className="text-center px-4">
      <div className="w-24 h-24 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-6"><Heart size={36} className="text-[#C4687A]" /></div>
      <h1 className="font-display text-3xl font-bold text-charcoal-dark mb-3">Your Wishlist</h1>
      <p className="font-body text-charcoal-light mb-8 max-w-sm mx-auto">Save your favourite gifts by clicking the ❤️ icon on any product.</p>
      <Link to="/shop" className="btn-primary text-white px-8 py-4 rounded-full font-body font-semibold inline-flex items-center gap-2">Browse Gifts <ArrowRight size={18} /></Link>
    </div>
  </div>
);
export default WishlistPage;
