import React, { useState } from 'react';
import { PRIMARY_INDIAN_REVIEWS } from '../../data/testimonialsData';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const AVATAR_COLOR_MAP = {
  purple: 'bg-[#EDE9FE] text-[#7C3AED] border border-[#DDD6FE] dark:bg-[#2E1065]/70 dark:text-[#C4B5FD] dark:border-[#5B21B6]/50',
  blue: 'bg-[#DBEAFE] text-[#2563EB] border border-[#BFDBFE] dark:bg-[#172554]/70 dark:text-[#93C5FD] dark:border-[#1E40AF]/50',
  green: 'bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0] dark:bg-[#052E16]/70 dark:text-[#86EFAC] dark:border-[#166534]/50',
  amber: 'bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] dark:bg-[#451A03]/70 dark:text-[#FCD34D] dark:border-[#92400E]/50',
  rose: 'bg-[#FFE4E6] text-[#E11D48] border border-[#FECDD3] dark:bg-[#4C0519]/70 dark:text-[#FDA4AF] dark:border-[#9F1239]/50',
  taupe: 'bg-[#EDE7DD] text-[#5C5046] border border-[#DDD4C7] dark:bg-white/10 dark:text-[#D5C9BD] dark:border-white/20'
};

export default function TestimonialsSection() {
  const reviews = PRIMARY_INDIAN_REVIEWS;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Maximum starting index for 3 cards per view on large screens
  const maxIndex = Math.max(0, reviews.length - 3);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Slice 3 visible reviews starting at currentIndex
  const visibleReviews = [
    reviews[currentIndex % reviews.length],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length]
  ];

  return (
    <section id="reviews" className="py-20 sm:py-24 bg-[#F7F4EE]/60 dark:bg-darkbg-base border-t border-b border-[#D6CCC2]/60 dark:border-white/10 transition-colors relative overflow-hidden">
      {/* Ambient Silk & Taupe Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D8C8B4]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#B29F8D]/15 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header - Ivory & Taupe Silk Theme */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow Label */}
          <div className="text-[#827060] dark:text-[#C7B9A4] text-xs sm:text-sm font-bold uppercase tracking-[0.22em] mb-2">
            TESTIMONIALS
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#26211E] dark:text-white tracking-tight leading-tight font-display">
            What Our Clients Say About Us
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-espresso-700/80 dark:text-cream-200/80 mt-2 font-normal max-w-xl mx-auto">
            Connecting businesses with exponential digital growth.
          </p>

          {/* Warm Champagne Taupe Accent Line */}
          <div className="w-14 h-1 bg-[#B29F8D] dark:bg-[#B29F8D] rounded-full mx-auto mt-3.5 mb-12 sm:mb-14" />
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous testimonials"
            className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white dark:bg-[#231F1C] shadow-[0_4px_20px_rgba(38,33,30,0.12)] border border-[#D6CCC2] dark:border-white/10 items-center justify-center text-[#26211E] dark:text-white hover:text-[#827060] dark:hover:text-[#D8C8B4] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* 3 Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {visibleReviews.map((rev, idx) => (
              <div
                key={`${rev.id}-${idx}`}
                className="bg-white dark:bg-[#1C1815] rounded-3xl p-7 sm:p-8 border border-[#D6CCC2]/70 dark:border-white/10 shadow-[0_4px_25px_rgba(38,33,30,0.04)] hover:shadow-[0_12px_35px_rgba(38,33,30,0.08)] hover:border-[#B29F8D] transition-all flex flex-col justify-between min-h-[300px] group"
              >
                {/* Top Quote Icon - Champagne Taupe Double Quotes */}
                <div>
                  <div className="text-[#D8C8B4] dark:text-[#B29F8D]/60 select-none">
                    <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Review Text */}
                  <p className="text-espresso-800 dark:text-cream-200/90 text-sm sm:text-[14px] leading-relaxed my-5 font-normal">
                    {rev.review}
                  </p>
                </div>

                {/* Author Block Footer - NO IMAGE, Letter Avatar Circle & ONLY NAME */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-[#D6CCC2]/60 dark:border-white/5">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-base shrink-0 select-none shadow-xs ${AVATAR_COLOR_MAP[rev.color] || AVATAR_COLOR_MAP.purple}`}>
                    {rev.initial || rev.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[#26211E] dark:text-white text-sm sm:text-base tracking-tight truncate">
                      {rev.name}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Next Arrow Button on Right Edge */}
          <button
            onClick={handleNext}
            aria-label="Next testimonials"
            className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white dark:bg-[#231F1C] shadow-[0_4px_20px_rgba(38,33,30,0.12)] border border-[#D6CCC2] dark:border-white/10 flex items-center justify-center text-[#26211E] dark:text-white hover:text-[#827060] dark:hover:text-[#D8C8B4] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

        </div>

        {/* Bottom Pagination Dots & Live Activity Pill */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 sm:mt-12">
          
          <div className="hidden sm:block sm:w-28" />

          {/* Centered Pagination Dots: Warm Charcoal / Cream Active Pill + Inactive Dots */}
          <div className="flex items-center justify-center gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx % (maxIndex + 1))}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? 'w-7 h-2 rounded-full bg-[#26211E] dark:bg-[#FAF7F2]'
                    : 'w-2 h-2 rounded-full bg-[#D6CCC2] dark:bg-white/20 hover:bg-[#B29F8D]'
                }`}
              />
            ))}
          </div>

          {/* Live Activity Pill in Ivory & Taupe Styling */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white dark:bg-[#1C1815] border border-[#D6CCC2] dark:border-white/10 shadow-xs text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold uppercase text-[10px] tracking-wider text-[#827060] dark:text-[#D8C8B4]">
              LIVE ACTIVITY
            </span>
            <span className="text-espresso-700 dark:text-cream-200 text-[11px] font-medium">
              Sahil onboarded a new client from Vadodara.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
