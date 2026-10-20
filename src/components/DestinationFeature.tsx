import React from 'react';
import { MapPin, ArrowRight, Play } from 'lucide-react';
import { EXPERIENCES_DATA, ExperienceItem } from '../data/resortData';
import { ResortImage } from './ResortImage';

interface DestinationFeatureProps {
  onExploreDestination: () => void;
  onWatchVideo: () => void;
  onSelectExperience: (exp: ExperienceItem) => void;
}

export const DestinationFeature: React.FC<DestinationFeatureProps> = ({
  onExploreDestination,
  onWatchVideo,
  onSelectExperience,
}) => {
  return (
    <section
      id="experiences"
      className="bg-[#F4F8FC] border-b border-[#DDE7EF]"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* LEFT: Large Cinematic Top Destination Image (~50% width) */}
          <div
            id="destination"
            className="lg:col-span-6 relative min-h-[420px] sm:min-h-[460px] flex items-center justify-between p-6 sm:p-10 lg:p-12 overflow-hidden group"
          >
            <div className="absolute inset-0 z-0">
              <ResortImage
                scene="destination_beach_resort"
                alt="Skyview Beach Resort cliffside cove in Bali, Indonesia at sunset"
                className="w-full h-full"
                imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Dark Navy Contrast Scrim on left for legibility */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#06283D]/88 via-[#06283D]/55 to-transparent"
                aria-hidden="true"
              />
            </div>

            <div className="relative z-10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-8">
              {/* Left Overlay Text */}
              <div className="max-w-[340px]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 mb-2.5">
                  TOP DESTINATION
                </p>
                <h2 className="font-serif-display text-3xl sm:text-[38px] leading-[1.14] text-white font-normal mb-3.5 text-balance">
                  Experience Paradise
                  <span className="block">at Our Beach Resort</span>
                </h2>
                <p className="text-xs sm:text-[13.5px] text-white/85 leading-relaxed mb-5">
                  Wake up to ocean views, enjoy private beach access and indulge
                  in unforgettable moments.
                </p>

                <div className="flex items-center gap-1.5 text-xs font-medium text-white/95 mb-6">
                  <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Bali, Indonesia</span>
                </div>

                <button
                  type="button"
                  onClick={onExploreDestination}
                  className="group/btn bg-white hover:bg-[#F4F8FC] text-[#06283D] text-xs sm:text-[13px] font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-md transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Explore Resort</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover/btn:translate-x-0.5" />
                </button>
              </div>

              {/* Right Play Button Overlay ("Watch Video") */}
              <div className="flex flex-col items-center justify-center sm:mr-6 lg:mr-10 shrink-0">
                <button
                  type="button"
                  onClick={onWatchVideo}
                  className="group/play flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
                  aria-label="Watch Bali Resort Promotional Video"
                >
                  <span className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/70 flex items-center justify-center text-white shadow-lg transition-transform duration-150 group-hover/play:scale-105">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </span>
                  <span className="text-xs font-medium text-white tracking-wide drop-shadow">
                    Watch Video
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Hotel Experiences Column (~50% width) */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:px-10 lg:py-12 flex flex-col justify-center">
            <div className="mb-6">
              <h2 className="font-serif-display text-2xl sm:text-[32px] text-[#06283D] font-normal leading-tight">
                Hotel Experiences
              </h2>
              <p className="text-xs sm:text-[13.5px] text-[#667785] mt-1">
                More than a stay — a journey of unforgettable moments.
              </p>
            </div>

            {/* 4 Narrow Visual Experience Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {EXPERIENCES_DATA.map((exp) => (
                <article
                  key={exp.id}
                  onClick={() => onSelectExperience(exp)}
                  className="group bg-white rounded-xl border border-[#DDE7EF] p-2 pb-3.5 shadow-[0_4px_16px_rgba(6,40,61,0.04)] hover:shadow-[0_10px_24px_rgba(6,40,61,0.09)] transition-all duration-150 cursor-pointer flex flex-col"
                >
                  <div className="relative h-36 sm:h-40 w-full rounded-lg overflow-hidden mb-3">
                    <ResortImage
                      scene={exp.scene}
                      alt={exp.title}
                      className="w-full h-full"
                      imgClassName="transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-1.5">
                    <h3 className="font-sans text-[13px] font-semibold text-[#06283D] group-hover:text-[#0B5273] transition-colors leading-snug">
                      {exp.title}
                    </h3>
                    <p className="text-[11px] text-[#667785] mt-0.5 leading-snug">
                      {exp.subtitle}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
