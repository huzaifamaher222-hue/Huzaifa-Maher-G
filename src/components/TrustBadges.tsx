import React from 'react';
import { Truck, ShieldCheck, Award, CreditCard } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: <CreditCard className="w-6 h-6 text-brand-pink" />,
      title: 'Cash On Delivery',
      desc: 'Pay with cash at your doorstep only when you receive your order.'
    },
    {
      icon: <Truck className="w-6 h-6 text-brand-pink" />,
      title: 'Fast Free Delivery',
      desc: '2-4 Days free shipping to Karachi, Lahore, Islamabad & all over Pakistan.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-pink" />,
      title: '7-Day Return Policy',
      desc: 'Hassle-free 100% replacement warranty if product is damaged.'
    },
    {
      icon: <Award className="w-6 h-6 text-brand-pink" />,
      title: 'Premium Quality',
      desc: '100% Original tourmaline ceramic elements with protective glazes.'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {badges.map((badge, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center text-center p-4 rounded-xl border border-neutral-800 bg-neutral-900 hover:border-brand-pink-dark/40 hover:bg-neutral-900/80 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-neutral-950 flex items-center justify-center shadow-lg border border-neutral-800 mb-2.5">
            {badge.icon}
          </div>
          <h4 className="font-serif text-sm font-semibold tracking-wider text-white mb-1">
            {badge.title}
          </h4>
          <p className="text-[11px] leading-relaxed text-neutral-400 font-sans">
            {badge.desc}
          </p>
        </div>
      ))}
    </div>
  );
};
