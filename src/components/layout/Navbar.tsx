import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const itemCount = useCartStore(s => s.getItemCount());

  useEffect(() => { const fn = () => setScrolled(window.scrollY > 20); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn); }, []);
  useEffect(() => { setMenuOpen(false); }, [location]);

  const links = [{ to:'/', label:'Home' }, { to:'/shop', label:'Shop' }, { to:'/occasions', label:'Occasions' }, { to:'/about', label:'About' }];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="bg-charcoal-dark text-cream-100 text-center text-xs py-2 font-body tracking-widest">
        FREE DELIVERY ON ORDERS OVER ₦20,000 &nbsp;·&nbsp; SAME-DAY DELIVERY AVAILABLE
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C4687A] to-[#8B3A4A] flex items-center justify-center">
              <span className="text-white text-lg font-display font-bold">G</span>
            </div>
            <span className="font-display text-2xl font-bold text-charcoal-dark">Giftly</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.to} to={l.to} className={`font-body text-sm font-medium transition-colors relative group ${location.pathname === l.to ? 'text-[#C4687A]' : 'text-charcoal-mid hover:text-[#C4687A]'}`}>
                {l.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#C4687A] transition-all duration-200 ${location.pathname === l.to ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2.5 text-charcoal-mid hover:text-[#C4687A] transition-colors rounded-full hover:bg-cream-100"><Search size={20} /></button>
            <Link to="/wishlist" className="p-2.5 text-charcoal-mid hover:text-[#C4687A] transition-colors rounded-full hover:bg-cream-100"><Heart size={20} /></Link>
            <Link to="/cart" className="relative p-2.5 text-charcoal-mid hover:text-[#C4687A] transition-colors rounded-full hover:bg-cream-100">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <motion.span initial={{ scale:0 }} animate={{ scale:1 }} className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#C4687A] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </motion.span>
              )}
            </Link>
            <button className="md:hidden p-2.5 text-charcoal-mid" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} className="bg-white border-t border-cream-200 overflow-hidden">
            <div className="max-w-2xl mx-auto px-4 py-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
                <input autoFocus type="text" placeholder="Search for gifts, occasions, categories..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && searchQuery.trim()) window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`; }}
                  className="w-full pl-10 pr-4 py-2.5 bg-cream-50 border border-cream-200 rounded-full text-sm font-body focus:outline-none focus:border-[#C4687A]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} className="md:hidden bg-white border-t border-cream-200 shadow-lg">
            <div className="px-4 py-4 space-y-1">
              {links.map(l => (
                <Link key={l.to} to={l.to} className={`block px-4 py-3 rounded-lg font-body font-medium text-sm transition-colors ${location.pathname === l.to ? 'bg-cream-100 text-[#C4687A]' : 'text-charcoal-mid hover:bg-cream-50 hover:text-[#C4687A]'}`}>{l.label}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;
