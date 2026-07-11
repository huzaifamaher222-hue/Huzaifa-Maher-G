import React from 'react';
import { BENEFITS } from '../data';
import { Zap, Sparkles, Smartphone, Scissors } from 'lucide-react';

export const Benefits: React.FC = () => {
  // Helper to map icon string to actual Lucide component
  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-brand-gold" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-brand-gold" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-brand-gold" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5 text-brand-gold" />;
      default:
        return <Sparkles className="w-5 h-5 text-brand-gold" />;
    }
  };

  return (
    <section id="benefits-section" className="py-12 sm:py-20 bg-[#0B0B0C] border-t border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-pink-dark font-semibold">
            Elegant Results
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2 leading-tight">
            Why Your Hair Will Love This Straightener
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFITS.map((benefit, idx) => (
            <div
              key={benefit.id}
              className="relative p-6 sm:p-8 bg-[#131316] rounded-2xl border border-neutral-800 shadow-xl hover:shadow-2xl hover:border-brand-pink-dark/40 transition-all duration-300 group"
            >
              {/* Badge/Icon Wrapper */}
              <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/25 group-hover:scale-110 transition-transform duration-300 mb-6">
                {getIcon(benefit.iconName)}
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-lg font-semibold tracking-wide text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                {benefit.description}
              </p>

              {/* Decorative Accent Corner */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-brand-pink-dark/20 rounded-tr-2xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
