import React, { useState, useRef } from 'react';
import { ZoomIn, Sparkles, Play, X, ChevronLeft, ChevronRight, Maximize2, Shield, Flame, Percent } from 'lucide-react';

export const ProductGallery: React.FC = () => {
  // CONFIGURATION: These are the main product image/video assets.
  // Anyone can easily change these URLs later.
  const galleryAssets = [
    {
      id: 'asset_1',
      type: 'image',
      src: '/src/assets/images/straightener_hero_1783762299972.jpg',
      alt: 'StarShineWorld Mini Ceramic Hair Straightener Premium Flat Lay Shot',
      badge: 'Best Seller',
      badgeColor: 'from-brand-pink-dark to-pink-600',
      label: 'Ceramic Plates'
    },
    {
      id: 'asset_2',
      type: 'image',
      src: '/src/assets/images/straightener_lifestyle_1783762325020.jpg',
      alt: 'Mini Ceramic Hair Straightener comfortably fitting inside velvet cosmetic travel pouch',
      badge: 'Premium Quality',
      badgeColor: 'from-amber-600 to-brand-gold',
      label: 'New Arrival'
    },
    {
      id: 'asset_3',
      type: 'image',
      src: '/src/assets/images/straightener_plates_1783762344315.jpg',
      alt: 'Sleek macro shot of smooth golden tourmaline ceramic heating plates',
      badge: 'Fast Heating',
      badgeColor: 'from-emerald-600 to-teal-500',
      label: 'Fast Heating'
    },
    {
      id: 'asset_4',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
      alt: 'Gorgeous hair styling results with StarShineWorld straightener',
      badge: 'New Arrival',
      badgeColor: 'from-purple-600 to-indigo-500',
      label: 'Premium Quality'
    },
    {
      id: 'asset_5',
      type: 'video',
      // High-converting style demonstration looping video placeholder
      src: 'https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-brushing-her-hair-40192-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80',
      alt: 'StarShineWorld Straightener How-to-Style Video Guide',
      badge: 'Video Guide',
      badgeColor: 'from-red-600 to-rose-500',
      label: 'Ceramic Plates'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: 'none' });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  // Touch coordinates for mobile swipe detection
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Desktop hover zoom function
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (galleryAssets[activeIndex].type === 'video') return; // No zoom for video
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${galleryAssets[activeIndex].src})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '240%'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  // Lightbox Navigation
  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? galleryAssets.length - 1 : prev - 1));
    setIsVideoPlaying(false);
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === galleryAssets.length - 1 ? 0 : prev + 1));
    setIsVideoPlaying(false);
  };

  // Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // min distance required to swipe
    
    if (diff > threshold) {
      // Swipe left, go to next
      handleNext();
    } else if (diff < -threshold) {
      // Swipe right, go to prev
      handlePrev();
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentAsset = galleryAssets[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      
      {/* 1. Main Display Window */}
      <div 
        id="main-product-gallery"
        className="relative aspect-square sm:aspect-[4/3] md:aspect-square bg-[#131316] rounded-3xl overflow-hidden border border-neutral-800/80 group select-none cursor-pointer"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {currentAsset.type === 'image' ? (
          <div 
            className="w-full h-full relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsLightboxOpen(true)}
          >
            <img
              src={currentAsset.src}
              alt={currentAsset.alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-10"
            />
            {/* Magnifier glass overlay shown on hover */}
            <div
              className="absolute inset-0 pointer-events-none hidden md:group-hover:block transition-all duration-150 shadow-inner bg-no-repeat"
              style={zoomStyle}
            />
          </div>
        ) : (
          <div className="w-full h-full relative flex items-center justify-center bg-black">
            {isVideoPlaying ? (
              <video
                src={currentAsset.src}
                className="w-full h-full object-cover"
                controls
                autoPlay
                loop
                playsInline
              />
            ) : (
              <div 
                className="w-full h-full relative cursor-pointer group/vid"
                onClick={() => setIsVideoPlaying(true)}
              >
                <img
                  src={currentAsset.thumbnail}
                  alt={currentAsset.alt}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-brand-pink-dark text-white flex items-center justify-center shadow-2xl border border-white/20 transform group-hover/vid:scale-110 transition-transform duration-300">
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">
                  Watch Styling Demo Video
                </div>
              </div>
            )}
          </div>
        )}

        {/* Floating Badges & Labels on Main Display (Requirement 2) */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-10">
          {/* Active Asset Dynamic Badge */}
          <div className={`bg-gradient-to-r ${currentAsset.badgeColor} text-white font-serif font-black text-[10px] sm:text-xs tracking-wider uppercase px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/10 animate-pulse`}>
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-white" />
            <span>{currentAsset.badge}</span>
          </div>
          
          {/* Label specifications (Requirement 2 labels overlayed) */}
          <div className="flex flex-wrap gap-1">
            <span className="bg-neutral-950/80 backdrop-blur-md text-neutral-300 text-[9px] font-bold uppercase px-2 py-1 rounded-md border border-neutral-800">
              {currentAsset.label}
            </span>
            <span className="bg-neutral-950/80 backdrop-blur-md text-brand-gold text-[9px] font-bold uppercase px-2 py-1 rounded-md border border-brand-gold/20">
              Trusted Store
            </span>
          </div>
        </div>

        {/* Main image labels overlay helper */}
        <div className="absolute top-4 right-4 flex flex-col gap-1.5 pointer-events-none">
          <span className="bg-neutral-900/95 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded-md border border-neutral-800 font-sans font-black uppercase tracking-wider">
            Premium Quality
          </span>
          <span className="bg-brand-pink-dark/95 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded-md font-sans font-black uppercase tracking-wider">
            Best Seller
          </span>
        </div>

        {/* Hover/Swipe UI guide */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
          <div className="bg-neutral-950/80 backdrop-blur-md text-white rounded-full px-3 py-1 text-[10px] tracking-wider uppercase font-medium border border-neutral-800/80 flex items-center gap-1">
            <ZoomIn className="w-3 h-3 text-brand-pink" />
            <span className="hidden md:inline">Hover to Zoom / Click to Expand</span>
            <span className="md:hidden">Swipe to Browse</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="w-8 h-8 rounded-full bg-neutral-950/80 backdrop-blur-md hover:bg-neutral-900 border border-neutral-800/80 text-white flex items-center justify-center cursor-pointer pointer-events-auto transition-all"
          >
            <Maximize2 className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Left/Right Mobile Navigation Buttons */}
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-950/80 border border-neutral-800/80 flex items-center justify-center text-white cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-950/80 border border-neutral-800/80 flex items-center justify-center text-white cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Thumbnail strip row with easy asset pointers */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {galleryAssets.map((asset, idx) => (
          <button
            key={asset.id}
            id={`gallery-thumb-${idx}`}
            onClick={() => { setActiveIndex(idx); setIsVideoPlaying(false); }}
            className={`relative aspect-square rounded-2xl overflow-hidden bg-neutral-950 border-2 transition-all duration-300 focus:outline-none cursor-pointer ${
              activeIndex === idx
                ? 'border-brand-pink scale-[1.03] shadow-lg shadow-brand-pink/10'
                : 'border-neutral-800 opacity-60 hover:opacity-100'
            }`}
          >
            {asset.type === 'image' ? (
              <img
                src={asset.src}
                alt={asset.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full relative">
                <img
                  src={asset.thumbnail}
                  alt={asset.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-brand-pink-dark/20 flex items-center justify-center">
                  <Play className="w-5 h-5 text-white fill-white" />
                </div>
              </div>
            )}
            
            {activeIndex === idx && (
              <div className="absolute inset-0 bg-brand-pink/10 border-2 border-brand-pink/30 rounded-2xl" />
            )}
          </button>
        ))}
      </div>

      {/* 3. Image Labels Banner (Requirement 2 list underneath) */}
      <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-3 grid grid-cols-5 gap-1 text-center font-sans">
        <div className="flex flex-col items-center justify-center gap-1 border-r border-neutral-900 last:border-0 py-1">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-tight block">Premium Quality</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 border-r border-neutral-900 last:border-0 py-1">
          <Shield className="w-3.5 h-3.5 text-brand-pink" />
          <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-tight block">Best Seller</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 border-r border-neutral-900 last:border-0 py-1">
          <Maximize2 className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-tight block">New Arrival</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 border-r border-neutral-900 last:border-0 py-1">
          <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-tight block">Fast Heating</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 py-1">
          <Percent className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-tight block">Ceramic Plates</span>
        </div>
      </div>

      {/* 4. Full Screen Lightbox Gallery Overlay Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md select-none">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white z-50 border border-neutral-800 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/60 hover:bg-neutral-900 hover:text-brand-pink text-white border border-neutral-800/80 cursor-pointer transition-colors z-40"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Main Lightbox Content Area */}
          <div className="max-w-4xl w-full max-h-[80vh] flex flex-col items-center justify-center">
            {currentAsset.type === 'image' ? (
              <img
                src={currentAsset.src}
                alt={currentAsset.alt}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl border border-neutral-800/50"
              />
            ) : (
              <div className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden bg-black border border-neutral-800 flex items-center justify-center">
                <video
                  src={currentAsset.src}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  loop
                />
              </div>
            )}
            
            <p className="text-xs text-neutral-400 font-sans text-center mt-4 max-w-xl">
              {currentAsset.alt}
            </p>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/60 hover:bg-neutral-900 hover:text-brand-pink text-white border border-neutral-800/80 cursor-pointer transition-colors z-40"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Footer dots info */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-neutral-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-800/80">
            {galleryAssets.map((_, index) => (
              <button
                key={index}
                onClick={() => { setActiveIndex(index); setIsVideoPlaying(false); }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-brand-pink w-6' : 'bg-neutral-700'
                }`}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
