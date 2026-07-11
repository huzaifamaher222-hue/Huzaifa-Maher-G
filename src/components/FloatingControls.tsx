import React from 'react';
import { Phone, ArrowRight, ShoppingCart } from 'lucide-react';

interface FloatingControlsProps {
  onOrderClick: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({ onOrderClick }) => {
  // WhatsApp Configuration (Requirement 4 & 19)
  const WHATSAPP_NUMBER = '923269772249'; // International representation of 03269772249
  const PRE_FILLED_MESSAGE = 'Assalam-o-Alaikum! I want to order the Mini Ceramic Hair Straightener.';
  const encodedMessage = encodeURIComponent(PRE_FILLED_MESSAGE);

  return (
    <>
      {/* 1. Sticky Order Now Bottom Bar - Mobile Only (Always visible on mobile - Requirement 7) */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-[#0B0B0C]/98 backdrop-blur-lg border-t border-neutral-800/90 p-3.5 z-45 shadow-[0_-12px_40px_rgba(0,0,0,0.6)] flex items-center justify-between gap-4 md:hidden transition-transform duration-300"
      >
        {/* Left price block details */}
        <div className="flex flex-col shrink-0">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black text-brand-pink leading-none">Rs. 1,399</span>
            <span className="text-[10px] text-neutral-500 line-through leading-none">Rs. 1,699</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mt-1 leading-none">
            Delivery Rs.135
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={onOrderClick}
          className="flex-1 bg-gradient-to-r from-brand-pink-dark to-[#b81d5f] hover:brightness-110 text-white py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 animate-pulse cursor-pointer shadow-lg shadow-brand-pink-dark/15 border-0"
        >
          <ShoppingCart className="w-4 h-4 fill-white shrink-0" />
          <span>Buy Now</span>
          <ArrowRight className="w-3.5 h-3.5 text-white shrink-0" />
        </button>
      </div>

      {/* 2. Floating WhatsApp Floating button (Requirement 4 & 19) */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-24 right-6 bg-[#25D366] hover:bg-emerald-600 text-white rounded-full p-4 shadow-2xl z-45 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer group"
        title="Order via WhatsApp"
      >
        {/* Animated outer sound waves */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping group-hover:animate-none" />
        <Phone className="w-6 h-6 relative shrink-0 fill-white" />
        
        {/* Hover label for immediate contact */}
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 font-sans font-black text-xs text-white pl-0 group-hover:pl-2">
          WhatsApp Order
        </span>
      </a>
    </>
  );
};
