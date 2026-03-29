import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users, Package, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  const stats = [{value:'10,000+',label:'Happy Customers',icon:Users},{value:'500+',label:'Curated Products',icon:Package},{value:'4.9★',label:'Average Rating',icon:Star},{value:'3 Years',label:'Of Gifting Joy',icon:Heart}];
  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-16">
      <section className="bg-gradient-to-br from-charcoal-dark to-[#3A1A2A] text-white py-20 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage:'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize:'30px 30px' }} />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <p className="text-[#D4A843] text-xs uppercase tracking-widest font-body font-medium mb-3">Our Story</p>
          <h1 className="font-display text-5xl font-bold mb-5 leading-tight">Born from a Passion<br />for Meaningful Gifting</h1>
          <p className="font-body text-lg text-cream-300 leading-relaxed max-w-2xl mx-auto">Giftly was founded in Lagos with a simple mission: to make gifting effortless, personal, and truly memorable.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map(({value,label,icon:Icon},i) => (
            <motion.div key={label} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
              className="bg-white rounded-3xl p-6 text-center border border-cream-200 shadow-card">
              <div className="w-12 h-12 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-3"><Icon size={20} className="text-[#C4687A]" /></div>
              <p className="font-display text-3xl font-bold text-charcoal-dark mb-1">{value}</p>
              <p className="font-body text-sm text-charcoal-light">{label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#C4687A] font-body font-medium mb-2">Our Mission</p>
            <h2 className="font-display text-4xl font-bold text-charcoal-dark mb-5">Making Every Moment Unforgettable</h2>
            <p className="font-body text-charcoal-mid leading-relaxed mb-4">We handpick every product in our collection with care and intentionality. From premium flowers sourced fresh daily, to artisanal hampers assembled with the finest goods — quality is never compromised.</p>
            <p className="font-body text-charcoal-mid leading-relaxed mb-6">Our team of gifting experts is always on hand to help you find the perfect present and ensure delivery goes off without a hitch.</p>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full font-body font-semibold">Explore Our Collection <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&q=80','https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=400&q=80','https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80','https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80'].map((src,i) => (
              <div key={i} className={`rounded-2xl overflow-hidden h-40 ${i%2===1?'mt-6':''}`}><img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
            ))}
          </div>
        </div>

        <div className="bg-cream-100 rounded-3xl p-10 mb-20">
          <h2 className="font-display text-3xl font-bold text-charcoal-dark text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{emoji:'💝',title:'Curated with Love',desc:'Every product is personally selected for quality and thoughtfulness.'},
              {emoji:'🚀',title:'Reliable Delivery',desc:'Same-day delivery in Lagos. Your gift arrives when you need it.'},
              {emoji:'🔒',title:'Secure & Trusted',desc:"Your payments are protected by Paystack's world-class security."}].map(({emoji,title,desc}) => (
              <div key={title} className="text-center">
                <div className="text-4xl mb-3">{emoji}</div>
                <h3 className="font-display text-xl font-bold text-charcoal-dark mb-2">{title}</h3>
                <p className="font-body text-charcoal-light text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#C4687A] to-[#8B3A4A] rounded-3xl p-10 text-white text-center">
          <h3 className="font-display text-3xl font-bold mb-3">Ready to create a moment?</h3>
          <p className="font-body text-white/80 mb-6">Join thousands of happy customers who trust Giftly for all their gifting needs.</p>
          <Link to="/shop" className="bg-white text-[#C4687A] font-body font-bold px-8 py-3.5 rounded-full inline-flex items-center gap-2 hover:shadow-2xl hover:-translate-y-0.5 transition-all">Start Gifting <ArrowRight size={16} /></Link>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
