import React from 'react';
import { Check, X, ShieldAlert, Sparkles } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const sswFeatures = [
    'Premium Tourmaline Ceramic Plates',
    '30s Rapid Heating & Constant Thermal Tech',
    'Intelligent Temperature Regulation (160°C - 200°C)',
    'Zero Hair Tug, Burn Protection & Negative Ion Glaze',
    'Featherweight Ergonomic Built-to-Last Shell',
    'No-Risk Cash On Delivery & 7-Day Free Warranty'
  ];

  const otherFeatures = [
    'Cheap Plastic / Rough Painted Metal Plates',
    'Extremely Slow & Uneven Heat Distribution',
    'No Temperature Control (Burns Hair or No Style)',
    'High Hair Damage Risk, Tug & Split Ends',
    'Cheap Fragile Plastic Body (Heats up outer casing)',
    'Limited or No Customer Support, Complex Exchanges'
  ];

  return (
    <section id="comparison-section" className="py-12 sm:py-20 bg-[#0B0B0C] border-b border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-pink font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-gold animate-bounce" />
            Product Comparison
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2 leading-tight">
            See the Difference
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-2">
            Why intelligent shoppers always choose the original StarShineWorld straightener over cheap lookalikes.
          </p>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Comparison grid wrapper */}
        <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-neutral-800 bg-[#131316] shadow-2xl">
          <div className="grid grid-cols-2 divide-x divide-neutral-850">
            
            {/* Left Header Column - StarShineWorld */}
            <div className="bg-brand-pink-dark/10 p-6 text-center flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-brand-pink-dark flex items-center justify-center border border-brand-pink/30 shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-extrabold text-white tracking-wide">
                StarShineWorld <span className="text-brand-pink">✅</span>
              </h3>
              <span className="text-[10px] text-emerald-400 font-sans font-bold uppercase tracking-widest bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30">
                Premium Choice
              </span>
            </div>

            {/* Right Header Column - Others */}
            <div className="bg-neutral-950 p-6 text-center flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center border border-neutral-800">
                <ShieldAlert className="w-5 h-5 text-neutral-500" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-400 tracking-wide">
                Others <span className="text-red-500">❌</span>
              </h3>
              <span className="text-[10px] text-neutral-500 font-sans font-bold uppercase tracking-widest bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                Cheap Counterfeits
              </span>
            </div>

          </div>

          {/* Table Rows */}
          <div className="divide-y divide-neutral-850">
            {sswFeatures.map((_, index) => (
              <div key={index} className="grid grid-cols-2 divide-x divide-neutral-850 hover:bg-[#1c1c20]/40 transition-colors duration-150">
                
                {/* SSW Column */}
                <div className="p-4 sm:p-6 flex gap-3 items-start bg-brand-pink-dark/5">
                  <div className="p-1 rounded-full bg-emerald-950/60 border border-emerald-850 text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-neutral-200 font-sans font-medium">
                    {sswFeatures[index]}
                  </span>
                </div>

                {/* Others Column */}
                <div className="p-4 sm:p-6 flex gap-3 items-start bg-neutral-950/30">
                  <div className="p-1 rounded-full bg-red-950/60 border border-red-950 text-red-400 shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-neutral-500 font-sans font-medium">
                    {otherFeatures[index]}
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
