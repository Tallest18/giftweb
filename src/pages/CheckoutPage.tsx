import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useCartStore } from '../store/cartStore';
import { usePaystack, formatNaira } from '../hooks/usePaystack';
import { Order, Address } from '../types';

// ⚠️ Replace with your real Paystack public key
const PAYSTACK_KEY = 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const DELIVERY = 2500;

type Step = 'contact'|'delivery'|'review';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, getGiftWrapFee, clearCart, addOrder } = useCartStore();
  const { initializePayment } = usePaystack();
  const [step, setStep] = useState<Step>('contact');
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState({ name:'', email:'', phone:'' });
  const [addr, setAddr] = useState<Address>({ line1:'', line2:'', city:'', state:'', postalCode:'', country:'Nigeria' });
  const [recipient, setRecipient] = useState({ name:'', phone:'', message:'' });
  const [sameContact, setSameContact] = useState(true);

  const subtotal = getSubtotal();
  const giftWrapFee = getGiftWrapFee();
  const delivery = subtotal >= 20000 ? 0 : DELIVERY;
  const total = subtotal + giftWrapFee + delivery;

  const steps = [{id:'contact',label:'Contact'},{id:'delivery',label:'Delivery'},{id:'review',label:'Review & Pay'}] as {id:Step,label:string}[];
  const stepIdx = steps.findIndex(s => s.id === step);

  const ic = 'w-full px-4 py-3 bg-white border border-cream-200 rounded-xl text-sm font-body focus:outline-none focus:border-[#C4687A] focus:ring-1 focus:ring-[#C4687A] placeholder-charcoal-light transition-colors';
  const lc = 'block text-xs font-body font-semibold text-charcoal-dark uppercase tracking-wide mb-1.5';

  const validate = () => {
    if (step === 'contact') {
      if (!contact.name.trim()) { toast.error('Enter your name'); return false; }
      if (!contact.email.includes('@')) { toast.error('Enter a valid email'); return false; }
      if (!contact.phone.trim()) { toast.error('Enter your phone number'); return false; }
    }
    if (step === 'delivery') {
      if (!addr.line1.trim()) { toast.error('Enter your address'); return false; }
      if (!addr.city.trim()) { toast.error('Enter your city'); return false; }
      if (!addr.state.trim()) { toast.error('Select your state'); return false; }
    }
    return true;
  };

  const next = () => { if (validate()) setStep(steps[stepIdx+1].id); };

  const pay = () => {
    const isDemoKey = !PAYSTACK_KEY || PAYSTACK_KEY.includes('xxx');
    if (isDemoKey) {
      toast.loading('Processing demo payment...', { duration: 2500 });
      setTimeout(() => {
        const order: Order = { id:`GFT-${Date.now()}`, items, total, subtotal, deliveryFee:delivery, giftWrapFee, status:'paid', createdAt:new Date(), deliveryAddress:addr, paymentRef:`demo_${Date.now()}`, recipientName:sameContact?contact.name:recipient.name, recipientPhone:sameContact?contact.phone:recipient.phone, giftMessage:recipient.message };
        addOrder(order); clearCart(); navigate('/order-success', { state:{ order } });
      }, 2500);
      return;
    }
    setLoading(true);
    initializePayment({
      email: contact.email,
      amount: total * 100,
      currency: 'NGN',
      metadata: { custom_fields: [
        { display_name:'Customer Name', variable_name:'customer_name', value:contact.name },
        { display_name:'Phone', variable_name:'phone', value:contact.phone },
        { display_name:'Address', variable_name:'address', value:`${addr.line1}, ${addr.city}, ${addr.state}` },
      ]},
      onSuccess: (ref: any) => {
        const order: Order = { id:`GFT-${Date.now()}`, items, total, subtotal, deliveryFee:delivery, giftWrapFee, status:'paid', createdAt:new Date(), deliveryAddress:addr, paymentRef:ref.reference, recipientName:sameContact?contact.name:recipient.name, recipientPhone:sameContact?contact.phone:recipient.phone, giftMessage:recipient.message };
        addOrder(order); clearCart(); setLoading(false); navigate('/order-success', { state:{ order } });
      },
      onClose: () => { setLoading(false); toast('Payment cancelled', { icon:'⚠️', style:{ background:'#1C1C2E', color:'#FAF4EC', fontFamily:'DM Sans', borderRadius:'12px' } }); },
    }, PAYSTACK_KEY);
  };

  const states = ['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT Abuja','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'];

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-charcoal-dark mb-8">Checkout</h1>

        {/* Stepper */}
        <div className="flex items-center mb-10">
          {steps.map((s,i) => (
            <React.Fragment key={s.id}>
              <button onClick={() => { if (i < stepIdx) setStep(s.id); }}
                className={`flex items-center gap-2 font-body text-sm font-medium transition-colors ${s.id===step?'text-[#C4687A]':i<stepIdx?'text-green-600 cursor-pointer':'text-charcoal-light cursor-not-allowed'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${s.id===step?'border-[#C4687A] bg-[#C4687A] text-white':i<stepIdx?'border-green-500 bg-green-500 text-white':'border-cream-300 text-charcoal-light'}`}>
                  {i<stepIdx?'✓':i+1}
                </div>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length-1 && <div className={`flex-1 h-0.5 mx-3 transition-colors ${i<stepIdx?'bg-green-400':'bg-cream-200'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 'contact' && (
                <motion.div key="c" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}
                  className="bg-white rounded-3xl p-7 border border-cream-200 shadow-card space-y-5">
                  <h2 className="font-display text-2xl font-bold text-charcoal-dark">Your Details</h2>
                  <div><label className={lc}>Full Name *</label><input className={ic} placeholder="Chioma Adeyemi" value={contact.name} onChange={e => setContact({...contact,name:e.target.value})} /></div>
                  <div><label className={lc}>Email Address *</label><input className={ic} type="email" placeholder="chioma@example.com" value={contact.email} onChange={e => setContact({...contact,email:e.target.value})} /></div>
                  <div><label className={lc}>Phone Number *</label><input className={ic} placeholder="+234 801 234 5678" value={contact.phone} onChange={e => setContact({...contact,phone:e.target.value})} /></div>
                </motion.div>
              )}
              {step === 'delivery' && (
                <motion.div key="d" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} className="space-y-5">
                  <div className="bg-white rounded-3xl p-7 border border-cream-200 shadow-card space-y-5">
                    <h2 className="font-display text-2xl font-bold text-charcoal-dark">Delivery Address</h2>
                    <div><label className={lc}>Street Address *</label><input className={ic} placeholder="12 Admiralty Way" value={addr.line1} onChange={e => setAddr({...addr,line1:e.target.value})} /></div>
                    <div><label className={lc}>Apartment / Suite (optional)</label><input className={ic} placeholder="Flat 4B" value={addr.line2} onChange={e => setAddr({...addr,line2:e.target.value})} /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className={lc}>City *</label><input className={ic} placeholder="Lagos" value={addr.city} onChange={e => setAddr({...addr,city:e.target.value})} /></div>
                      <div><label className={lc}>State *</label>
                        <select className={ic} value={addr.state} onChange={e => setAddr({...addr,state:e.target.value})}>
                          <option value="">Select state</option>
                          {states.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div><label className={lc}>Postal Code</label><input className={ic} placeholder="100001" value={addr.postalCode} onChange={e => setAddr({...addr,postalCode:e.target.value})} /></div>
                  </div>
                  <div className="bg-white rounded-3xl p-7 border border-cream-200 shadow-card space-y-4">
                    <h2 className="font-display text-2xl font-bold text-charcoal-dark">Recipient Details</h2>
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input type="checkbox" checked={sameContact} onChange={e => setSameContact(e.target.checked)} className="w-4 h-4 accent-[#C4687A]" />
                      <span className="text-sm font-body text-charcoal-mid">Delivering to myself</span>
                    </label>
                    {!sameContact && <>
                      <div><label className={lc}>Recipient Name</label><input className={ic} placeholder="Gift recipient's name" value={recipient.name} onChange={e => setRecipient({...recipient,name:e.target.value})} /></div>
                      <div><label className={lc}>Recipient Phone</label><input className={ic} placeholder="+234 802 000 0000" value={recipient.phone} onChange={e => setRecipient({...recipient,phone:e.target.value})} /></div>
                    </>}
                    <div><label className={lc}>Gift Message (optional)</label>
                      <textarea className={`${ic} resize-none`} rows={3} placeholder="Write a heartfelt message..." value={recipient.message} onChange={e => setRecipient({...recipient,message:e.target.value})} />
                    </div>
                  </div>
                </motion.div>
              )}
              {step === 'review' && (
                <motion.div key="r" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}
                  className="bg-white rounded-3xl p-7 border border-cream-200 shadow-card">
                  <h2 className="font-display text-2xl font-bold text-charcoal-dark mb-6">Review Your Order</h2>
                  <div className="space-y-3 mb-6">
                    {items.map(item => (
                      <div key={item.product.id} className="flex items-center gap-3 py-2">
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0"><p className="font-body font-medium text-charcoal-dark text-sm truncate">{item.product.name}</p><p className="text-xs text-charcoal-light font-body">x{item.quantity}{item.giftWrap?' · Gift wrap':''}</p></div>
                        <p className="font-display font-bold text-charcoal-dark text-sm">{formatNaira(item.product.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-cream-200 pt-4 mb-6 space-y-2 text-sm font-body text-charcoal-mid">
                    <div className="flex justify-between"><span>Contact</span><span>{contact.name} · {contact.email}</span></div>
                    <div className="flex justify-between"><span>Deliver to</span><span className="text-right max-w-xs">{addr.line1}, {addr.city}, {addr.state}</span></div>
                    {recipient.message && <div className="flex justify-between"><span>Gift message</span><span className="italic max-w-xs text-right">"{recipient.message}"</span></div>}
                  </div>
                  <div className="bg-[#1C1C2E] rounded-2xl p-5 text-white">
                    <div className="flex items-center gap-2 mb-3"><Lock size={14} className="text-[#D4A843]" /><span className="text-xs font-body text-cream-300">Secured by Paystack — 256-bit SSL Encryption</span></div>
                    <div className="flex gap-2 flex-wrap">{['Visa','Mastercard','Verve','Bank Transfer','USSD'].map(m => <span key={m} className="text-xs bg-white/10 text-white px-2.5 py-1 rounded-full font-body">{m}</span>)}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-6">
              {stepIdx > 0 ? <button onClick={() => setStep(steps[stepIdx-1].id)} className="text-sm font-body font-medium text-charcoal-mid hover:text-[#C4687A] transition-colors">← Back</button> : <div />}
              {step !== 'review' ? (
                <button onClick={next} className="btn-primary text-white px-8 py-3.5 rounded-full font-body font-semibold flex items-center gap-2">Continue <ChevronRight size={16} /></button>
              ) : (
                <button onClick={pay} disabled={loading} className="btn-gold text-white px-8 py-3.5 rounded-full font-body font-semibold flex items-center gap-2 disabled:opacity-60">
                  {loading ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Processing...</> : <><Lock size={16} />Pay {formatNaira(total)}</>}
                </button>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-card sticky top-28">
              <h3 className="font-display text-lg font-bold text-charcoal-dark mb-4">Order Summary</h3>
              <div className="space-y-2.5 mb-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex items-center gap-2.5">
                    <div className="relative">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#C4687A] text-white text-xs rounded-full flex items-center justify-center font-bold">{item.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0"><p className="text-xs font-body font-medium text-charcoal-dark truncate">{item.product.name}</p></div>
                    <p className="text-sm font-display font-bold text-charcoal-dark">{formatNaira(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-cream-200 pt-3 space-y-1.5 text-sm font-body text-charcoal-light">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatNaira(subtotal)}</span></div>
                {giftWrapFee > 0 && <div className="flex justify-between"><span>Gift wrap</span><span>{formatNaira(giftWrapFee)}</span></div>}
                <div className="flex justify-between"><span>Delivery</span><span className={delivery===0?'text-green-600':''}>{delivery===0?'FREE':formatNaira(delivery)}</span></div>
              </div>
              <div className="border-t border-cream-200 pt-3 mt-2">
                <div className="flex justify-between font-display font-bold text-charcoal-dark text-xl"><span>Total</span><span>{formatNaira(total)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
