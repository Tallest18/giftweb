import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, Truck, Shield, Star, Sparkles } from 'lucide-react';
import ProductCard from '../components/shop/ProductCard';
import { products, categories, testimonials, occasions } from '../data/products';

const HomePage: React.FC = () => {
  const featured = products.filter(p => p.isFeatured || p.isBestseller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="hero-gradient relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute top-24 right-10 w-72 h-72 rounded-full bg-[#C4687A]/5 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#D4A843]/5 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8 }}>
              <div className="inline-flex items-center gap-2 bg-cream-100 border border-cream-200 rounded-full px-4 py-2 mb-6">
                <Sparkles size={14} className="text-[#D4A843]" />
                <span className="text-xs font-body font-medium text-charcoal-mid tracking-wide uppercase">Nigeria's #1 Gifting Platform</span>
              </div>
              <h1 className="font-display text-5xl lg:text-7xl font-bold text-charcoal-dark leading-[1.05] mb-6">
                Send Love,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4687A] to-[#D4A843]">Send Joy</span>
              </h1>
              <p className="font-body text-lg text-charcoal-light leading-relaxed mb-8 max-w-lg">
                Curated gifts for every moment — from luxurious flowers to bespoke hampers. Same-day delivery across Lagos.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="btn-primary inline-flex items-center gap-2 text-white font-body font-semibold px-8 py-4 rounded-full text-base">Shop Gifts <ArrowRight size={18} /></Link>
                <Link to="/occasions" className="inline-flex items-center gap-2 border-2 border-charcoal-mid text-charcoal-mid font-body font-semibold px-8 py-4 rounded-full text-base hover:border-[#C4687A] hover:text-[#C4687A] transition-colors">Browse Occasions</Link>
              </div>
              <div className="flex items-center gap-6 mt-10">
                <div className="flex items-center gap-2">
                  <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-[#D4A843] text-[#D4A843]" />)}</div>
                  <span className="text-sm font-body text-charcoal-light">4.9/5 (2k+ reviews)</span>
                </div>
                <div className="h-4 w-px bg-cream-300" />
                <span className="text-sm font-body text-charcoal-light">10,000+ happy customers</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, delay:0.2 }} className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-56 rounded-3xl overflow-hidden shadow-card-hover mt-8">
                    <img src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&q=80" alt="Roses" className="w-full h-full object-cover" />
                  </div>
                  <div className="h-40 rounded-3xl overflow-hidden shadow-card">
                    <img src="https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=400&q=80" alt="Hamper" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-40 rounded-3xl overflow-hidden shadow-card">
                    <img src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80" alt="Cake" className="w-full h-full object-cover" />
                  </div>
                  <div className="h-56 rounded-3xl overflow-hidden shadow-card-hover">
                    <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80" alt="Jewelry" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <motion.div animate={{ y:[0,-8,0] }} transition={{ repeat:Infinity, duration:4, ease:'easeInOut' }}
                className="absolute -left-8 bottom-16 bg-white rounded-2xl shadow-card-hover p-4 flex items-center gap-3 min-w-max">
                <div className="w-12 h-12 rounded-xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-body font-semibold text-charcoal-dark">Just ordered! 🎁</p>
                  <p className="text-xs text-charcoal-light font-body">Eternal Rose Bouquet</p>
                </div>
              </motion.div>
              <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:5, ease:'easeInOut', delay:1 }}
                className="absolute -right-4 top-12 bg-[#C4687A] text-white rounded-2xl shadow-luxury p-4 text-center">
                <p className="text-2xl font-display font-bold">4.9★</p>
                <p className="text-xs font-body mt-0.5">Customer Rating</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES BAR */}
      <section className="bg-charcoal-dark py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{icon:Truck,title:'Same-Day Delivery',desc:'Order before 2PM'},{icon:Gift,title:'Gift Wrapping',desc:'Complimentary on request'},{icon:Shield,title:'Secure Payment',desc:'Powered by Paystack'},{icon:Star,title:'Quality Assured',desc:'Handpicked products'}].map(({icon:Icon,title,desc}) => (
              <div key={title} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0"><Icon size={18} className="text-[#D4A843]" /></div>
                <div><p className="font-display text-white font-semibold text-sm">{title}</p><p className="text-xs text-cream-300 font-body">{desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl font-bold text-charcoal-dark mb-2">Shop by Occasion</h2>
            <p className="text-charcoal-light font-body">Find the perfect gift for every celebration</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {occasions.map((occ, i) => (
              <motion.div key={occ.label} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.05 }}>
                <Link to={`/shop?occasion=${occ.label.toLowerCase().replace(' ','-')}`}
                  className={`flex flex-col items-center gap-2 p-5 rounded-2xl bg-gradient-to-br ${occ.color} border border-cream-200 hover:shadow-card transition-all duration-200 hover:-translate-y-1 group`}>
                  <span className="text-3xl">{occ.emoji}</span>
                  <span className="text-sm font-body font-medium text-charcoal-dark text-center leading-tight group-hover:text-[#C4687A] transition-colors">{occ.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#C4687A] font-body font-medium mb-1">Handpicked for you</p>
              <h2 className="font-display text-4xl font-bold text-charcoal-dark">Bestsellers</h2>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-1.5 text-sm font-body font-medium text-[#C4687A] hover:gap-3 transition-all">View all <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* CATEGORY BROWSE */}
      <section className="py-14 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-display text-4xl font-bold text-charcoal-dark mb-2">Browse Categories</h2>
            <p className="text-charcoal-light font-body">Curated collections for every taste</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <motion.div key={cat.id} whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}>
                <Link to={`/shop?category=${cat.id}`} className="inline-flex items-center gap-2 bg-white border border-cream-200 hover:border-[#C4687A] hover:text-[#C4687A] text-charcoal-mid rounded-full px-5 py-2.5 font-body font-medium text-sm transition-all duration-200">
                  <span>{cat.emoji}</span> {cat.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORPORATE BANNER */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-charcoal-dark to-[#3A1A2A] rounded-3xl overflow-hidden p-10 md:p-14 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-[#D4A843] text-xs uppercase tracking-widest font-body font-medium mb-2">Corporate Gifting</p>
                <h3 className="font-display text-4xl font-bold mb-4 leading-tight">Impress Your Clients & Team</h3>
                <p className="font-body text-cream-300 leading-relaxed mb-6">Bulk ordering made easy with custom branding, personalised notes, and nationwide delivery.</p>
                <Link to="/about" className="btn-gold inline-flex items-center gap-2 text-white font-body font-semibold px-7 py-3.5 rounded-full text-sm">Get a Quote <ArrowRight size={16} /></Link>
              </div>
              <div className="hidden md:grid grid-cols-2 gap-3">
                {['https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=300&q=80','https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=300&q=80'].map((src,i) => (
                  <div key={i} className={`rounded-2xl overflow-hidden h-40 ${i===1?'mt-6':''}`}><img src={src} alt="" className="w-full h-full object-cover" /></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#D4A843] font-body font-medium mb-1">Fresh additions</p>
              <h2 className="font-display text-4xl font-bold text-charcoal-dark">New Arrivals</h2>
            </div>
            <Link to="/shop?filter=new" className="hidden sm:flex items-center gap-1.5 text-sm font-body font-medium text-[#C4687A] hover:gap-3 transition-all">View all <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((p,i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C4687A] font-body font-medium mb-1">Happy Customers</p>
            <h2 className="font-display text-4xl font-bold text-charcoal-dark">What They Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t,i) => (
              <motion.div key={t.id} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                className="bg-white rounded-3xl p-7 shadow-card deco-border">
                <div className="flex mb-4">{[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-[#D4A843] text-[#D4A843]" />)}</div>
                <p className="font-body text-charcoal-mid leading-relaxed mb-6 text-sm">"{t.comment}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                  <div><p className="font-display font-semibold text-charcoal-dark text-sm">{t.name}</p><p className="text-xs text-charcoal-light font-body">{t.role}</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-[#C4687A] to-[#8B3A4A] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage:'radial-gradient(circle at 20% 80%, white 1px, transparent 1px),radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize:'40px 40px' }} />
        <div className="relative max-w-2xl mx-auto px-4">
          <h2 className="font-display text-5xl font-bold mb-4">Ready to make someone's day?</h2>
          <p className="font-body text-lg text-white/80 mb-8">Thousands of premium gifts, delivered with love across Nigeria</p>
          <Link to="/shop" className="bg-white text-[#C4687A] font-body font-bold px-10 py-4 rounded-full text-lg inline-flex items-center gap-2 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200">
            Start Gifting <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
