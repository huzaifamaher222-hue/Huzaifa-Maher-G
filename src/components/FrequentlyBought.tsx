import React, { useState } from 'react';
import { Plus, Check, Sparkles, ShoppingBag, Gift } from 'lucide-react';
import straightenerHero from '../assets/images/straightener_hero_1783762299972.jpg';

interface FrequentlyBoughtProps {
  onAddBundle: (quantity: number) => void;
}

export const FrequentlyBought: React.FC<FrequentlyBoughtProps> = ({ onAddBundle }) => {
  // Bundle list of placeholder accessories
  const [items, setItems] = useState([
    {
      id: 'main',
      title: 'Mini Ceramic Hair Straightener',
      price: 1399,
      originalPrice: 1699,
      img: straightenerHero,
      required: true,
      checked: true
    },
    {
      id: 'pouch',
      title: 'Luxury Velvet Heat-Resistant Travel Pouch',
      price: 299,
      originalPrice: 499,
      img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&auto=format&fit=crop&q=80',
      required: false,
      checked: true
    },
    {
      id: 'clips',
      title: '2x Premium Anti-Slip Salon Hair Styling Clips',
      price: 149,
      originalPrice: 299,
      img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&auto=format&fit=crop&q=80',
      required: false,
      checked: true
    }
  ]);

  const toggleItem = (id: string) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === id && !item.required) {
          return { ...item, checked: !item.checked };
        }
        return item;
      })
    );
  };

  // Calculate prices based on check states
  const checkedItems = items.filter(i => i.checked);
  const totalPrice = checkedItems.reduce((acc, curr) => acc + curr.price, 0);
  const totalOriginalPrice = checkedItems.reduce((acc, curr) => acc + curr.originalPrice, 0);
  const totalSavings = totalOriginalPrice - totalPrice;

  const handleAddBundleToOrder = () => {
    // Scroll smoothly to checkout
    const checkoutEl = document.getElementById('checkout-section');
    if (checkoutEl) {
      checkoutEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // We can also trigger adding items or increasing straightener quantities as necessary
    onAddBundle(1);
  };

  return (
    <section id="frequently-bought" className="py-12 sm:py-20 bg-[#0B0B0C] border-b border-neutral-800/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-pink font-semibold flex items-center justify-center gap-1.5">
            <Gift className="w-4.5 h-4.5 text-brand-gold animate-pulse" />
            Frequently Bought Together
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-2 leading-tight">
            Frequently Bought Together
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-2">
            Complete your salon kit and enjoy exclusive bundle discounts! (Limited monsoon package offers)
          </p>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Dynamic Bundle Calculator Widget */}
        <div className="bg-neutral-900 border border-neutral-800/80 p-6 sm:p-8 rounded-3xl shadow-2xl">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Visual Column showing thumbnails chained with Plus signs */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 flex-1">
              {items.map((item, idx) => (
                <React.Fragment key={item.id}>
                  {idx > 0 && <Plus className="w-4 h-4 text-neutral-600 shrink-0" />}
                  
                  <div className={`relative w-20 h-20 sm:w-24 sm:h-24 bg-neutral-950 border-2 rounded-2xl overflow-hidden shadow-md shrink-0 transition-all ${
                    item.checked ? 'border-brand-pink scale-[1.02]' : 'border-neutral-800 opacity-30'
                  }`}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {item.checked && (
                      <div className="absolute top-1 right-1 bg-brand-pink text-white w-4 h-4 rounded-full flex items-center justify-center text-[8px]">
                        ✓
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Price block & button */}
            <div className="w-full md:w-64 bg-neutral-950 border border-neutral-850 p-5 rounded-2xl flex flex-col gap-3 text-center md:text-left shadow-inner">
              <span className="text-[10px] text-brand-pink font-bold uppercase tracking-widest block">
                Exclusive Combo discount
              </span>
              <div>
                <div className="flex items-baseline justify-center md:justify-start gap-2">
                  <span className="text-2xl font-serif font-black text-white">Rs. {totalPrice.toLocaleString()}</span>
                  <span className="text-xs text-neutral-500 line-through">Rs. {totalOriginalPrice.toLocaleString()}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-sans font-bold flex items-center justify-center md:justify-start gap-1 mt-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Save Rs. {totalSavings.toLocaleString()} Instantly
                </span>
              </div>

              <button
                onClick={handleAddBundleToOrder}
                className="w-full bg-gradient-to-r from-brand-pink-dark to-[#b81d5f] hover:brightness-110 text-white font-bold text-xs uppercase py-3 px-4 rounded-xl shadow-lg hover:shadow-brand-pink/10 transition-all flex items-center justify-center gap-2 cursor-pointer border-0"
              >
                <ShoppingBag className="w-4 h-4 fill-white" />
                <span>Add Bundle to Order</span>
              </button>
            </div>

          </div>

          {/* List selection with checkboxes */}
          <div className="mt-8 pt-6 border-t border-neutral-850 space-y-3">
            {items.map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`flex items-start gap-3 p-3.5 rounded-2xl transition-all cursor-pointer ${
                  item.checked 
                    ? 'bg-brand-pink-dark/5 border border-brand-pink/20' 
                    : 'bg-transparent border border-transparent hover:bg-neutral-850/40'
                }`}
              >
                {/* Custom Checkbox */}
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 mt-0.5 ${
                  item.checked 
                    ? 'bg-brand-pink border-transparent text-white' 
                    : 'border-neutral-700 hover:border-brand-pink'
                }`}>
                  {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-left font-sans">
                  <div>
                    <span className={`text-xs sm:text-sm font-semibold leading-tight block ${
                      item.checked ? 'text-white' : 'text-neutral-500'
                    }`}>
                      {item.title}
                    </span>
                    {item.required && (
                      <span className="text-[9px] text-brand-pink font-black uppercase tracking-widest block mt-0.5">
                        Required item
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1.5 shrink-0 mt-1 sm:mt-0">
                    <span className={`text-xs sm:text-sm font-bold ${
                      item.checked ? 'text-brand-pink' : 'text-neutral-500'
                    }`}>
                      Rs. {item.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-neutral-500 line-through">
                      Rs. {item.originalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
