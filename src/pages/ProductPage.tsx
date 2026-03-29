import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Truck, Shield, RefreshCw, Gift, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { formatNaira } from '../hooks/usePaystack';
import ProductCard from '../components/shop/ProductCard';
import { ProductVariant } from '../types';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const addItem = useCartStore(s => s.addItem);
  const [imgIdx, setImgIdx] = useState(0);
  const [variant, setVariant] = useState<ProductVariant | undefined>(product?.variants?.[0]);
  const [qty, setQty] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const [wished, setWished] = useState(false);
  const [tab, setTab] = useState<'description'|'reviews'>('description');

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center"><p className="text-6xl mb-4">🎁</p>
        <h2 className="font-display text-2xl font-bold text-charcoal-dark mb-4">Product not found</h2>
        <Link to="/shop" className="btn-primary text-white px-6 py-3 rounded-full font-body font-medium">Back to Shop</Link>
      </div>
    </div>
  );

  const images = product.images || [product.image];
  const price = product.price + (variant?.priceModifier || 0);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product, variant);
    toast.success('Added to cart! 🎁', { style:{ background:'#1C1C2E', color:'#FAF4EC', fontFamily:'DM Sans', borderRadius:'12px' } });
  };

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm font-body mb-8 flex-wrap">
          <Link to="/" className="text-charcoal-light hover:text-[#C4687A]">Home</Link><span className="text-charcoal-light">/</span>
          <Link to="/shop" className="text-charcoal-light hover:text-[#C4687A]">Shop</Link><span className="text-charcoal-light">/</span>
          <span className="text-charcoal-dark font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="relative rounded-3xl overflow-hidden bg-cream-100 aspect-square mb-4 shadow-card">
              <img src={images[imgIdx]} alt={product.name} className="w-full h-full object-cover" />
              {product.badge && <div className="ribbon">{product.badge}</div>}
              {images.length > 1 && <>
                <button onClick={() => setImgIdx(Math.max(0, imgIdx-1))} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow"><ChevronLeft size={18} /></button>
                <button onClick={() => setImgIdx(Math.min(images.length-1, imgIdx+1))} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow"><ChevronRight size={18} /></button>
              </>}
            </div>
            {images.length > 1 && <div className="flex gap-3">{images.map((img,i) => (
              <button key={i} onClick={() => setImgIdx(i)} className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${imgIdx===i?'border-[#C4687A]':'border-transparent'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}</div>}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <p className="text-xs uppercase tracking-widest font-body text-[#C4687A] font-medium capitalize">{product.category}</p>
              <button onClick={() => setWished(!wished)} className="w-9 h-9 rounded-full border border-cream-200 flex items-center justify-center hover:border-[#C4687A] transition-colors">
                <Heart size={16} className={wished ? 'fill-[#C4687A] text-[#C4687A]' : 'text-charcoal-light'} />
              </button>
            </div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-charcoal-dark mb-3">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} size={15} className={s<=Math.floor(product.rating)?'fill-[#D4A843] text-[#D4A843]':'text-cream-300 fill-cream-300'} />)}</div>
              <span className="text-sm font-body font-medium text-charcoal-dark">{product.rating}</span>
              <span className="text-sm text-charcoal-light font-body">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl font-bold text-charcoal-dark">{formatNaira(price)}</span>
              {product.originalPrice && <span className="text-xl text-charcoal-light line-through font-body">{formatNaira(product.originalPrice)}</span>}
              {discount && <span className="text-sm bg-[#D4A843]/15 text-[#9A7320] font-bold px-2.5 py-1 rounded-full font-body">-{discount}% OFF</span>}
            </div>

            {product.variants && product.variants.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-body font-semibold text-charcoal-dark mb-2">{product.variants[0].name}: <span className="text-[#C4687A]">{variant?.value}</span></p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(v => (
                    <button key={v.id} onClick={() => setVariant(v)}
                      className={`px-4 py-2 rounded-full text-sm font-body border transition-all ${variant?.id===v.id?'border-[#C4687A] bg-[#C4687A]/5 text-[#C4687A] font-medium':'border-cream-200 text-charcoal-mid hover:border-[#C4687A]'}`}>
                      {v.value}{v.priceModifier && v.priceModifier>0 ? ` (+${formatNaira(v.priceModifier)})` : ''}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-5">
              <p className="text-sm font-body font-semibold text-charcoal-dark">Quantity:</p>
              <div className="flex items-center border border-cream-200 rounded-full overflow-hidden bg-white">
                <button onClick={() => setQty(Math.max(1,qty-1))} className="px-4 py-2.5 hover:bg-cream-100 transition-colors text-charcoal-mid font-medium">−</button>
                <span className="px-4 font-body font-semibold text-charcoal-dark">{qty}</span>
                <button onClick={() => setQty(qty+1)} className="px-4 py-2.5 hover:bg-cream-100 transition-colors text-charcoal-mid font-medium">+</button>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-cream-50 rounded-2xl p-4 mb-6 border border-cream-200">
              <button onClick={() => setGiftWrap(!giftWrap)}
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${giftWrap?'border-[#C4687A] bg-[#C4687A]':'border-cream-300'}`}>
                {giftWrap && <Check size={14} className="text-white" strokeWidth={3} />}
              </button>
              <Gift size={18} className="text-[#C4687A] flex-shrink-0" />
              <div>
                <p className="text-sm font-body font-medium text-charcoal-dark">Add gift wrapping (+₦500)</p>
                <p className="text-xs text-charcoal-light font-body">Beautifully wrapped with ribbon & card slot</p>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <motion.button whileTap={{ scale:0.97 }} onClick={handleAdd}
                className="flex-1 btn-primary text-white font-body font-semibold py-4 rounded-full flex items-center justify-center gap-2">
                <ShoppingBag size={18} /> Add to Cart
              </motion.button>
              <Link to="/checkout" onClick={handleAdd}
                className="flex-1 btn-gold text-white font-body font-semibold py-4 rounded-full flex items-center justify-center gap-2">
                Buy Now
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[{icon:Truck,text:'Same-day delivery'},{icon:Shield,text:'Secure checkout'},{icon:RefreshCw,text:'7-day returns'}].map(({icon:Icon,text}) => (
                <div key={text} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon size={18} className="text-[#C4687A]" />
                  <span className="text-xs font-body text-charcoal-light">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex gap-1 border-b border-cream-200 mb-6">
            {(['description','reviews'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-6 py-3 font-body font-medium text-sm capitalize transition-colors border-b-2 -mb-px ${tab===t?'border-[#C4687A] text-[#C4687A]':'border-transparent text-charcoal-light hover:text-charcoal-dark'}`}>
                {t} {t==='reviews'&&`(${product.reviews})`}
              </button>
            ))}
          </div>
          {tab==='description' ? (
            <div className="max-w-3xl">
              <p className="font-body text-charcoal-mid leading-relaxed">{product.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[['Category',product.category],['In Stock',product.inStock?'Yes':'No'],['Tags',product.tags.join(', ')],['Delivery','Same-day available']].map(([l,v]) => (
                  <div key={l} className="bg-cream-50 rounded-xl p-3 border border-cream-200">
                    <p className="text-xs font-body text-charcoal-light uppercase tracking-wider mb-0.5">{l}</p>
                    <p className="text-sm font-body font-medium text-charcoal-dark capitalize">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl space-y-4">
              {[{name:'Adaeze N.',rating:5,comment:'Absolutely stunning! Arrived perfectly packaged and on time.',date:'2 days ago'},
                {name:'Emeka F.',rating:5,comment:'My wife loved it! Will definitely order again.',date:'1 week ago'},
                {name:'Blessing O.',rating:4,comment:'Beautiful quality, slight delay in delivery but overall great.',date:'2 weeks ago'}].map((r,i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-cream-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-display font-semibold text-charcoal-dark">{r.name}</p>
                    <span className="text-xs text-charcoal-light font-body">{r.date}</span>
                  </div>
                  <div className="flex mb-2">{[1,2,3,4,5].map(s => <Star key={s} size={13} className={s<=r.rating?'fill-[#D4A843] text-[#D4A843]':'text-cream-300 fill-cream-300'} />)}</div>
                  <p className="text-sm font-body text-charcoal-mid">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-3xl font-bold text-charcoal-dark mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p,i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductPage;
