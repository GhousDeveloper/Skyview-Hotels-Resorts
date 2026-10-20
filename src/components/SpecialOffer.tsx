import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { ResortImage } from './ResortImage';

interface SpecialOfferProps {
  onBookOffer: () => void;
}

export const SpecialOffer: React.FC<SpecialOfferProps> = ({ onBookOffer }) => {
  // Initial countdown matches reference: 05 Days, 12 Hours, 36 Minutes, 27 Seconds
  const [secondsLeft, setSecondsLeft] = useState(
    5 * 86400 + 12 * 3600 + 36 * 60 + 27
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 5 * 86400 + 12 * 3600));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  const timerBlocks = [
    { value: pad(days), label: 'Days' },
    { value: pad(hours), label: 'Hours' },
    { value: pad(minutes), label: 'Minutes' },
    { value: pad(seconds), label: 'Seconds' },
  ];

  return (
    <section
      aria-label="Special Offer"
      className="relative w-full min-h-[290px] sm:min-h-[330px] flex items-center overflow-hidden py-12 sm:py-16"
    >
      {/* Background Twilight Mountain & Villa Image */}
      <div className="absolute inset-0 z-0">
        <ResortImage
          scene="offer_banner_sunset"
          alt="Luxury resort twilight mountain bay view"
          className="w-full h-full"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#041C2C]/92 via-[#06283D]/70 to-[#06283D]/55"
          aria-hidden="true"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-[1340px] w-full mx-auto px-4 sm:px-6 lg:px-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left Promotional Copy */}
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 mb-2.5">
            LIMITED TIME OFFER
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-[42px] text-white font-normal leading-[1.15] mb-3.5 text-balance">
            Save Up to 30% on Your Dream Stay
          </h2>
          <p className="text-xs sm:text-[14px] text-white/85 leading-relaxed max-w-[460px] mb-6">
            Book now and enjoy exclusive discounts, complimentary breakfast and
            more special benefits.
          </p>

          <button
            type="button"
            onClick={onBookOffer}
            className="group bg-white hover:bg-[#F4F8FC] text-[#06283D] text-xs sm:text-[13px] font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-md transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Right Translucent Glass Countdown Box */}
        <div className="self-start lg:self-center">
          <div className="bg-[#041C2C]/75 backdrop-blur-md border border-white/15 rounded-2xl px-3 sm:px-5 py-4 sm:py-5 shadow-2xl inline-flex items-center divide-x divide-white/15">
            {timerBlocks.map((item) => (
              <div
                key={item.label}
                className="px-4 sm:px-6 flex flex-col items-center justify-center text-center min-w-[68px] sm:min-w-[84px]"
              >
                <span className="font-sans text-2xl sm:text-3xl font-semibold text-white tabular-nums tracking-tight">
                  {item.value}
                </span>
                <span className="text-[11px] text-white/75 mt-1 font-normal">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
