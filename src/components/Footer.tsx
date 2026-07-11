import React from 'react';
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, Heart, Facebook, Instagram, MessageCircle } from 'lucide-react';

interface FooterProps {
  onPolicyClick: (policyType: 'privacy' | 'shipping' | 'refund' | 'terms' | 'contact') => void;
  onAdminClick: () => void;
}

// Custom universal SVG path for TikTok (Requirement 19)
const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.06-1.45-.07-.05-.12-.12-.19-.18v5.82c.1 3.25-1.91 6.55-5.06 7.64-3.54 1.25-7.79-.16-9.61-3.39-1.9-3.11-1.09-7.77 1.83-9.87 2.12-1.57 5.14-1.63 7.21-.29v4.19c-1.22-.84-2.94-.78-4.03.2-1.12.98-1.28 2.77-.38 3.9 1 1.28 3.02 1.54 4.3.56.78-.58 1.19-1.54 1.2-2.52V0h-.01z"/>
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ onPolicyClick, onAdminClick }) => {
  return (
    <footer className="bg-[#0B0B0C] text-neutral-300 py-12 sm:py-16 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand description column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center border border-brand-gold/20">
                <Sparkles className="w-4 h-4 text-brand-gold" />
              </div>
              <span className="font-serif text-lg font-bold text-white tracking-widest uppercase">
                StarShine<span className="text-brand-pink">World</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Curating premium salon-grade beauty utilities that protect your hair and elevate your look. Proudly serving styling confidence across Pakistan.
            </p>
            
            {/* Social Icons (Requirement 19) */}
            <div className="flex items-center gap-2.5 pt-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-[#1877F2] hover:text-white flex items-center justify-center text-neutral-400 border border-neutral-800 hover:border-transparent transition-all duration-300 cursor-pointer"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-[#E1306C] hover:text-white flex items-center justify-center text-neutral-400 border border-neutral-800 hover:border-transparent transition-all duration-300 cursor-pointer"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-[#010101] hover:text-white flex items-center justify-center text-neutral-400 border border-neutral-800 hover:border-transparent transition-all duration-300 cursor-pointer"
                title="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://wa.me/923269772249" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-[#25D366] hover:text-white flex items-center justify-center text-neutral-400 border border-neutral-800 hover:border-transparent transition-all duration-300 cursor-pointer"
                title="WhatsApp Support"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links / Policies */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-850 pb-2">
              Our Policies
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onPolicyClick('shipping')}
                  className="hover:text-brand-pink transition-colors cursor-pointer text-left font-sans text-neutral-400"
                >
                  Shipping & Delivery Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPolicyClick('refund')}
                  className="hover:text-brand-pink transition-colors cursor-pointer text-left font-sans text-neutral-400"
                >
                  7-Day Refund & Exchange Warranty
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPolicyClick('privacy')}
                  className="hover:text-brand-pink transition-colors cursor-pointer text-left font-sans text-neutral-400"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPolicyClick('terms')}
                  className="hover:text-brand-pink transition-colors cursor-pointer text-left font-sans text-neutral-400"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (Requirement 19) */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-850 pb-2">
              Contact & Support
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold shrink-0 animate-pulse" />
                <a
                  href="https://wa.me/923269772249"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-pink text-left font-sans text-neutral-300 font-semibold"
                >
                  WhatsApp: 03269772249
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="font-sans text-neutral-400">support@starshineworld.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="font-sans text-neutral-400">Gulberg III, Lahore, Pakistan</span>
              </li>
            </ul>
          </div>

          {/* Trust logistics column */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-850 pb-2">
              Payment Methods
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="bg-neutral-900 text-[10px] text-neutral-400 font-sans font-bold px-2 py-1.5 rounded-md uppercase tracking-wider border border-neutral-800">
                Cash On Delivery
              </span>
              <span className="bg-neutral-900 text-[10px] text-neutral-400 font-sans font-bold px-2 py-1.5 rounded-md uppercase tracking-wider border border-neutral-800">
                JazzCash / EasyPaisa
              </span>
            </div>
            <div className="p-3.5 bg-neutral-900/60 border border-neutral-800 rounded-2xl flex gap-2.5 items-center">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-[10px] text-neutral-400 font-sans leading-tight">
                Secure SSL checkouts ensure transaction safety.
              </span>
            </div>
          </div>

        </div>

        {/* Divider line */}
        <div className="h-px bg-neutral-800/60 my-8" />

        {/* Copyright (Requirement 20) */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center text-xs text-neutral-500">
          <div className="font-sans font-medium">
            &copy; 2026 StarShineWorld. All Rights Reserved.
          </div>
          <div className="flex items-center gap-2 font-sans">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-brand-pink fill-brand-pink animate-pulse" />
            <span>in Pakistan</span>
            <span className="text-neutral-700">|</span>
            <button
              onClick={onAdminClick}
              className="text-neutral-600 hover:text-brand-pink text-[11px] underline font-medium cursor-pointer transition-colors"
            >
              Merchant Panel
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
