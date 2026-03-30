import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Share2, Rss, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="bg-charcoal-dark text-cream-200 pt-16 pb-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C4687A] to-[#8B3A4A] flex items-center justify-center">
              <span className="text-white text-lg font-display font-bold">G</span>
            </div>
            <span className="font-display text-2xl font-bold text-white">Giftly</span>
          </div>
          <p className="text-sm text-cream-300 font-body leading-relaxed mb-2">
            Canada's premier gifting platform — curated with love, delivered with care.
          </p>
          <p className="text-xs text-cream-300 font-body mb-5">🌍 Shipping worldwide · 🍁 Based in Toronto, Canada</p>
          <div className="flex gap-3">
            {[Globe, Share2, Rss].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C4687A] transition-colors">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-white font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {[
              ['/', 'Home'],
              ['/shop', 'All Gifts'],
              ['/occasions', 'Shop by Occasion'],
              ['/shop?category=flowers', 'Flowers'],
              ['/shop?category=hampers', 'Hampers'],
              ['/shop?category=jewelry', 'Jewellery'],
              ['/about', 'About Us'],
            ].map(([to, l]) => (
              <li key={to}><Link to={to} className="text-sm text-cream-300 hover:text-[#D4A843] transition-colors font-body">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-white font-semibold text-lg mb-4">Help & Info</h4>
          <ul className="space-y-2.5">
            {['FAQs', 'Delivery & Shipping', 'International Orders', 'Returns & Refunds', 'Track My Order', 'Corporate Gifting', 'Gift Cards'].map(l => (
              <li key={l}><a href="#" className="text-sm text-cream-300 hover:text-[#D4A843] transition-colors font-body">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-white font-semibold text-lg mb-4">Contact Us</h4>
          <ul className="space-y-3 mb-5">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-[#C4687A] mt-0.5 flex-shrink-0" />
              <span className="text-sm text-cream-300 font-body">123 King Street West, Suite 400<br />Toronto, Ontario, M5H 1J5<br />Canada</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-[#C4687A] flex-shrink-0" />
              <a href="tel:+14165550199" className="text-sm text-cream-300 hover:text-[#D4A843] font-body">+1 (416) 555-0199</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-[#C4687A] flex-shrink-0" />
              <a href="mailto:hello@giftly.ca" className="text-sm text-cream-300 hover:text-[#D4A843] font-body">hello@giftly.ca</a>
            </li>
            <li className="flex items-center gap-3">
              <Globe size={16} className="text-[#C4687A] flex-shrink-0" />
              <span className="text-sm text-cream-300 font-body">Shipping to 50+ countries</span>
            </li>
          </ul>
          <div>
            <p className="text-sm text-white font-medium mb-2">Get gifting inspiration</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="flex-1 bg-white/10 border border-white/20 rounded-l-full px-4 py-2 text-sm text-white placeholder-cream-300 focus:outline-none focus:border-[#C4687A]" />
              <button className="bg-[#C4687A] hover:bg-[#8B3A4A] transition-colors px-4 rounded-r-full text-white text-sm font-medium">Join</button>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping badges */}
      <div className="py-5 border-b border-white/10">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {['🇨🇦 Canada', '🇺🇸 United States', '🇬🇧 United Kingdom', '🇦🇺 Australia', '🇩🇪 Germany', '🌍 Africa', '+ 45 more countries'].map(c => (
            <span key={c} className="text-xs bg-white/8 text-cream-300 font-body px-3 py-1.5 rounded-full border border-white/10">{c}</span>
          ))}
        </div>
      </div>

      <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-cream-300 font-body">© {new Date().getFullYear()} Giftly Inc. All rights reserved. Toronto, Canada.</p>
        <div className="flex items-center gap-1 text-xs text-cream-300 font-body">Made with <Heart size={11} className="text-[#C4687A] fill-[#C4687A] mx-1" /> in Toronto</div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-xs text-cream-300 hover:text-white transition-colors">Privacy</a>
          <a href="#" className="text-xs text-cream-300 hover:text-white transition-colors">Terms</a>
          <div className="flex items-center gap-2">
            <div className="bg-white/10 rounded px-2 py-1 text-xs text-white font-bold">Paystack</div>
            <div className="bg-white/10 rounded px-2 py-1 text-xs text-white font-bold">SSL</div>
            <div className="bg-white/10 rounded px-2 py-1 text-xs text-white font-bold">PCI DSS</div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
