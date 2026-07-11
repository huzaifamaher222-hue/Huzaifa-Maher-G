import React from 'react';
import { Sparkles, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  onOrderClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOrderClick }) => {
  return (
    <header className="w-full bg-[#0B0B0C]/90 backdrop-blur-md border-b border-neutral-800/80 sticky top-0 z-40 transition-all duration-300 shadow-xl">
      {/* Premium Announcement Bar */}
      <div className="w-full bg-black text-white text-xs py-2 px-4 text-center font-medium tracking-wider flex items-center justify-center gap-1.5 overflow-hidden">
        <span className="inline-block w-2 h-2 rounded-full bg-brand-pink-dark animate-pulse" />
        <span className="uppercase text-[10px] md:text-xs tracking-widest text-neutral-200">
          ✨ SPECIAL DISCOUNT: FREE Delivery Across Pakistan + Cash on Delivery (COD) ✨
        </span>
      </div>

      {/* Main Luxury Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo - Serif elegant font */}
        <div className="flex items-center gap-2 select-none group cursor-pointer">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center border border-brand-pink-dark/55">
              <Sparkles className="w-4 h-4 text-brand-pink-dark group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-gold rounded-full animate-bounce" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-2xl font-bold tracking-widest text-white uppercase leading-none">
              StarShine<span className="text-brand-pink-dark text-xl sm:text-3xl font-light">World</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-sans font-semibold">
              Elegance & Trust
            </span>
          </div>
        </div>

        {/* Action Button & Cart Indicator */}
        <div className="flex items-center gap-4">
          {/* Active Cart Pill */}
          <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-full py-1.5 px-3.5 text-xs text-brand-pink font-medium">
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brand-pink-dark text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                1
              </span>
            </div>
            <span className="hidden sm:inline font-sans">Cart</span>
          </div>

          {/* Quick Buy CTA */}
          <button
            id="header-cta"
            onClick={onOrderClick}
            className="hidden sm:flex items-center justify-center bg-gradient-to-r from-brand-pink-dark to-[#b81d5f] hover:brightness-110 text-white text-xs font-semibold uppercase tracking-widest py-3 px-6 rounded-full transition-all duration-300 border border-transparent shadow-md transform active:scale-95 animate-shine cursor-pointer"
          >
            Order Now - Save Rs. 300
          </button>
        </div>
      </div>
    </header>
  );
};
