import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Gift, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { formatNaira } from '../hooks/usePaystack';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, toggleGiftWrap, clearCart, getSubtotal, getItemCount } = useCartStore();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const subtotal = getSubtotal();
  const giftWrapFee = items.filter(i => i.giftWrap).length * 500;
  const delivery = subtotal >= 20000 ? 0 : 2500;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + giftWrapFee + delivery - discount;

  const applyCoupon = () => {
    if (coupon.toLowerCase() === 'giftly10') { setCouponApplied(true); setCouponError(''); }
    else { setCouponError('Invalid coupon code'); setCouponApplied(false); }
  };

  if (items.length === 0) return (
    <div className="min-h-screen bg-cream-50 pt-32 pb-16 flex items-center justify-center">
      <div className="text-center px-4">
        <motion.div initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }}
          className="w-28 h-28 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={44} className="text-[#C4687A]" />
        </motion.div>
        <h2 className="font-display text-3xl font-bold text-charcoal-dark mb-3">Your cart is empty</h2>
        <p className="font-body text-charcoal-light mb-8 max-w-sm mx-auto">Explore our collection and find something special.</p>
        <Link to="/shop" className="btn-primary text-white px-8 py-4 rounded-full font-body font-semibold inline-flex items-center gap-2">Browse Gifts <ArrowRight size={18} /></Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl font-bold text-charcoal-dark">Your Cart</h1>
            <p className="font-body text-charcoal-light">{getItemCount()} {getItemCount()===1?'item':'items'}</p>
          </div>
          <button onClick={clearCart} className="text-sm font-body text-charcoal-light hover:text-red-500 transition-colors flex items-center gap-1.5"><Trash2 size={14} /> Clear cart</button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map(item => (
                <motion.div key={item.product.id} layout initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, x:-30 }}
                  className="bg-white rounded-2xl p-5 border border-cream-200 shadow-card">
                  <div className="flex gap-4">
                    <Link to={`/product/${item.product.id}`} className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-cream-100">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-charcoal-light font-body capitalize">{item.product.category}</p>
                          <Link to={`/product/${item.product.id}`} className="font-display font-semibold text-charcoal-dark hover:text-[#C4687A] transition-colors line-clamp-1">{item.product.name}</Link>
                          {item.selectedVariant && <p className="text-xs text-charcoal-light font-body mt-0.5">{item.selectedVariant.value}</p>}
                        </div>
                        <button onClick={() => removeItem(item.product.id)} className="text-charcoal-light hover:text-red-500 transition-colors flex-shrink-0 p-1"><Trash2 size={16} /></button>
                      </div>
                      <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                        <div className="flex items-center border border-cream-200 rounded-full overflow-hidden bg-cream-50">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity-1)} className="px-3 py-1.5 hover:bg-cream-200 transition-colors"><Minus size={13} /></button>
                          <span className="px-3 text-sm font-body font-semibold text-charcoal-dark">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity+1)} className="px-3 py-1.5 hover:bg-cream-200 transition-colors"><Plus size={13} /></button>
                        </div>
                        <p className="font-display font-bold text-charcoal-dark text-lg">{formatNaira((item.product.price+(item.selectedVariant?.priceModifier||0))*item.quantity)}</p>
                      </div>
                      <button onClick={() => toggleGiftWrap(item.product.id)}
                        className={`mt-3 flex items-center gap-1.5 text-xs font-body rounded-full px-3 py-1.5 border transition-all ${item.giftWrap?'border-[#C4687A] bg-[#C4687A]/5 text-[#C4687A] font-medium':'border-cream-200 text-charcoal-light hover:border-[#C4687A]'}`}>
                        <Gift size={12} /> {item.giftWrap ? 'Gift wrap added (+₦500)' : 'Add gift wrap (+₦500)'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-body font-medium text-[#C4687A] mt-2 hover:gap-3 transition-all">← Continue Shopping</Link>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-card sticky top-28">
              <h2 className="font-display text-xl font-bold text-charcoal-dark mb-5">Order Summary</h2>
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm font-body text-charcoal-mid"><span>Subtotal ({getItemCount()} items)</span><span>{formatNaira(subtotal)}</span></div>
                {giftWrapFee > 0 && <div className="flex justify-between text-sm font-body text-charcoal-mid"><span>Gift wrapping</span><span>{formatNaira(giftWrapFee)}</span></div>}
                <div className="flex justify-between text-sm font-body text-charcoal-mid">
                  <span>Delivery</span>
                  <span className={delivery===0?'text-green-600 font-medium':''}>{delivery===0?'FREE':formatNaira(delivery)}</span>
                </div>
                {discount > 0 && <div className="flex justify-between text-sm font-body text-green-600 font-medium"><span>Discount (GIFTLY10)</span><span>-{formatNaira(discount)}</span></div>}
              </div>

              <div className="mb-5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
                    <input type="text" placeholder="Coupon code" value={coupon} onChange={e => { setCoupon(e.target.value); setCouponError(''); }}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-cream-50 border border-cream-200 rounded-full font-body focus:outline-none focus:border-[#C4687A]" />
                  </div>
                  <button onClick={applyCoupon} className="bg-charcoal-dark text-white px-4 py-2.5 rounded-full text-sm font-body font-medium hover:bg-[#C4687A] transition-colors">Apply</button>
                </div>
                {couponError && <p className="text-xs text-red-500 mt-1.5 pl-3 font-body">{couponError}</p>}
                {couponApplied && <p className="text-xs text-green-600 mt-1.5 pl-3 font-body font-medium">✓ 10% discount applied!</p>}
                <p className="text-xs text-charcoal-light mt-1 pl-3 font-body">Try: <span className="font-medium text-charcoal-mid">GIFTLY10</span></p>
              </div>

              <div className="border-t border-cream-200 pt-4 mb-5">
                <div className="flex justify-between font-display font-bold text-charcoal-dark text-xl"><span>Total</span><span>{formatNaira(total)}</span></div>
                {delivery === 0 && <p className="text-xs text-green-600 font-body mt-1">🎉 You qualify for free delivery!</p>}
                {delivery > 0 && <p className="text-xs text-charcoal-light font-body mt-1">Add {formatNaira(20000-subtotal)} more for free delivery</p>}
              </div>

              <Link to="/checkout" className="btn-primary w-full text-white py-4 rounded-full font-body font-semibold flex items-center justify-center gap-2 text-base">
                Proceed to Checkout <ArrowRight size={18} />
              </Link>
              <p className="text-xs text-center text-charcoal-light font-body mt-4">🔒 Secured by Paystack · SSL Encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
