import React from 'react';
import { ResortImage } from './ResortImage';
import { BookingSearch, BookingSearchCriteria } from './BookingSearch';

interface HeroProps {
  onSearch: (criteria: BookingSearchCriteria) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  return (
    <section
      id="home"
      className="relative w-full min-h-[620px] lg:min-h-[700px] flex flex-col justify-between overflow-hidden pt-28 pb-12 lg:pb-16"
    >
      {/* Background Resort Image */}
      <div className="absolute inset-0 z-0">
        <ResortImage
          scene="hero_resort_sunset"
          alt="Skyview luxury cliffside resort with infinity pool overlooking the ocean at sunset"
          className="w-full h-full"
        />
        {/* Measured contrast scrim matching the reference image: deep blue-navy on the left for crisp white text, clear on the right for the glowing villa */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#06283D]/80 via-[#06283D]/40 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#06283D]/55 via-transparent to-white/15"
          aria-hidden="true"
        />
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-[1340px] w-full mx-auto px-4 sm:px-6 lg:px-10 my-auto pt-8 sm:pt-12 pb-10">
        <div className="max-w-xl">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-white/90 mb-3.5">
            LUXURY STAYS. UNFORGETTABLE JOURNEYS.
          </p>
          <h1 className="font-serif-display text-white text-4xl sm:text-5xl lg:text-[62px] leading-[1.08] font-normal tracking-tight mb-5 text-balance">
            <span className="italic font-normal">Your</span> Perfect Getaway{' '}
            <span className="block">Awaits</span>
          </h1>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-[460px] font-normal">
            Discover world-class comfort, breathtaking views and personalized
            experiences at Skyview Hotels &amp; Resorts.
          </p>
        </div>

        {/* Floating Booking Search Bar */}
        <div className="mt-10 sm:mt-12">
          <BookingSearch onSearch={onSearch} />
        </div>
      </div>

      {/* Decorative Handwritten Note on Bottom Right (matching reference image) */}
      <div
        className="hidden lg:block absolute bottom-7 right-12 z-10 pointer-events-none select-none rotate-[-6deg]"
        aria-hidden="true"
      >
        <p className="font-handwriting text-white/95 text-2xl leading-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
          More than
          <br />
          a stay
          <br />— it&apos;s an
          <br />
          experience ♡
        </p>
      </div>
    </section>
  );
};
