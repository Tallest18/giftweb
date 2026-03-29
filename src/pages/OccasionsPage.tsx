import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/shop/ProductCard';

const occs = [
  { id:'birthday', label:'Birthday', emoji:'🎂', description:'Make their day unforgettable', bg:'bg-pink-50', tags:['birthday'] },
  { id:'anniversary', label:'Anniversary', emoji:'💕', description:'Celebrate your love', bg:'bg-red-50', tags:['anniversary','romantic'] },
  { id:'wedding', label:'Wedding', emoji:'💍', description:'Beautiful gifts for a new chapter', bg:'bg-purple-50', tags:['wedding'] },
  { id:'get-well', label:'Get Well Soon', emoji:'🌻', description:'Send love and comfort', bg:'bg-yellow-50', tags:['get-well'] },
  { id:'corporate', label:'Corporate', emoji:'💼', description:'Professional gifts for clients', bg:'bg-slate-50', tags:['corporate'] },
  { id:'new-baby', label:'New Baby', emoji:'👶', description:'Welcome the newest arrival', bg:'bg-blue-50', tags:[] },
];

const OccasionsPage: React.FC = () => (
  <div className="min-h-screen bg-cream-50 pt-28 pb-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <p className="text-xs uppercase tracking-widest text-[#C4687A] font-body font-medium mb-2">For every moment</p>
        <h1 className="font-display text-5xl font-bold text-charcoal-dark mb-4">Shop by Occasion</h1>
        <p className="font-body text-charcoal-light text-lg max-w-xl mx-auto">Whether it's a birthday, anniversary, or just because — we have the perfect gift.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {occs.map((occ,i) => (
          <motion.div key={occ.id} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}>
            <Link to={`/shop?occasion=${occ.id}`}
              className={`block ${occ.bg} rounded-3xl p-8 border border-cream-200 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group`}>
              <div className="text-5xl mb-4">{occ.emoji}</div>
              <h3 className="font-display text-2xl font-bold text-charcoal-dark mb-2 group-hover:text-[#C4687A] transition-colors">{occ.label}</h3>
              <p className="font-body text-charcoal-light text-sm mb-4">{occ.description}</p>
              <div className="flex items-center gap-1.5 text-sm font-body font-medium text-[#C4687A]">Shop gifts <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></div>
            </Link>
          </motion.div>
        ))}
      </div>

      {occs.slice(0,2).map(occ => {
        const related = products.filter(p => p.tags.some(t => occ.tags.includes(t))).slice(0,4);
        if (!related.length) return null;
        return (
          <div key={occ.id} className="mb-16">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#C4687A] font-body font-medium mb-1">{occ.emoji} {occ.label}</p>
                <h2 className="font-display text-3xl font-bold text-charcoal-dark">Top Picks for {occ.label}</h2>
              </div>
              <Link to={`/shop?occasion=${occ.id}`} className="hidden sm:flex items-center gap-1.5 text-sm font-body font-medium text-[#C4687A] hover:gap-3 transition-all">See all <ArrowRight size={14} /></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p,i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
export default OccasionsPage;
