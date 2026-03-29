import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { formatNaira } from '../../hooks/usePaystack';
import toast from 'react-hot-toast';

interface Props { product: Product; index?: number; }

const ProductCard: React.FC<Props> = ({ product, index = 0 }) => {
  const [wished, setWished] = useState(false);
  const [adding, setAdding] = useState(false);
  const addItem = useCartStore(s => s.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setAdding(true);
    addItem(product);
    toast.success(`${product.name} added! 🎁`, { style:{ background:'#1C1C2E', color:'#FAF4EC', fontFamily:'DM Sans', borderRadius:'12px' } });
    setTimeout(() => setAdding(false), 600);
  };

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : null;

  return (
    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:index*0.05 }}
      className="gift-card group relative bg-white rounded-2xl overflow-hidden deco-border">
      <Link to={`/product/${product.id}`} className="block">
        <div className="img-zoom-container relative h-56 bg-cream-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
          {product.badge && <div className="ribbon">{product.badge}</div>}
          {discount && !product.badge && (
            <div className="absolute top-3 right-3 bg-[#D4A843] text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">-{discount}%</div>
          )}
          <button onClick={e => { e.preventDefault(); e.stopPropagation(); setWished(!wished); }} className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10">
            <Heart size={16} className={wished ? 'fill-[#C4687A] text-[#C4687A]' : 'text-charcoal-light'} />
          </button>
        </div>
        <div className="p-4">
          <p className="text-xs font-body text-charcoal-light uppercase tracking-widest mb-1 capitalize">{product.category}</p>
          <h3 className="font-display text-charcoal-dark font-semibold text-base leading-tight mb-2 line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} size={11} className={s <= Math.floor(product.rating) ? 'fill-[#D4A843] text-[#D4A843]' : 'text-cream-300 fill-cream-300'} />)}</div>
            <span className="text-xs text-charcoal-light font-body">({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg font-bold text-charcoal-dark">{formatNaira(product.price)}</span>
              {product.originalPrice && <span className="text-sm text-charcoal-light line-through font-body">{formatNaira(product.originalPrice)}</span>}
            </div>
            <motion.button whileTap={{ scale:0.9 }} onClick={handleAdd}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${adding ? 'bg-green-500 text-white scale-110' : 'bg-[#C4687A] text-white hover:bg-[#8B3A4A]'}`}>
              <ShoppingBag size={16} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
export default ProductCard;
