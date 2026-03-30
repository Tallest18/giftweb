import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { FX_RATES } from '../../hooks/usePaystack';
import { useCartStore } from '../../store/cartStore';

const CurrencySelector: React.FC = () => {
  const [open, setOpen] = useState(false);
  const currency = useCartStore(s => s.currency);
  const setCurrency = useCartStore(s => s.setCurrency);
  const fx = FX_RATES[currency] || FX_RATES.CAD;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-body font-medium text-charcoal-mid hover:text-[#C4687A] transition-colors px-2 py-1.5 rounded-lg hover:bg-cream-100"
      >
        <span className="font-bold">{fx.symbol}</span>
        <span className="hidden sm:inline text-xs">{currency}</span>
        <ChevronDown size={12} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
              className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-card-hover border border-cream-200 overflow-hidden z-50 max-h-72 overflow-y-auto"
            >
              <div className="px-4 py-2 border-b border-cream-100">
                <p className="text-xs font-body font-semibold text-charcoal-light uppercase tracking-wider">Select Currency</p>
              </div>
              {Object.entries(FX_RATES).map(([code, info]) => (
                <button key={code} onClick={() => { setCurrency(code); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-cream-50 transition-colors ${currency === code ? 'bg-cream-50' : ''}`}>
                  <span className={`text-sm font-body ${currency === code ? 'font-semibold text-[#C4687A]' : 'text-charcoal-mid'}`}>{info.label}</span>
                  <span className={`text-sm font-bold ${currency === code ? 'text-[#C4687A]' : 'text-charcoal-light'}`}>{info.symbol}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
export default CurrencySelector;
