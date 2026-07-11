import React from 'react';
import { Sliders, Sparkles, Check, Info } from 'lucide-react';

export const Features: React.FC = () => {
  // CONFIGURATION: These are the exact 9 requested specs (Requirement 13)
  const technicalSpecs = [
    { title: 'Plate Material', value: 'Tourmaline Ceramic Protective Glaze' },
    { title: 'Heating Time', value: '30 Seconds Rapid Heat (PTC Elements)' },
    { title: 'Voltage', value: '220V (Standard Pakistani Round Sockets)' },
    { title: 'Temperature', value: '160°C - 200°C Intelligent Regulation' },
    { title: 'Power', value: '20W - 25W High Performance Energy Saver' },
    { title: 'Cord Length', value: '1.2m Heavy Duty Swivel Insulated Wire' },
    { title: 'Weight', value: '120g Featherweight (Perfect for travel bags)' },
    { title: 'Color', value: 'Aesthetic Blush Pink with Rose Gold accents' },
    { title: 'Warranty', value: '7-Day Hassle-Free Instant Replacement Warranty' }
  ];

  return (
    <section id="features-section" className="py-12 sm:py-20 bg-[#0D0D0F] border-t border-b border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Description Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 bg-brand-pink-dark/10 border border-brand-pink-dark/30 rounded-full px-3.5 py-1 text-xs text-brand-pink font-semibold uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5" />
              <span>Smart Tech Specifications</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Crafted with Precision for Flawless Styling
            </h2>
            
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
              Our Mini Ceramic Straightener combines luxury ergonomics with robust salon-grade components. The constant-temperature chip maintains even heat distribution across plates to prevent hair pulling or heat damage.
            </p>

            {/* Did you know block */}
            <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl flex gap-4 items-start shadow-xl">
              <div className="p-2.5 rounded-xl bg-brand-pink-dark/10 border border-brand-pink/20 shrink-0">
                <Sparkles className="w-5 h-5 text-brand-pink animate-pulse" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-white tracking-wide">
                  Negative Ion Protective Glaze
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed mt-1 font-sans">
                  Tourmaline Ceramic plates release natural negative ions when heated. This seals hair cuticles, locks in essential hydration, and ensures your hair remains shiny and healthy.
                </p>
              </div>
            </div>
          </div>

          {/* Right Specifications Table Column (Requirement 13) */}
          <div className="lg:col-span-7 bg-neutral-900 rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 bg-black text-white flex justify-between items-center border-b border-neutral-800">
              <span className="font-serif text-xs font-bold tracking-wider uppercase flex items-center gap-2">
                <Info className="w-4 h-4 text-brand-pink" />
                Technical Specifications Table
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2 py-0.5 rounded font-black tracking-widest uppercase font-sans">
                Original Product
              </span>
            </div>
            
            {/* Specs 9 Rows */}
            <div className="divide-y divide-neutral-850 bg-neutral-900/60">
              {technicalSpecs.map((spec, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-12 px-6 py-3.5 text-xs sm:text-sm hover:bg-[#131316]/60 transition-colors duration-150 gap-1 sm:gap-4"
                >
                  <span className="sm:col-span-5 font-sans font-black text-neutral-400 tracking-wide uppercase text-[10px] sm:text-xs">
                    {spec.title}
                  </span>
                  <span className="sm:col-span-7 font-sans font-bold text-white leading-tight">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
