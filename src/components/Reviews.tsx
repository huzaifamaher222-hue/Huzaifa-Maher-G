import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageCircle, Sparkles } from 'lucide-react';
import { Review } from '../types';

export const Reviews: React.FC = () => {
  // Enhanced static reviews dataset with custom before/after transformation indicators
  const initialReviews: (Review & {
    beforeAfter?: { before: string; after: string };
    helpfulCount: number;
    userLiked?: boolean;
  })[] = [
    {
      id: 'rev_1',
      author: 'Ayesha Khan',
      rating: 5,
      text: 'An absolute lifesaver! I bought this mini straightener for my office touch-ups and it is perfect. It heats up so fast and makes my hair smooth instantly. The packaging was so premium too. Highly recommend StarShineWorld!',
      date: 'July 8, 2026',
      verified: true,
      location: 'Karachi, Sindh',
      likes: 18,
      helpfulCount: 18,
      avatarColor: 'bg-rose-950 text-rose-300 border-rose-800/50',
      reply: 'Thank you Ayesha! We are thrilled to hear that it is your absolute lifesaver. Keep shining!',
      beforeAfter: {
        before: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&auto=format&fit=crop&q=80', // Frizzy hair placeholder
        after: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&auto=format&fit=crop&q=80'  // Smooth hair placeholder
      }
    },
    {
      id: 'rev_2',
      author: 'Zainab Ahmed',
      rating: 5,
      text: 'Perfect for styling my bangs! Normal straighteners are too bulky and always burn my forehead. This mini size is incredibly easy to control. COD was super fast, received in Lahore within 2 days.',
      date: 'July 5, 2026',
      verified: true,
      location: 'Lahore, Punjab',
      likes: 12,
      helpfulCount: 12,
      avatarColor: 'bg-amber-950 text-amber-300 border-amber-800/50',
      reply: 'So glad it helps with your bangs, Zainab! Safety and comfort are our top priorities.',
      beforeAfter: {
        before: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80', // Messy hair placeholder
        after: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop&q=80'  // Polished hair placeholder
      }
    },
    {
      id: 'rev_3',
      author: 'Mahnoor Malik',
      rating: 5,
      text: 'Compact, cute, and works amazingly well! I was skeptical because of the low price but the quality is genuinely premium. Smooth plates do not tug or pull hair. Perfect for travel.',
      date: 'June 29, 2026',
      verified: true,
      location: 'Islamabad, ICT',
      likes: 9,
      helpfulCount: 9,
      avatarColor: 'bg-teal-950 text-teal-300 border-teal-800/50'
    },
    {
      id: 'rev_4',
      author: 'Sania Yousaf',
      rating: 5,
      text: 'Mera hair straightener kal mila and I tried it today. Heat constant rehti hai and hair shiny hojatay hain instantly. Delivery boy was also very polite. Free delivery and Cash on Delivery option is best.',
      date: 'June 24, 2026',
      verified: true,
      location: 'Peshawar, KPK',
      likes: 15,
      helpfulCount: 15,
      avatarColor: 'bg-pink-950 text-pink-300 border-pink-800/50',
      reply: 'Thank you for your lovely feedback, Sania! Enjoy your salon-like styling at home!'
    }
  ];

  const [reviewsList, setReviewsList] = useState(initialReviews);

  const handleHelpfulClick = (id: string) => {
    setReviewsList(prev =>
      prev.map(rev => {
        if (rev.id === id) {
          const liked = !rev.userLiked;
          return {
            ...rev,
            userLiked: liked,
            helpfulCount: liked ? rev.helpfulCount + 1 : rev.helpfulCount - 1
          };
        }
        return rev;
      })
    );
  };

  return (
    <section id="reviews-section" className="py-12 sm:py-20 bg-[#0D0D0F] border-t border-b border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-pink font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-4.5 h-4.5 text-brand-gold animate-pulse" />
            Customer Transformations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2 leading-tight">
            Real Women. Real Results.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-2">
            Read certified buyer reviews and view gorgeous straightening results from across Pakistan.
          </p>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Aggregate Customer Sentiment Panel */}
        <div className="bg-neutral-900 border border-neutral-800/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-around gap-6 text-center md:text-left mb-12 shadow-xl">
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-serif font-black text-white">
              4.9
            </span>
            <div className="flex items-center gap-0.5 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
              ))}
            </div>
            <span className="text-xs text-neutral-400 font-sans font-medium mt-1">
              Based on 324 Verified Ratings
            </span>
          </div>

          <div className="h-px w-full md:w-px md:h-16 bg-neutral-800" />

          {/* Social Proof Statistics */}
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <span className="block text-xl sm:text-2xl font-bold text-white">98%</span>
              <span className="text-[11px] text-neutral-400 font-sans">Would Recommend</span>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-bold text-white">30s</span>
              <span className="text-[11px] text-neutral-400 font-sans">Average Style Time</span>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-bold text-white">100%</span>
              <span className="text-[11px] text-neutral-400 font-sans">Genuine Ceramic</span>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {reviewsList.map((review) => {
            return (
              <div
                key={review.id}
                className="bg-neutral-900/90 p-6 sm:p-8 rounded-3xl border border-neutral-800/80 shadow-2xl hover:border-brand-pink/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header Card */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-serif font-black ${review.avatarColor}`}>
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <h4 className="font-sans font-bold text-sm text-white">
                            {review.author}
                          </h4>
                          {review.verified && (
                            <span className="inline-flex items-center gap-0.5 text-emerald-400 bg-emerald-950/40 rounded-full px-2 py-0.5 text-[9px] font-extrabold border border-emerald-900/30">
                              <CheckCircle className="w-2.5 h-2.5 fill-emerald-500 text-emerald-950" />
                              <span>Verified Buyer</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-neutral-400 font-sans">
                          {review.location} &bull; {review.date}
                        </span>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating
                              ? 'fill-brand-gold text-brand-gold'
                              : 'text-neutral-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans italic mb-4">
                    "{review.text}"
                  </p>

                  {/* Side-by-Side Before/After Photo Placeholder (Requirement 15) */}
                  {review.beforeAfter && (
                    <div className="grid grid-cols-2 gap-3 mb-4 rounded-2xl overflow-hidden border border-neutral-800 p-2 bg-neutral-950">
                      {/* Before Frame */}
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <img
                          src={review.beforeAfter.before}
                          alt="Hair styling before"
                          className="w-full h-full object-cover grayscale opacity-70"
                        />
                        <div className="absolute bottom-2 left-2 bg-black/85 backdrop-blur-md rounded-md px-1.5 py-0.5 text-[9px] font-bold text-neutral-300 uppercase tracking-widest">
                          Before
                        </div>
                      </div>

                      {/* After Frame */}
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <img
                          src={review.beforeAfter.after}
                          alt="Hair styling after result"
                          className="w-full h-full object-cover border-l border-neutral-800"
                        />
                        <div className="absolute bottom-2 left-2 bg-brand-pink-dark/90 backdrop-blur-md rounded-md px-1.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-widest border border-brand-pink/30">
                          After (Sleek)
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Brand Reply */}
                  {review.reply && (
                    <div className="p-3.5 bg-brand-pink-dark/10 border-l-2 border-brand-pink rounded-r-2xl text-xs text-neutral-300 flex gap-2 items-start mb-2">
                      <MessageCircle className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                      <div>
                        <span className="font-serif font-bold text-white block mb-0.5">
                          StarShineWorld Support
                        </span>
                        <p className="font-sans leading-relaxed text-[11px] text-neutral-400">
                          {review.reply}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Helpful Like Counter (Requirement 15) */}
                <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-[10px] text-neutral-500 font-sans">
                    Was this customer review helpful to you?
                  </span>
                  <button
                    onClick={() => handleHelpfulClick(review.id)}
                    className={`flex items-center gap-1.5 text-xs font-bold py-1.5 px-3.5 rounded-full border transition-all duration-300 cursor-pointer ${
                      review.userLiked
                        ? 'bg-brand-pink text-white border-transparent scale-95 shadow-lg shadow-brand-pink/20'
                        : 'bg-neutral-950 hover:bg-neutral-900 text-neutral-300 border-neutral-800'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${review.userLiked ? 'fill-white text-white' : ''}`} />
                    <span>Helpful ({review.helpfulCount})</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
