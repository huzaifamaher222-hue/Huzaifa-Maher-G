import React from 'react';
import { Instagram, Heart, MessageCircle, Sparkles } from 'lucide-react';

export const InstagramGallery: React.FC = () => {
  // CONFIGURATION: Easily replaceable placeholder customer images
  const instagramPosts = [
    {
      id: 'ig_1',
      handle: '@sara_styling',
      likes: '1.2k',
      comments: '84',
      imgSrc: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500&auto=format&fit=crop&q=80',
      alt: 'Customer style result with straightener'
    },
    {
      id: 'ig_2',
      handle: '@ayesha_trends',
      likes: '942',
      comments: '46',
      imgSrc: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80',
      alt: 'Beautiful flatlay shot on table'
    },
    {
      id: 'ig_3',
      handle: '@maheen_locks',
      likes: '1.8k',
      comments: '112',
      imgSrc: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&auto=format&fit=crop&q=80',
      alt: 'Sleek hair transformation selfie'
    },
    {
      id: 'ig_4',
      handle: '@zainab_beautypk',
      likes: '715',
      comments: '29',
      imgSrc: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=80',
      alt: 'Holding straightener cosmetic case'
    }
  ];

  return (
    <section id="instagram-gallery" className="py-12 sm:py-20 bg-[#0D0D0F] border-b border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-pink font-semibold flex items-center justify-center gap-1.5">
            <Instagram className="w-4.5 h-4.5 text-brand-pink" />
            Social Lookbook
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2 leading-tight">
            Loved On Instagram
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-2">
            See how gorgeous women across Pakistan style their hair with StarShineWorld. Tag us with <strong className="text-brand-pink">#StarShineWorld</strong> to get featured!
          </p>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* 4-grid layout of placeholders */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {instagramPosts.map((post) => (
            <div 
              key={post.id}
              className="group relative aspect-square rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800/60 shadow-xl cursor-pointer"
            >
              {/* Image element */}
              <img
                src={post.imgSrc}
                alt={post.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                referrerPolicy="no-referrer"
              />

              {/* Tint overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-3 z-10 p-4 text-center select-none">
                <span className="font-sans font-bold text-xs sm:text-sm text-white tracking-wide">
                  {post.handle}
                </span>
                
                {/* Likes/Comments metrics panel */}
                <div className="flex items-center gap-4 text-xs font-semibold text-white mt-1">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-brand-pink text-brand-pink" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                    {post.comments}
                  </span>
                </div>
                
                <span className="text-[9px] uppercase font-bold text-neutral-400 tracking-widest mt-2 border-t border-neutral-800 pt-2 w-16">
                  View Post
                </span>
              </div>

              {/* Instagram mini brand anchor watermark */}
              <div className="absolute bottom-3 right-3 bg-[#0B0B0C]/85 backdrop-blur-md rounded-full w-7 h-7 flex items-center justify-center border border-white/10 group-hover:bg-brand-pink transition-colors z-0">
                <Instagram className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to follow */}
        <div className="text-center mt-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-brand-pink transition-colors"
          >
            <span>Follow our journey @StarShineWorld</span>
            <span className="text-brand-pink">&rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
};
