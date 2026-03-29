import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Order } from '../types';
import { formatNaira } from '../hooks/usePaystack';

const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const order = location.state?.order as Order | undefined;
  const [showConfetti, setShowConfetti] = useState(true);
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 5000);
    const fn = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', fn);
    return () => { clearTimeout(t); window.removeEventListener('resize', fn); };
  }, []);

  const trackSteps = [
    { icon: CheckCircle, label: 'Order Confirmed', desc: "We've received your order", done: true },
    { icon: Package, label: 'Being Prepared', desc: 'Your gift is being packed', done: false },
    { icon: Truck, label: 'Out for Delivery', desc: 'On its way to you', done: false },
    { icon: Home, label: 'Delivered', desc: 'Gift delivered!', done: false },
  ];

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-16">
      {showConfetti && <Confetti width={size.w} height={size.h} colors={['#C4687A','#D4A843','#FAF4EC','#8B3A4A','#9A7320']} numberOfPieces={200} recycle={false} />}
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.5 }}
          className="bg-white rounded-3xl p-8 border border-cream-200 shadow-card text-center mb-6">
          <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:0.2, type:'spring', stiffness:200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={36} className="text-green-500" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-charcoal-dark mb-2">Order Confirmed! 🎉</h1>
          <p className="font-body text-charcoal-light mb-1">Thank you for your order</p>
          {order && <p className="font-body text-sm text-charcoal-light">Order ID: <span className="font-semibold text-charcoal-dark">{order.id}</span></p>}
          {order?.paymentRef && <p className="font-body text-xs text-charcoal-light mt-0.5 font-mono">{order.paymentRef}</p>}
        </motion.div>

        {order && (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
            className="bg-white rounded-3xl p-6 border border-cream-200 shadow-card mb-6">
            <h2 className="font-display text-xl font-bold text-charcoal-dark mb-4">Order Details</h2>
            <div className="space-y-3 mb-4">
              {order.items.map(item => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-medium text-charcoal-dark text-sm truncate">{item.product.name}</p>
                    <p className="text-xs text-charcoal-light font-body">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-display font-bold text-charcoal-dark text-sm">{formatNaira(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-cream-200 pt-3 space-y-1 text-sm font-body text-charcoal-light">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatNaira(order.subtotal)}</span></div>
              {order.giftWrapFee > 0 && <div className="flex justify-between"><span>Gift wrap</span><span>{formatNaira(order.giftWrapFee)}</span></div>}
              <div className="flex justify-between"><span>Delivery</span><span className={order.deliveryFee===0?'text-green-600':''}>{order.deliveryFee===0?'FREE':formatNaira(order.deliveryFee)}</span></div>
              <div className="flex justify-between font-display font-bold text-charcoal-dark text-lg pt-1"><span>Total Paid</span><span>{formatNaira(order.total)}</span></div>
            </div>
            {order.deliveryAddress && (
              <div className="mt-4 bg-cream-50 rounded-2xl p-4 border border-cream-200">
                <p className="text-xs uppercase tracking-wider font-body font-semibold text-charcoal-light mb-1">Delivering to</p>
                <p className="text-sm font-body text-charcoal-dark">{order.deliveryAddress.line1}, {order.deliveryAddress.city}, {order.deliveryAddress.state}</p>
                {order.giftMessage && <p className="text-sm font-body text-charcoal-mid italic mt-2">💌 "{order.giftMessage}"</p>}
              </div>
            )}
          </motion.div>
        )}

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
          className="bg-white rounded-3xl p-6 border border-cream-200 shadow-card mb-6">
          <h2 className="font-display text-xl font-bold text-charcoal-dark mb-5">Order Tracking</h2>
          <div className="relative">
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-cream-200" />
            <div className="space-y-5">
              {trackSteps.map((s,i) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex items-start gap-4 relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 ${i===0?'bg-green-500 border-green-500 text-white':'bg-white border-cream-200 text-charcoal-light'}`}>
                      <Icon size={16} />
                    </div>
                    <div className="pt-1.5">
                      <p className={`font-body font-semibold text-sm ${i===0?'text-green-600':'text-charcoal-light'}`}>{s.label}</p>
                      <p className="text-xs text-charcoal-light font-body">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
          className="bg-[#1C1C2E] rounded-3xl p-6 text-white mb-8">
          <h3 className="font-display font-semibold text-lg mb-3">What happens next?</h3>
          <ul className="space-y-2 font-body text-sm text-cream-300">
            <li className="flex items-start gap-2"><span className="text-[#D4A843]">✓</span> A confirmation email has been sent to you</li>
            <li className="flex items-start gap-2"><span className="text-[#D4A843]">✓</span> Our team will prepare your gift within 2–3 hours</li>
            <li className="flex items-start gap-2"><span className="text-[#D4A843]">✓</span> Same-day delivery available for Lagos orders before 2PM</li>
            <li className="flex items-start gap-2"><span className="text-[#D4A843]">✓</span> You'll receive SMS/email updates when dispatched</li>
          </ul>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/shop" className="btn-primary flex-1 text-white py-4 rounded-full font-body font-semibold flex items-center justify-center gap-2">Continue Shopping <ArrowRight size={18} /></Link>
          <Link to="/" className="flex-1 border-2 border-charcoal-mid text-charcoal-mid py-4 rounded-full font-body font-semibold flex items-center justify-center hover:border-[#C4687A] hover:text-[#C4687A] transition-colors">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};
export default OrderSuccessPage;
