import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, ChevronDown, Grid2X2, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/shop/ProductCard';
import { products, categories } from '../data/products';
import { Category } from '../types';
import { formatPrice } from '../hooks/usePaystack';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

const SORTS = [
  { value:'featured', label:'Featured' },
  { value:'price-asc', label:'Price: Low to High' },
  { value:'price-desc', label:'Price: High to Low' },
  { value:'rating', label:'Top Rated' },
  { value:'newest', label:'Newest' },
];

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(100000);
  const [gridView, setGridView] = useState(true);
  const addItem = useCartStore(s => s.addItem);
  const currency = useCartStore(s => s.currency);

  const activeCategory = (searchParams.get('category') || 'all') as Category;
  const setCategory = (cat: Category) => {
    const p = new URLSearchParams(searchParams);
    cat === 'all' ? p.delete('category') : p.set('category', cat);
    setSearchParams(p);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory);
    const q = search.toLowerCase();
    if (q) list = list.filter(p => p.name.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)) || p.category.includes(q));
    list = list.filter(p => p.price <= maxPrice);
    switch(sort) {
      case 'price-asc': list.sort((a,b) => a.price - b.price); break;
      case 'price-desc': list.sort((a,b) => b.price - a.price); break;
      case 'rating': list.sort((a,b) => b.rating - a.rating); break;
      case 'newest': list.sort((a,b) => (b.isNew?1:0)-(a.isNew?1:0)); break;
      default: list.sort((a,b) => (b.isBestseller?1:0)-(a.isBestseller?1:0));
    }
    return list;
  }, [activeCategory, search, sort, maxPrice]);

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-charcoal-dark mb-1">Our Gift Collection</h1>
          <p className="font-body text-charcoal-light">{filtered.length} {filtered.length === 1 ? 'gift':'gifts'} found{activeCategory !== 'all' ? ` in ${activeCategory}` : ''}</p>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.id as Category)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 ${activeCategory === cat.id ? 'bg-[#C4687A] text-white shadow-luxury' : 'bg-white border border-cream-200 text-charcoal-mid hover:border-[#C4687A] hover:text-[#C4687A]'}`}>
              <span>{cat.emoji}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-light" />
            <input type="text" placeholder="Search gifts..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-cream-200 rounded-full text-sm font-body focus:outline-none focus:border-[#C4687A]" />
          </div>
          <div className="relative">
            <button onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-2 bg-white border border-cream-200 rounded-full px-5 py-2.5 text-sm font-body font-medium text-charcoal-mid hover:border-[#C4687A] transition-colors">
              Sort: {SORTS.find(o => o.value === sort)?.label} <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }}
                  className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-card-hover border border-cream-200 overflow-hidden z-20">
                  {SORTS.map(opt => (
                    <button key={opt.value} onClick={() => { setSort(opt.value); setSortOpen(false); }}
                      className={`w-full text-left px-5 py-3 text-sm font-body hover:bg-cream-50 transition-colors ${sort === opt.value ? 'text-[#C4687A] font-medium' : 'text-charcoal-mid'}`}>
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center gap-2 bg-white border border-cream-200 rounded-full px-5 py-2.5 text-sm font-body font-medium text-charcoal-mid hover:border-[#C4687A] transition-colors">
            <SlidersHorizontal size={14} /> Filters
          </button>
          <div className="flex bg-white border border-cream-200 rounded-full overflow-hidden">
            <button onClick={() => setGridView(true)} className={`px-3 py-2.5 transition-colors ${gridView ? 'bg-[#C4687A] text-white' : 'text-charcoal-light hover:text-[#C4687A]'}`}><Grid2X2 size={16} /></button>
            <button onClick={() => setGridView(false)} className={`px-3 py-2.5 transition-colors ${!gridView ? 'bg-[#C4687A] text-white' : 'text-charcoal-light hover:text-[#C4687A]'}`}><List size={16} /></button>
          </div>
        </div>

        <AnimatePresence>
          {filterOpen && (
            <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} className="overflow-hidden mb-6">
              <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-card">
                <h3 className="font-display font-semibold text-charcoal-dark mb-4">Max Price: {formatPrice(maxPrice, currency)}</h3>
                <input type="range" min={1000} max={100000} step={1000} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎁</div>
            <h3 className="font-display text-2xl font-semibold text-charcoal-dark mb-2">No gifts found</h3>
            <p className="font-body text-charcoal-light mb-6">Try adjusting your search or filters</p>
            <button onClick={() => { setSearch(''); setCategory('all'); setMaxPrice(100000); }} className="btn-primary text-white px-6 py-3 rounded-full font-body font-medium">Clear Filters</button>
          </div>
        ) : gridView ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.03 }}
                className="bg-white rounded-2xl border border-cream-200 overflow-hidden flex hover:shadow-card transition-shadow">
                <div className="w-36 h-36 flex-shrink-0 img-zoom-container">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-widest text-charcoal-light mb-0.5 font-body capitalize">{p.category}</p>
                    <h3 className="font-display font-semibold text-charcoal-dark text-lg mb-1">{p.name}</h3>
                    <p className="text-sm text-charcoal-light font-body line-clamp-2">{p.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-display text-xl font-bold text-charcoal-dark mb-2">{formatPrice(p.price, currency)}</p>
                    <button onClick={() => { addItem(p); toast.success('Added to cart! 🎁', { style:{ background:'#1C1C2E', color:'#FAF4EC', fontFamily:'DM Sans', borderRadius:'12px' } }); }}
                      className="btn-primary text-white px-5 py-2 rounded-full text-sm font-body font-medium">Add to Cart</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ShopPage;
