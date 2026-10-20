import React, { useState } from 'react';
import { ArrowRight, User } from 'lucide-react';
import { ROOMS_DATA, RoomItem } from '../data/resortData';
import { ResortImage } from './ResortImage';

interface FeaturedRoomsProps {
  onSelectRoom: (room: RoomItem) => void;
  currencyMultiplier: number;
  currencySymbol: string;
}

export const FeaturedRooms: React.FC<FeaturedRoomsProps> = ({
  onSelectRoom,
  currencyMultiplier,
  currencySymbol,
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayedRooms = showAll ? ROOMS_DATA : ROOMS_DATA.slice(0, 4);

  return (
    <section id="rooms" className="bg-white py-14 sm:py-20 border-b border-[#DDE7EF]/70">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          {/* Left Editorial Introduction Column */}
          <div className="lg:col-span-3 flex flex-col justify-between pr-2 pt-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5A768E] mb-2.5">
                FEATURED STAYS
              </p>
              <h2 className="font-serif-display text-3xl sm:text-[36px] leading-[1.15] text-[#06283D] font-normal mb-4 text-balance">
                Exquisite Rooms
                <span className="block">&amp; Suites</span>
              </h2>
              <p className="text-[13.5px] text-[#667785] leading-relaxed mb-7 max-w-[260px]">
                Thoughtfully designed for your comfort, our rooms blend modern
                luxury with natural beauty.
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[#06283D]/35 text-[#06283D] hover:bg-[#06283D] hover:text-white text-xs sm:text-[13px] font-medium transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{showAll ? 'Show Featured (4)' : 'View All Rooms'}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Right Room Cards Grid */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {displayedRooms.map((room) => {
              const convertedPrice = Math.round(room.pricePerNight * currencyMultiplier);
              return (
                <article
                  key={room.id}
                  onClick={() => onSelectRoom(room)}
                  className="group bg-white rounded-2xl border border-[#DDE7EF] shadow-[0_6px_24px_rgba(6,40,61,0.04)] hover:shadow-[0_14px_34px_rgba(6,40,61,0.10)] transition-all duration-200 overflow-hidden cursor-pointer flex flex-col"
                >
                  {/* Room Image */}
                  <div className="p-2 pb-0">
                    <div className="relative h-44 sm:h-48 w-full rounded-xl overflow-hidden">
                      <ResortImage
                        scene={room.scene}
                        alt={`${room.name} at Skyview Hotels & Resorts`}
                        className="w-full h-full"
                        imgClassName="transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 pt-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-sans text-[15px] font-semibold text-[#06283D] group-hover:text-[#0B5273] transition-colors">
                        {room.name}
                      </h3>

                      {/* Clean unboxed metadata with typographic separator */}
                      <div className="flex items-center gap-2 text-xs text-[#667785] mt-2">
                        <span className="inline-flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-[#5A768E]" />
                          <span className="tabular-nums">{room.guests} Guests</span>
                        </span>
                        <span aria-hidden="true" className="text-[#DDE7EF]">
                          |
                        </span>
                        <span>{room.beds}</span>
                      </div>
                    </div>

                    {/* Price & Circular Action Button */}
                    <div className="flex items-center justify-between pt-4 mt-3 border-t border-[#F4F8FC]">
                      <div className="text-[#06283D] tabular-nums">
                        <span className="text-base font-bold">
                          {currencySymbol}
                          {convertedPrice}
                        </span>
                        <span className="text-xs text-[#667785] font-normal">
                          {' '}
                          / night
                        </span>
                      </div>

                      <span
                        className="w-8 h-8 rounded-full bg-[#E8F1F8] group-hover:bg-[#06283D] text-[#06283D] group-hover:text-white flex items-center justify-center transition-colors duration-150"
                        aria-label={`Explore ${room.name}`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
