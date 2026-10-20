import React, { useState } from 'react';
import {
  Star,
  Award,
  CalendarCheck,
  Headphones,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/resortData';
import { ResortImage } from './ResortImage';

const ADVANTAGE_ITEMS = [
  {
    icon: Star,
    title: '5-Star Service',
    subtitle: 'Always at your service',
  },
  {
    icon: Award,
    title: 'Best Price Guarantee',
    subtitle: 'More value, always',
  },
  {
    icon: CalendarCheck,
    title: 'Flexible Booking',
    subtitle: 'Cancel with ease',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    subtitle: "We're here for you",
  },
];

export const Advantages: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = TESTIMONIALS_DATA.length;
  const activeTestimonial = TESTIMONIALS_DATA[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <section id="advantage" className="bg-white py-14 sm:py-20">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          {/* LEFT COLUMN (4 cols): Why Choose Us + 2x2 Compact Benefit Cards */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5A768E] mb-2">
                WHY CHOOSE US
              </p>
              <h2 className="font-serif-display text-3xl sm:text-[34px] text-[#06283D] font-normal leading-tight mb-3">
                The Skyview Advantage
              </h2>
              <p className="text-[13.5px] text-[#667785] leading-relaxed mb-6">
                From exceptional service to breathtaking locations, we make sure
                your stay is nothing short of extraordinary.
              </p>
            </div>

            {/* 2x2 Grid of Compact Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {ADVANTAGE_ITEMS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-[#F4F8FC] rounded-xl border border-[#DDE7EF]/80 p-4 flex items-start gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white border border-[#DDE7EF] text-[#06283D] flex items-center justify-center shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-sans text-[13px] font-semibold text-[#06283D] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[11.5px] text-[#667785] mt-0.5 leading-snug">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CENTER COLUMN (5 cols): Large Rounded Sunset Resort Image + Handwritten Note */}
          <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[340px] rounded-2xl overflow-hidden shadow-sm">
            <ResortImage
              scene="advantage_sunset_pool"
              alt="Sunset over the Skyview infinity pool and coastal cliffs"
              className="w-full h-full"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#06283D]/60 via-transparent to-transparent"
              aria-hidden="true"
            />

            {/* Decorative Handwritten Script Text matching reference image */}
            <div
              className="absolute bottom-6 left-7 z-10 pointer-events-none select-none rotate-[-5deg]"
              aria-hidden="true"
            >
              <p className="font-handwriting text-white text-2xl sm:text-[26px] leading-7 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                &ldquo;Where comfort
                <br />
                meets adventure&rdquo; ♡
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN (3 cols): Guest Testimonial Card */}
          <div className="lg:col-span-3 bg-[#F4F8FC] rounded-2xl border border-[#DDE7EF] p-6 flex flex-col justify-between">
            <div>
              {/* Large Quote Mark */}
              <div
                className="font-serif-display text-5xl leading-none text-[#06283D] select-none mb-2"
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <blockquote className="text-[13px] text-[#334E63] leading-relaxed font-normal min-h-[104px]">
                {activeTestimonial.quote}
              </blockquote>

              {/* Guest Info + Avatar + 5 Gold Stars */}
              <div className="flex items-center gap-3.5 mt-5 pt-4 border-t border-[#DDE7EF]/70">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                  <ResortImage
                    scene={activeTestimonial.avatarScene}
                    alt={activeTestimonial.author}
                    className="w-full h-full"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[13.5px] font-semibold text-[#06283D] truncate">
                    {activeTestimonial.author}
                  </div>
                  <div className="text-[11.5px] text-[#667785]">
                    {activeTestimonial.location}
                  </div>
                  <div
                    className="flex items-center gap-0.5 mt-1 text-[#F59E0B]"
                    aria-label={`${activeTestimonial.rating} out of 5 stars`}
                  >
                    {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Controls: Prev/Next Arrows & 1 / 3 Indicator */}
            <div className="flex items-center justify-between pt-5 mt-4 border-t border-[#DDE7EF]/70">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-7 h-7 rounded-full hover:bg-white border border-transparent hover:border-[#DDE7EF] flex items-center justify-center text-[#06283D] transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-7 h-7 rounded-full hover:bg-white border border-transparent hover:border-[#DDE7EF] flex items-center justify-center text-[#06283D] transition-colors cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-medium text-[#5A768E] tabular-nums">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="hover:text-[#06283D] cursor-pointer"
                  aria-label="Previous slide"
                >
                  &larr;
                </button>
                <span>
                  {activeIndex + 1} / {total}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="hover:text-[#06283D] cursor-pointer"
                  aria-label="Next slide"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
