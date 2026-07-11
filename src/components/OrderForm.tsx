import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Lock, Truck, CreditCard, Sparkles, Check, ChevronDown, ShieldCheck, Box, RefreshCw, Star, AlertCircle, MapPin, MessageCircle } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { PAKISTANI_CITIES } from '../data';
import { Order } from '../types';
import straightenerHero from '../assets/images/straightener_hero_1783762299972.jpg';

interface OrderFormProps {
  onOrderSuccess: (order: Order) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ onOrderSuccess }) => {
  const REGULAR_PRICE = 1699;
  const SALE_PRICE = 1399;
  const SAVINGS = REGULAR_PRICE - SALE_PRICE;

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');

  // GPS Location link states
  const [gpsLink, setGpsLink] = useState('');
  const [isGettingGps, setIsGettingGps] = useState(false);
  const [gpsError, setGpsError] = useState('');

  // Ref for click outside
  const cityContainerRef = useRef<HTMLDivElement>(null);

  // Error states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityContainerRef.current && !cityContainerRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter cities based on search
  const filteredCities = PAKISTANI_CITIES.filter(c =>
    c.toLowerCase().includes(citySearch.toLowerCase())
  );

  const selectCity = (selectedCity: string) => {
    setCity(selectedCity);
    setCitySearch(selectedCity);
    setIsCityDropdownOpen(false);
    if (errors.city) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy.city;
        return copy;
      });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    // 1. Required Name Validation (Requirement 10)
    if (!name.trim()) {
      newErrors.name = 'Full name is required to dispatch your order';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Please enter your full genuine name (at least 3 characters)';
    }
    
    // 2. Strict Phone number validation (Requirement 10)
    // Acceptable formats: 03xxxxxxxxx (11 digits) or 923xxxxxxxxx (12 digits) or +923xxxxxxxxx
    const phoneClean = phone.replace(/[\s\-\+\(\)]/g, '');
    const isPakistaniPhone = /^(03\d{9}|923\d{9})$/.test(phoneClean);

    if (!phone.trim()) {
      newErrors.phone = 'Mobile number is required for courier delivery SMS';
    } else if (!isPakistaniPhone) {
      newErrors.phone = 'Enter a valid 11-digit mobile number starting with 03 (e.g., 03269772249)';
    }

    // 3. City Selection validation (Requirement 10)
    if (!city.trim()) {
      newErrors.city = 'Please choose your city for shipment routing';
    } else if (!PAKISTANI_CITIES.some(c => c.toLowerCase() === city.toLowerCase())) {
      // Allow custom typed city but warn them or require selection
      newErrors.city = 'Please select a valid Pakistani city from our list';
    }

    // 4. Address validation (Requirement 10)
    if (!address.trim()) {
      newErrors.address = 'Please provide your home/shop delivery address';
    } else if (address.trim().length < 10) {
      newErrors.address = 'Address too short! Write complete Street Number, House/Apartment Number & Area';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to first error smoothly
      const firstErrorKey = Object.keys(errors)[0] || 'name';
      const el = document.getElementById(`input-${firstErrorKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    const orderId = 'SSW-' + Math.floor(100000 + Math.random() * 900000);
    const mapsLink = gpsLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ', ' + city)}`;
    
    const newOrder: Order = {
      id: orderId,
      name,
      phone,
      city,
      address,
      quantity,
      totalPrice: SALE_PRICE * quantity,
      status: 'Pending',
      createdAt: new Date().toLocaleString(),
      isWhatsApp: false,
      gpsLink: mapsLink
    };

    try {
      // Save order to Firestore
      await setDoc(doc(db, 'orders', orderId), {
        id: orderId,
        name,
        phone,
        productName: 'Mini Ceramic Hair Straightener',
        totalPrice: SALE_PRICE * quantity,
        address,
        city,
        gpsLink: mapsLink,
        status: 'Pending',
        createdAt: newOrder.createdAt,
        isWhatsApp: false
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `orders/${orderId}`);
    }

    // Store in localStorage for admin tracking
    const existingOrdersStr = localStorage.getItem('starshines_orders');
    const existingOrders: Order[] = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
    localStorage.setItem('starshines_orders', JSON.stringify([newOrder, ...existingOrders]));

    onOrderSuccess(newOrder);
    setIsSubmitting(false);

    // Reset form variables
    setName('');
    setPhone('');
    setCity('');
    setCitySearch('');
    setAddress('');
    setQuantity(1);
    setGpsLink('');
  };

  const handleGetGps = () => {
    if (!navigator.geolocation) {
      setGpsError('GPS is not supported by your browser/device.');
      return;
    }
    setIsGettingGps(true);
    setGpsError('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const link = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setGpsLink(link);
        setIsGettingGps(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setGpsError('Unable to fetch precise location. Please allow GPS access in your browser or type your address manually.');
        setIsGettingGps(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleWhatsAppOrder = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to first error smoothly
      const firstErrorKey = Object.keys(errors)[0] || 'name';
      const el = document.getElementById(`input-${firstErrorKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    const mapsLink = gpsLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ', ' + city)}`;

    const messageText = `New Order Request

Product: Mini Ceramic Hair Straightener
Quantity: ${quantity}
Customer Name: ${name}
Phone: ${phone}
Address: ${address}
City: ${city}
Google Maps Location: ${mapsLink}

Please confirm my order.`;

    const whatsappNumber = '923269772249'; // standard format
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(messageText)}`;

    // Create a new Order in localStorage for admin tracking
    const orderId = 'SSW-WA-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: orderId,
      name,
      phone,
      city,
      address,
      quantity,
      totalPrice: SALE_PRICE * quantity,
      status: 'Pending',
      createdAt: new Date().toLocaleString(),
      isWhatsApp: true,
      gpsLink: mapsLink
    };

    try {
      // Save order to Firestore
      await setDoc(doc(db, 'orders', orderId), {
        id: orderId,
        name,
        phone,
        productName: 'Mini Ceramic Hair Straightener',
        totalPrice: SALE_PRICE * quantity,
        address,
        city,
        gpsLink: mapsLink,
        status: 'Pending',
        createdAt: newOrder.createdAt,
        isWhatsApp: true
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `orders/${orderId}`);
    }

    const existingOrdersStr = localStorage.getItem('starshines_orders');
    const existingOrders: Order[] = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
    localStorage.setItem('starshines_orders', JSON.stringify([newOrder, ...existingOrders]));

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    onOrderSuccess(newOrder);
    setIsSubmitting(false);

    // Reset form variables
    setName('');
    setPhone('');
    setCity('');
    setCitySearch('');
    setAddress('');
    setQuantity(1);
    setGpsLink('');
  };

  return (
    <section id="checkout-section" className="py-12 sm:py-20 bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Shipping Progress Timeline Widget (Requirement 11) */}
        <div className="mb-10 bg-neutral-900 border border-neutral-800 p-6 rounded-3xl shadow-xl max-w-4xl mx-auto">
          <h4 className="text-center font-serif text-xs font-bold text-brand-pink uppercase tracking-widest mb-4">
            Shipping Dispatch Timeline &amp; Live Status
          </h4>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-center relative">
            
            {/* Background Line Connector */}
            <div className="hidden sm:block absolute top-[18px] left-[5%] right-[5%] h-[2px] bg-neutral-800 -z-0" />
            <div className="hidden sm:block absolute top-[18px] left-[5%] w-[15%] h-[2px] bg-brand-pink -z-0 animate-pulse" />

            {/* Step 1: Order Received */}
            <div className="flex flex-col items-center gap-1.5 relative z-10 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-full bg-brand-pink-dark text-white flex items-center justify-center font-bold text-sm shadow-lg border border-brand-pink/30 animate-pulse">
                📦
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wider leading-none">Order Received</span>
              <span className="text-[10px] text-emerald-400 font-medium">Step Active</span>
            </div>

            {/* Step 2: Packed */}
            <div className="flex flex-col items-center gap-1.5 relative z-10 w-full sm:w-auto opacity-55">
              <div className="w-10 h-10 rounded-full bg-neutral-950 text-neutral-400 flex items-center justify-center font-bold text-sm shadow-md border border-neutral-800">
                📦
              </div>
              <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider leading-none">Packed</span>
              <span className="text-[9px] text-neutral-500 font-sans">Pending Review</span>
            </div>

            {/* Step 3: Shipped */}
            <div className="flex flex-col items-center gap-1.5 relative z-10 w-full sm:w-auto opacity-55">
              <div className="w-10 h-10 rounded-full bg-neutral-950 text-neutral-400 flex items-center justify-center font-bold text-sm shadow-md border border-neutral-800">
                🚚
              </div>
              <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider leading-none">Shipped</span>
              <span className="text-[9px] text-neutral-500 font-sans">Wait Confirm</span>
            </div>

            {/* Step 4: Out For Delivery */}
            <div className="flex flex-col items-center gap-1.5 relative z-10 w-full sm:w-auto opacity-55">
              <div className="w-10 h-10 rounded-full bg-neutral-950 text-neutral-400 flex items-center justify-center font-bold text-sm shadow-md border border-neutral-800">
                🏍
              </div>
              <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider leading-none">Out For Delivery</span>
              <span className="text-[9px] text-neutral-500 font-sans">Rider Assigned</span>
            </div>

            {/* Step 5: Delivered */}
            <div className="flex flex-col items-center gap-1.5 relative z-10 w-full sm:w-auto opacity-55">
              <div className="w-10 h-10 rounded-full bg-neutral-950 text-neutral-400 flex items-center justify-center font-bold text-sm shadow-md border border-neutral-800">
                🏠
              </div>
              <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider leading-none">Delivered</span>
              <span className="text-[9px] text-neutral-500 font-sans">Complete</span>
            </div>

          </div>
        </div>

        {/* Checkout Main Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">
          
          {/* LEFT COLUMN: Shipping Form Input fields */}
          <div className="lg:col-span-7 bg-[#131316] border border-neutral-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
            
            {/* Security SSL Header label */}
            <div className="flex justify-between items-center border-b border-neutral-800 pb-4 mb-6">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                  Complete Shipping Address
                </h3>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">
                  Confirm your order details below to arrange delivery
                </p>
              </div>
              <div className="flex items-center gap-1 bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 rounded-full py-1 px-3 text-[10px] font-bold shrink-0">
                <Lock className="w-3.5 h-3.5" />
                <span>SECURE CHECKOUT</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1.5 font-sans">
                  Full Name <span className="text-brand-pink">*</span>
                </label>
                <input
                  id="input-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                  }}
                  placeholder="e.g., Ayesha Khan"
                  className={`w-full bg-neutral-950 border rounded-xl py-3 px-4 text-sm text-white font-sans transition-all focus:outline-none focus:ring-1 ${
                    errors.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                      : 'border-neutral-800 focus:border-brand-pink focus:ring-brand-pink/10'
                  }`}
                />
                {errors.name && (
                  <span className="text-[11px] text-red-500 mt-1 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.name}</span>
                  </span>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1.5 font-sans">
                  WhatsApp / Phone Number <span className="text-brand-pink">*</span>
                </label>
                <input
                  id="input-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                  }}
                  placeholder="e.g., 03269772249"
                  className={`w-full bg-neutral-950 border rounded-xl py-3 px-4 text-sm text-white font-sans transition-all focus:outline-none focus:ring-1 ${
                    errors.phone
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                      : 'border-neutral-800 focus:border-brand-pink focus:ring-brand-pink/10'
                  }`}
                />
                <span className="text-[10px] text-neutral-500 mt-1 font-sans">
                  Make sure phone is turned on. Our shipping officer will call/WhatsApp you before dispatch.
                </span>
                {errors.phone && (
                  <span className="text-[11px] text-red-500 mt-1 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.phone}</span>
                  </span>
                )}
              </div>

              {/* Searchable City Selector */}
              <div ref={cityContainerRef} className="flex flex-col relative">
                <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1.5 font-sans">
                  Select Delivery City <span className="text-brand-pink">*</span>
                </label>
                <div className="relative">
                  <input
                    id="input-city"
                    type="text"
                    value={citySearch}
                    onChange={(e) => {
                      setCitySearch(e.target.value);
                      setCity(e.target.value);
                      setIsCityDropdownOpen(true);
                      if (errors.city) setErrors(prev => ({ ...prev, city: '' }));
                    }}
                    onFocus={() => setIsCityDropdownOpen(true)}
                    placeholder="Search your city (e.g. Lahore, Karachi, Islamabad)"
                    className={`w-full bg-neutral-950 border rounded-xl py-3 px-4 text-sm text-white font-sans transition-all focus:outline-none focus:ring-1 pr-10 ${
                      errors.city
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                        : 'border-neutral-800 focus:border-brand-pink focus:ring-brand-pink/10'
                    }`}
                  />
                  <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-neutral-500 pointer-events-none" />
                </div>

                {isCityDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 max-h-48 bg-[#131316] border border-neutral-800 rounded-xl overflow-y-auto shadow-2xl z-30 divide-y divide-neutral-900">
                    {filteredCities.length > 0 ? (
                      filteredCities.map((cityName, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => selectCity(cityName)}
                          className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-neutral-300 hover:bg-brand-pink-dark/20 hover:text-white font-sans transition-colors cursor-pointer"
                        >
                          {cityName}
                        </button>
                      ))
                    ) : (
                      <div className="p-3 text-xs text-neutral-400 font-sans italic">
                        No matches found. Select a real city for parcel routing.
                      </div>
                    )}
                  </div>
                )}
                {errors.city && (
                  <span className="text-[11px] text-red-500 mt-1 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.city}</span>
                  </span>
                )}
              </div>

              {/* Complete Address */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1.5 font-sans">
                  Complete Street &amp; House Address <span className="text-brand-pink">*</span>
                </label>
                <textarea
                  id="input-address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address) setErrors(prev => ({ ...prev, address: '' }));
                  }}
                  rows={3}
                  placeholder="House/Shop Number, Street Number, Area/Sector Name, Near Landmark"
                  className={`w-full bg-neutral-950 border rounded-xl py-3 px-4 text-sm text-white font-sans transition-all focus:outline-none focus:ring-1 resize-none ${
                    errors.address
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                      : 'border-neutral-800 focus:border-brand-pink focus:ring-brand-pink/10'
                  }`}
                />
                {errors.address && (
                  <span className="text-[11px] text-red-500 mt-1 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.address}</span>
                  </span>
                )}
                
                {/* GPS Pin Attachment Button */}
                <div className="mt-2.5 flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={handleGetGps}
                    disabled={isGettingGps}
                    className="self-start inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-sans text-xs font-bold py-2 px-3.5 rounded-xl border border-neutral-800 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    <MapPin className="w-3.5 h-3.5 text-brand-pink" />
                    <span>{isGettingGps ? 'Fetching GPS...' : '📍 Click to Attach Live GPS Location (Recommended)'}</span>
                  </button>
                  {gpsLink && (
                    <span className="text-[11px] text-emerald-400 font-sans font-bold flex items-center gap-1.5 bg-emerald-950/20 px-3 py-1.5 rounded-lg border border-emerald-900/30 self-start animate-fade-in">
                      <Check className="w-3.5 h-3.5" />
                      GPS Location Linked Successfully! It will be included in your WhatsApp request.
                    </span>
                  )}
                  {gpsError && (
                    <span className="text-[11px] text-amber-500 font-sans font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{gpsError}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Cash On Delivery Assurance Pill */}
              <div className="p-4 bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-neutral-300 font-sans">
                  <span className="font-bold text-white">Payment Method: Cash On Delivery (COD)</span>
                  <p className="mt-0.5 text-neutral-400">Zero risk! Pay courier boy in cash only when you receive your straightener box safely at your doorstep.</p>
                </div>
              </div>

              {/* Order Button Grid/Stack */}
              <div className="flex flex-col gap-3.5 mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-brand-pink-dark to-[#b81d5f] hover:brightness-110 disabled:bg-neutral-800 text-white font-bold text-sm sm:text-base tracking-widest uppercase py-4 rounded-xl shadow-lg transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer border-0"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Booking Your Shipment...</span>
                    </div>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>🛒 Book Order Now (Rs. {(SALE_PRICE * quantity).toLocaleString()})</span>
                    </>
                  )}
                </button>

                {/* WhatsApp Order Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 disabled:bg-neutral-800 text-white font-bold text-sm sm:text-base tracking-widest uppercase py-4 rounded-xl shadow-lg transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer border-0"
                >
                  <MessageCircle className="w-5 h-5 fill-white/10" />
                  <span>💬 Order on WhatsApp</span>
                </button>
              </div>

              {/* Payment Partners & Courier Logos (Requirement 5) */}
              <div className="mt-6 pt-5 border-t border-neutral-800">
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest block text-center font-bold mb-3">
                  Our Logistics &amp; COD Partners
                </span>
                
                {/* 6 logos grid */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-[10px] font-sans font-black tracking-wide text-neutral-400">
                  <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-900 hover:border-neutral-800 hover:text-white transition-all flex flex-col justify-center items-center">
                    <span className="text-emerald-400 font-serif leading-none">COD</span>
                    <span className="text-[8px] text-neutral-500 font-bold mt-1">Cash On Delivery</span>
                  </div>
                  <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-900 hover:border-neutral-800 hover:text-white transition-all flex flex-col justify-center items-center">
                    <span className="text-brand-pink font-serif leading-none">Leopard</span>
                    <span className="text-[8px] text-neutral-500 font-bold mt-1">Express Cargo</span>
                  </div>
                  <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-900 hover:border-neutral-800 hover:text-white transition-all flex flex-col justify-center items-center">
                    <span className="text-amber-500 font-serif leading-none">PostEx</span>
                    <span className="text-[8px] text-neutral-500 font-bold mt-1">Fast Delivery</span>
                  </div>
                  <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-900 hover:border-neutral-800 hover:text-white transition-all flex flex-col justify-center items-center">
                    <span className="text-blue-400 font-serif leading-none">Easyship</span>
                    <span className="text-[8px] text-neutral-500 font-bold mt-1">Real-time SMS</span>
                  </div>
                  <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-900 hover:border-neutral-800 hover:text-white transition-all flex flex-col justify-center items-center">
                    <span className="text-purple-400 font-serif leading-none">Trax</span>
                    <span className="text-[8px] text-neutral-500 font-bold mt-1">Logistics Core</span>
                  </div>
                  <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-900 hover:border-neutral-800 hover:text-white transition-all flex flex-col justify-center items-center">
                    <span className="text-teal-400 font-serif leading-none">Dex</span>
                    <span className="text-[8px] text-neutral-500 font-bold mt-1">Home Dispatch</span>
                  </div>
                </div>
              </div>

            </form>
          </div>

          {/* RIGHT COLUMN: Order Summary Box */}
          <div className="lg:col-span-5 bg-[#131316] rounded-3xl p-6 sm:p-8 border border-neutral-800 flex flex-col gap-6 sticky top-24 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-white tracking-wide pb-3 border-b border-neutral-800">
              Your Order Summary
            </h3>

            {/* Product Card Row */}
            <div className="flex gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shrink-0">
                <img
                  src={straightenerHero}
                  alt="Mini Ceramic Straightener"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-sm sm:text-base font-bold text-white tracking-wide leading-tight">
                    Mini Ceramic Hair Straightener
                  </h4>
                  <span className="text-[11px] text-neutral-400 font-sans mt-1 inline-block">
                    Elegant Pink &amp; Gold Ceramic Coated
                  </span>
                </div>

                {/* Quantity Adjuster Input (Requirement 10) */}
                <div className="flex items-center gap-2.5 mt-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-xs font-bold text-white hover:bg-neutral-900 active:scale-90 select-none cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-sans font-bold text-sm text-white min-w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-7 h-7 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-xs font-bold text-white hover:bg-neutral-900 active:scale-90 select-none cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Pricing details presentation details */}
            <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex flex-col gap-3 shadow-2xs">
              <div className="flex justify-between items-center text-xs text-neutral-400">
                <span className="font-sans uppercase tracking-wider font-bold text-[10px]">Original Value:</span>
                <span className="font-sans font-semibold line-through text-neutral-500 text-sm">
                  Rs. {(REGULAR_PRICE * quantity).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-serif text-xs font-bold text-white tracking-wider uppercase">
                  Today's Price:
                </span>
                <span className="font-serif text-xl sm:text-2xl font-black text-brand-pink">
                  Rs. {(SALE_PRICE * quantity).toLocaleString()}
                </span>
              </div>

              <div className="h-px bg-neutral-800 border-t border-dashed my-1" />

              <div className="flex justify-between items-center">
                <span className="font-sans text-xs font-bold text-emerald-400 uppercase tracking-wide">
                  Your Immediate Savings:
                </span>
                <span className="bg-emerald-950/40 text-emerald-400 font-sans text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-900/30 flex items-center gap-1 shrink-0 animate-pulse">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  Save Rs. {(SAVINGS * quantity).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Subtotal cost breakdowns */}
            <div className="space-y-2.5 text-xs text-neutral-400 px-1 font-sans">
              <div className="flex justify-between">
                <span>Items Subtotal ({quantity})</span>
                <span className="text-neutral-200">Rs. {(SALE_PRICE * quantity).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-emerald-400 font-bold">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  Delivery &amp; Handling
                </span>
                <span className="uppercase text-[9px] tracking-wider bg-emerald-950/40 text-emerald-400 px-2 py-0.5 rounded-sm border border-emerald-900/20">
                  FREE
                </span>
              </div>
              <div className="h-px bg-neutral-800 my-2" />
              <div className="flex justify-between text-sm font-black text-white font-serif uppercase tracking-wider">
                <span>Total Amount to Pay</span>
                <span className="text-brand-pink">Rs. {(SALE_PRICE * quantity).toLocaleString()}</span>
              </div>
            </div>

            {/* Security Badges (Requirement 6) */}
            <div className="p-4 bg-neutral-950 border border-neutral-900 rounded-2xl flex flex-col gap-2.5">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-black text-center mb-1 block">
                StarShineWorld Trust Seals
              </span>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-sans font-bold text-neutral-300">
                <div className="flex items-center gap-1.5 p-1 bg-neutral-900/40 rounded-lg">
                  <span className="text-xs text-emerald-400">🔒</span>
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-1.5 p-1 bg-neutral-900/40 rounded-lg">
                  <span className="text-xs text-amber-500">🛡</span>
                  <span>Safe Packaging</span>
                </div>
                <div className="flex items-center gap-1.5 p-1 bg-neutral-900/40 rounded-lg">
                  <span className="text-xs text-blue-400">🚚</span>
                  <span>Fast Shipping</span>
                </div>
                <div className="flex items-center gap-1.5 p-1 bg-neutral-900/40 rounded-lg">
                  <span className="text-xs text-brand-pink">✔</span>
                  <span>Trusted Pakistani Store</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-1.5 bg-brand-pink-dark/10 rounded-lg text-[10px] font-sans font-black text-white uppercase tracking-widest border border-brand-pink/20 mt-1">
                <span className="text-xs">⭐</span>
                <span>Premium Quality Guaranteed</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
