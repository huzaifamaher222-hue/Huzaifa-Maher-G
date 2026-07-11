import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductGallery } from './components/ProductGallery';
import { TrustBadges } from './components/TrustBadges';
import { Benefits } from './components/Benefits';
import { Features } from './components/Features';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Reviews } from './components/Reviews';
import { Faqs } from './components/Faqs';
import { OrderForm } from './components/OrderForm';
import { Footer } from './components/Footer';
import { PolicyModals } from './components/PolicyModals';
import { MerchantAdmin } from './components/MerchantAdmin';
import { FloatingControls } from './components/FloatingControls';

// Import newly created premium sections (Requirements 14, 16, 17)
import { ComparisonTable } from './components/ComparisonTable';
import { InstagramGallery } from './components/InstagramGallery';
import { FrequentlyBought } from './components/FrequentlyBought';

import { Sparkles, Clock, CheckCircle, Truck, RefreshCw, Star, ArrowRight, X, MessageSquare, ShieldCheck, Heart, AlertCircle } from 'lucide-react';
import { Order } from './types';

export default function App() {
  // Navigation scrolling helpers
  const scrollToCheckout = () => {
    const el = document.getElementById('checkout-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // State managers
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'shipping' | 'refund' | 'terms' | 'contact' | null>(null);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // Success order confirmation state (Requirement 9)
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Exit Intent Popup states (Requirement 8)
  const [isExitIntentOpen, setIsExitIntentOpen] = useState(false);
  const [hasExitIntentTriggered, setHasExitIntentTriggered] = useState(false);

  // Rotating Social Proof Popup states (Requirement 18)
  const [activeNotification, setActiveNotification] = useState<{
    name: string;
    city: string;
    time: string;
  } | null>(null);

  // Dynamic countdown timer for shipping batch urgency (professional and trustworthy)
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 12, seconds: 45 });

  // 1. WhatsApp Configuration (Requirement 4)
  const WHATSAPP_NUMBER = '923269772249'; // 03269772249 formatted with country code
  const WHATSAPP_MESSAGE = 'Assalam-o-Alaikum! I want to order the Mini Ceramic Hair Straightener.';
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);

  // Urgency Countdown Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 6, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 2. Exit Intent Popup detection (Requirement 8)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if cursor leaves viewport top boundary, and it hasn't popped yet this session
      if (e.clientY < 30 && !hasExitIntentTriggered && !confirmedOrder) {
        setIsExitIntentOpen(true);
        setHasExitIntentTriggered(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    // Fallback trigger for mobile after 25 seconds of browsing
    const mobileFallbackTimer = setTimeout(() => {
      if (!hasExitIntentTriggered && !confirmedOrder) {
        setIsExitIntentOpen(true);
        setHasExitIntentTriggered(true);
      }
    }, 25000);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(mobileFallbackTimer);
    };
  }, [hasExitIntentTriggered, confirmedOrder]);

  // 3. Recently Ordered Popups social proof rotation (Requirement 18)
  useEffect(() => {
    const femaleNames = ['Ayesha', 'Sana', 'Fatima', 'Anum', 'Zainab', 'Sidra', 'Hira', 'Kiran', 'Maryam', 'Amna', 'Rabia', 'Alisha', 'Sadia', 'Mahnoor', 'Bisma', 'Hina'];
    const pakistaniCities = ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Multan', 'Peshawar', 'Rawalpindi', 'Sialkot', 'Gujranwala', 'Hyderabad', 'Abbottabad', 'Bahawalpur', 'Sargodha', 'Sahiwal', 'Sukkur', 'Quetta'];
    const times = ['2 minutes ago', '5 minutes ago', '7 minutes ago', '9 minutes ago', '12 minutes ago', '15 minutes ago'];

    const triggerNotification = () => {
      if (confirmedOrder) return; // Do not interrupt checkout receipt
      
      const randomName = femaleNames[Math.floor(Math.random() * femaleNames.length)];
      const randomCity = pakistaniCities[Math.floor(Math.random() * pakistaniCities.length)];
      const randomTime = times[Math.floor(Math.random() * times.length)];

      setActiveNotification({
        name: randomName,
        city: randomCity,
        time: randomTime
      });

      // Hide notification after 4.5 seconds
      setTimeout(() => {
        setActiveNotification(null);
      }, 4500);
    };

    // First trigger after 6 seconds, then repeat every 14 seconds
    const initialDelay = setTimeout(() => {
      triggerNotification();
    }, 6000);

    const intervalId = setInterval(triggerNotification, 14000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(intervalId);
    };
  }, [confirmedOrder]);

  const handlePolicyOpen = (policyType: 'privacy' | 'shipping' | 'refund' | 'terms' | 'contact') => {
    setActivePolicy(policyType);
    setIsPolicyOpen(true);
  };

  const handleOrderSuccess = (order: Order) => {
    setConfirmedOrder(order);
    setIsExitIntentOpen(false); // Close exit intent if they finished order
  };

  const handleAddBundle = () => {
    scrollToCheckout();
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-neutral-200 font-sans relative antialiased selection:bg-brand-pink-dark/30">
      
      {/* 1. Header Navigation */}
      <Header onOrderClick={scrollToCheckout} />

      {/* 2. Premium Shopify-Style Hero Section */}
      <section className="py-8 sm:py-16 lg:py-20 bg-gradient-to-b from-brand-pink-dark/10 via-[#0B0B0C] to-[#0B0B0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* HERO LEFT COLUMN: Multi-image Interactive Gallery */}
            <div className="lg:col-span-6 w-full">
              <ProductGallery />
            </div>

            {/* HERO RIGHT COLUMN: Sales Proposition, Pricing & Immediate Urgency */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Trust Badge */}
              <div className="flex items-center gap-1.5 text-xs text-brand-pink-dark font-semibold tracking-widest uppercase">
                <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
                <span>Premium Quality Hair Curators</span>
              </div>

              {/* Product Heading */}
              <div className="space-y-2">
                <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Mini Ceramic<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-pink to-brand-gold animate-pulse">
                    Hair Straightener
                  </span>
                </h1>
                
                {/* Social Ratings Star Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-400 font-sans font-semibold">
                    4.9 &bull; (324 verified buyer reviews)
                  </span>
                </div>
              </div>

              {/* Price Details Display Section */}
              <div className="bg-[#131316] p-5 rounded-2xl border border-neutral-850 shadow-xl flex flex-col gap-3">
                <div className="inline-flex self-start items-center gap-1.5 bg-brand-pink-dark/10 border border-brand-pink-dark/30 text-brand-pink text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  🎉 Flash Monsoon Clearance Offer (Save Rs. 300)
                </div>

                <div className="flex items-baseline gap-4 mt-1">
                  <span className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-pink-dark tracking-tight">
                    Rs. 1,399
                  </span>
                  <span className="text-sm sm:text-base text-neutral-500 line-through font-sans">
                    Rs. 1,699
                  </span>
                  <span className="bg-emerald-950/40 text-emerald-400 font-sans text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-900/30 flex items-center gap-1 animate-pulse">
                    Save Rs. 300
                  </span>
                </div>

                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Pay with absolute peace of mind using <strong>Cash on Delivery (COD)</strong> upon arrival. Free shipping and zero advance deposits required!
                </p>
              </div>

              {/* Urgency Dispatch alert bar */}
              <div className="p-4 bg-brand-gold/10 border border-brand-gold/20 rounded-2xl flex items-center gap-3.5">
                <Clock className="w-5 h-5 text-brand-gold shrink-0 animate-bounce" />
                <div className="text-xs leading-relaxed text-neutral-300 font-sans">
                  <span className="font-bold text-white block">Logistical Dispatch Alert:</span>
                  Today's courier dispatch block leaves in <strong className="text-white">{timeLeft.hours.toString().padStart(2, '0')}h {timeLeft.minutes.toString().padStart(2, '0')}m {timeLeft.seconds.toString().padStart(2, '0')}s</strong>. Order now to get priority same-day shipping!
                </div>
              </div>

              {/* Product Highlights beside images (Requirement 3 checklist) */}
              <div className="bg-neutral-900/40 p-5 rounded-2xl border border-neutral-850">
                <span className="text-[10px] text-neutral-400 font-sans font-black uppercase tracking-widest block mb-3">
                  Product Core Highlights
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-xs font-bold text-neutral-200 font-sans">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-sans text-sm">✓</span>
                    <span>Heats in 30 Seconds</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-sans text-sm">✓</span>
                    <span>Ceramic Tourmaline Plates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-sans text-sm">✓</span>
                    <span>Lightweight &amp; Travel Friendly</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-sans text-sm">✓</span>
                    <span>Temperature Control</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-sans text-sm">✓</span>
                    <span>Suitable for All Hair Types</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-sans text-sm">✓</span>
                    <span>Easy to Carry</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400 font-sans text-sm">✓</span>
                    <span>Safe for Daily Use</span>
                  </li>
                </ul>
              </div>

              {/* Improved Hero CTA Buttons (Requirement 4) */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {/* Primary Button */}
                <button
                  onClick={scrollToCheckout}
                  className="flex-1 bg-gradient-to-r from-brand-pink-dark to-[#b81d5f] hover:brightness-110 text-white text-xs sm:text-sm font-bold uppercase tracking-widest py-4 px-8 rounded-xl transition-all duration-300 transform active:scale-95 shadow-[0_6px_25px_rgba(219,39,119,0.3)] flex items-center justify-center gap-2 cursor-pointer border-0"
                >
                  <span>🛒 Order Now – Rs. 1,399</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                {/* Secondary Button */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold uppercase tracking-widest py-4 px-8 rounded-xl transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/10 cursor-pointer"
                >
                  <MessageSquare className="w-4.5 h-4.5 text-white shrink-0 fill-white" />
                  <span>💬 WhatsApp Order</span>
                </a>
              </div>

              {/* Micro logistics text */}
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-neutral-500 font-sans font-semibold pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" /> Free Shipping &bull; Leopards &amp; PostEx
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" /> Easy 7-day Replacement Warranty
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Trust Badges */}
      <section className="bg-[#0B0B0C] py-8 border-t border-b border-neutral-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </div>
      </section>

      {/* 4. Product Benefits Section */}
      <Benefits />

      {/* 5. Frequently Bought Together Upsell section (Requirement 17) */}
      <FrequentlyBought onAddBundle={handleAddBundle} />

      {/* 6. Technical Specifications Table (Requirement 13) */}
      <Features />

      {/* 7. Product Comparison Table (Requirement 14) */}
      <ComparisonTable />

      {/* 8. Why Buy From Us (Requirement 12) */}
      <WhyChooseUs />

      {/* 9. Verified Customer Reviews & Transformations (Requirement 15) */}
      <Reviews />

      {/* 10. Instagram Lookbook Gallery (Requirement 16) */}
      <InstagramGallery />

      {/* 11. FAQ Section */}
      <Faqs />

      {/* 12. Checkout Form Module Block */}
      <div className="bg-[#0D0D0F] border-t border-neutral-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-pink font-bold">
              Instant Order Dispatch
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2 leading-tight">
              Order Yours Today
            </h2>
            <p className="text-xs text-neutral-400 font-sans mt-2 leading-relaxed">
              Fill in your correct Pakistani delivery address below to secure 100% free shipping and Cash on Delivery.
            </p>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
          </div>
        </div>
        
        {/* Dynamic checkout */}
        <OrderForm onOrderSuccess={handleOrderSuccess} />
      </div>

      {/* 13. Sticky Floating Controls (WhatsApp + Mobile order bar) */}
      <FloatingControls onOrderClick={scrollToCheckout} />

      {/* 14. Brand Footer with socials and legal links */}
      <Footer onPolicyClick={handlePolicyOpen} onAdminClick={() => setIsAdminOpen(true)} />

      {/* 15. Policy & Legal Modal panels */}
      <PolicyModals
        isOpen={isPolicyOpen}
        type={activePolicy}
        onClose={() => {
          setIsPolicyOpen(false);
          setActivePolicy(null);
        }}
      />

      <MerchantAdmin isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* 16. RECENTLY ORDERED AUTOMATED POPUP (Requirement 18) */}
      {activeNotification && (
        <div className="fixed bottom-24 left-6 max-w-sm bg-[#131316]/95 backdrop-blur-md border border-neutral-800 p-4 rounded-2xl shadow-2xl z-40 flex gap-3.5 items-center animate-slide-up select-none pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-brand-pink-dark text-white flex items-center justify-center text-sm shadow-md shrink-0">
            🛍
          </div>
          <div className="font-sans text-xs">
            <p className="text-white font-bold leading-tight">
              {activeNotification.name} from <span className="text-brand-pink font-extrabold">{activeNotification.city}</span>
            </p>
            <p className="text-neutral-300 text-[11px] mt-0.5 leading-tight">
              Ordered the Mini Hair Straightener
            </p>
            <span className="text-[10px] text-neutral-500 font-semibold block mt-1">
              {activeNotification.time}
            </span>
          </div>
        </div>
      )}

      {/* 17. EXIT INTENT POPUP WINDOW (Requirement 8) */}
      {isExitIntentOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#131316] rounded-3xl max-w-md w-full border border-neutral-800 shadow-2xl relative overflow-hidden text-center p-8 flex flex-col items-center">
            
            {/* Close */}
            <button
              onClick={() => setIsExitIntentOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-900 text-neutral-400 hover:text-white cursor-pointer border-0"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon design */}
            <div className="w-14 h-14 rounded-full bg-brand-pink-dark/15 border border-brand-pink/30 flex items-center justify-center text-white text-2xl mb-4 animate-bounce">
              🎁
            </div>

            {/* Title & Offer */}
            <h3 className="font-serif text-2xl font-black text-white leading-tight">
              Wait! Don't Leave Yet
            </h3>
            
            <p className="text-brand-pink font-sans font-bold text-sm tracking-wide uppercase mt-1 mb-3">
              Order Today &amp; Get Priority Dispatch
            </p>

            <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-6">
              Lock in your promotional Monsoon offer price of <strong>Rs. 1,399</strong> and enjoy 100% Free Shipping + Cash on Delivery right to your door. Today's shipping slot is closing soon!
            </p>

            {/* CTA Actions */}
            <div className="flex flex-col gap-2.5 w-full">
              <button
                onClick={() => {
                  setIsExitIntentOpen(false);
                  scrollToCheckout();
                }}
                className="w-full bg-gradient-to-r from-brand-pink-dark to-[#b81d5f] hover:brightness-110 text-white font-black text-xs sm:text-sm uppercase py-4 rounded-xl shadow-lg cursor-pointer border-0"
              >
                Order Now
              </button>
              
              <button
                onClick={() => setIsExitIntentOpen(false)}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold text-xs uppercase py-3 rounded-xl cursor-pointer border-0"
              >
                Continue Shopping
              </button>
            </div>

            {/* Safe check note */}
            <span className="text-[10px] text-neutral-500 font-sans mt-4 flex items-center gap-1 justify-center">
              🔒 256-Bit Secure SSL Order Guarantee
            </span>

          </div>
        </div>
      )}

      {/* 18. PREMIUM ORDER SUCCESS POPUP (Requirement 9) */}
      {confirmedOrder && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#131316] rounded-3xl max-w-lg w-full border border-neutral-800 shadow-2xl relative overflow-hidden flex flex-col">
            
            {/* Success Header banner */}
            <div className="bg-black border-b border-neutral-800/80 text-white px-6 py-8 text-center relative flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-3.5 shadow-lg border-2 border-white animate-pulse">
                <CheckCircle className="w-8 h-8 fill-emerald-500 text-white" />
              </div>
              <h3 className="font-serif text-2xl font-black tracking-wide">🎉 Thank You!</h3>
              <p className="text-sm text-neutral-200 font-bold mt-1.5 font-sans">
                Your order has been received successfully.
              </p>
              <p className="text-xs text-neutral-400 font-sans mt-1 max-w-md">
                Our team will contact you shortly for confirmation via call or WhatsApp.
              </p>
              
              <button
                onClick={() => setConfirmedOrder(null)}
                className="absolute top-4 right-4 p-1 rounded-full bg-neutral-900 text-neutral-400 hover:text-white cursor-pointer border-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Success Details body */}
            <div className="p-6 overflow-y-auto space-y-5">
              
              {/* Shipping progress visual tracker */}
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex flex-col gap-3">
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-black text-center block">
                  Shipping Status Tracker
                </span>
                <div className="flex items-center justify-between text-center relative font-sans text-[10px] pt-1">
                  
                  <div className="absolute top-3 left-[10%] right-[10%] h-[2px] bg-neutral-800 -z-0" />
                  <div className="absolute top-3 left-[10%] w-[25%] h-[2px] bg-emerald-500 -z-0" />

                  <div className="flex flex-col items-center gap-1 relative z-10">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-[10px]">
                      1
                    </span>
                    <span className="font-bold text-white uppercase">Received</span>
                  </div>

                  <div className="flex flex-col items-center gap-1 relative z-10 opacity-40">
                    <span className="w-6 h-6 rounded-full bg-neutral-800 text-neutral-400 font-bold flex items-center justify-center text-[10px]">
                      2
                    </span>
                    <span className="font-bold">Packed</span>
                  </div>

                  <div className="flex flex-col items-center gap-1 relative z-10 opacity-40">
                    <span className="w-6 h-6 rounded-full bg-neutral-800 text-neutral-400 font-bold flex items-center justify-center text-[10px]">
                      3
                    </span>
                    <span className="font-bold">Shipped</span>
                  </div>

                  <div className="flex flex-col items-center gap-1 relative z-10 opacity-40">
                    <span className="w-6 h-6 rounded-full bg-neutral-800 text-neutral-400 font-bold flex items-center justify-center text-[10px]">
                      4
                    </span>
                    <span className="font-bold">Delivery</span>
                  </div>

                </div>
              </div>

              {/* Order Information card */}
              <div className="space-y-3 bg-neutral-950/40 p-4.5 rounded-2xl border border-neutral-850 text-xs sm:text-sm font-sans">
                <div className="flex justify-between border-b border-neutral-850 pb-2">
                  <span className="text-neutral-400">Order ID Code:</span>
                  <span className="font-mono font-bold text-brand-pink">{confirmedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Customer Name:</span>
                  <span className="text-white font-bold">{confirmedOrder.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">WhatsApp / Phone:</span>
                  <span className="text-emerald-400 font-bold">{confirmedOrder.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Destination:</span>
                  <span className="text-white font-semibold">{confirmedOrder.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Amount to Pay (COD):</span>
                  <span className="text-brand-pink-dark font-black">Rs. {confirmedOrder.totalPrice.toLocaleString()}</span>
                </div>
              </div>

            </div>

            {/* Success Actions Footer */}
            <div className="bg-[#0D0D0F] px-6 py-5 flex flex-col gap-2.5 border-t border-neutral-800">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Assalam-o-Alaikum!%20My%20order%20ID%20is%20${confirmedOrder.id}.%20Please%20verify%20and%20dispatch%20it%20on%20priority!`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl text-center shadow-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>💬 Click to Verify via WhatsApp</span>
              </a>
              <button
                onClick={() => setConfirmedOrder(null)}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl cursor-pointer border-0 text-center transition-colors"
              >
                Back to Store
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
