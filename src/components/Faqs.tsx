import React, { useState } from 'react';
import { FAQS } from '../data';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const Faqs: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq_1'); // Default first open

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-12 sm:py-20 bg-[#0B0B0C]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-pink-dark font-semibold">
            Common Questions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2 leading-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* FAQs Accordion Strip */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-brand-pink-dark/50 bg-[#131316] shadow-lg'
                    : 'border-neutral-800/80 bg-neutral-900/60 hover:border-neutral-700 shadow-2xs'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg shrink-0 ${
                      isOpen ? 'bg-brand-pink-dark text-white' : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className="font-serif font-bold text-sm sm:text-base text-white tracking-wide">
                      {faq.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-brand-pink shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
                  )}
                </button>

                {/* Animated Answer Block */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-60 border-t border-neutral-800' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 py-5 text-sm leading-relaxed text-neutral-400 font-sans bg-neutral-950/40">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
