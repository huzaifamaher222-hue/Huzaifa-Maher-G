import React from 'react';
import { Award, Truck, ShieldCheck, Box, CreditCard, RefreshCw, Star } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: <Award className="w-5 h-5 text-brand-gold" />,
      title: 'Premium Quality Guaranteed',
      desc: '100% Original tourmaline ceramic coated heating elements. Gentle on your hair, extremely durable, and maintains a perfectly consistent salon temperature.'
    },
    {
      icon: <Truck className="w-5 h-5 text-purple-400" />,
      title: 'Lightning Fast Dispatch',
      desc: 'We ship orders instantly within 24 hours. Enjoy free tracking SMS updates with fast 2-4 working days delivery across Karachi, Lahore, Islamabad, and nationwide.'
    },
    {
      icon: <Star className="w-5 h-5 text-brand-pink" />,
      title: 'Trusted Pakistani Store',
      desc: 'Over 10,000+ happy customers love StarShineWorld. We are a registered boutique enterprise committed to absolute product honesty and luxury service.'
    },
    {
      icon: <Box className="w-5 h-5 text-blue-400" />,
      title: 'Secure & Safe Packaging',
      desc: 'Each straightener undergoes strict quality checks and is wrapped in multiple shockproof bubble layers inside our signature luxury box to prevent courier damage.'
    },
    {
      icon: <CreditCard className="w-5 h-5 text-emerald-400" />,
      title: 'Cash On Delivery (COD)',
      desc: 'Absolutely zero financial risk. Order with total peace of mind and pay the delivery rider in cash only when they hand over the product at your door.'
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-amber-500 animate-spin-slow" />,
      title: 'Hassle-Free Easy Replacement',
      desc: 'Receive a broken or malfunctioning piece? Simply WhatsApp us a short video proof within 7 days, and we will ship a fresh new replacement instantly, completely free!'
    }
  ];

  return (
    <section id="why-choose-us" className="py-12 sm:py-20 bg-[#0B0B0C] border-b border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-pink font-semibold">
            Shop with Confidence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2 leading-tight">
            Why Buy From Us?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-2">
            Pakistan's favorite beauty boutique where premium quality meets absolute client satisfaction.
          </p>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* 6-grid responsive modern layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {points.map((point, index) => (
            <div
              key={index}
              className="group flex flex-col gap-4 p-6 bg-neutral-900 border border-neutral-800/80 rounded-3xl hover:border-brand-pink/30 hover:bg-neutral-900/50 transition-all duration-300 shadow-lg hover:shadow-brand-pink/5"
            >
              {/* Icon round frame */}
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-neutral-950 flex items-center justify-center border border-neutral-800 group-hover:border-brand-pink/20 shadow-inner group-hover:scale-115 transition-transform duration-300">
                {point.icon}
              </div>
              
              {/* Content description */}
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-wide mb-2 group-hover:text-brand-pink transition-colors">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                  {point.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
