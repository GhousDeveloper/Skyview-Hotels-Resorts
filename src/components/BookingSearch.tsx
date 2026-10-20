import React, { useState, useRef } from 'react';
import { MapPin, Calendar, User, ArrowRight, ChevronDown } from 'lucide-react';
import { DESTINATIONS } from '../data/resortData';

export interface BookingSearchCriteria {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface BookingSearchProps {
  onSearch: (criteria: BookingSearchCriteria) => void;
}

export const BookingSearch: React.FC<BookingSearchProps> = ({ onSearch }) => {
  const [destination, setDestination] = useState<string>('');
  const [showDestinations, setShowDestinations] = useState(false);
  const [checkIn, setCheckIn] = useState<string>('2026-05-12');
  const [checkOut, setCheckOut] = useState<string>('2026-05-16');
  const [guests, setGuests] = useState<number>(2);
  const [showGuests, setShowGuests] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  const formatDisplayDate = (isoDate: string) => {
    if (!isoDate) return 'Select date';
    const parts = isoDate.split('-');
    if (parts.length !== 3) return isoDate;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const dateObj = new Date(year, month, day);
    return dateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(checkOut) <= new Date(checkIn)) {
      setErrorMsg('Check-out date must be after check-in date.');
      return;
    }
    setErrorMsg(null);
    onSearch({
      destination: destination || 'Bali, Indonesia',
      checkIn,
      checkOut,
      guests,
    });
  };

  return (
    <div className="w-full max-w-[880px] relative z-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(6,40,61,0.28)] border border-white/80 p-2.5 sm:p-3.5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 items-center gap-2 lg:gap-0">
          {/* Field 1: Destination */}
          <div className="relative lg:col-span-3 px-3.5 py-2 sm:border-r border-[#DDE7EF]">
            <button
              type="button"
              onClick={() => {
                setShowDestinations((prev) => !prev);
                setShowGuests(false);
              }}
              className="w-full text-left flex items-center gap-3 cursor-pointer group"
            >
              <MapPin className="w-4 h-4 text-[#5A768E] shrink-0 group-hover:text-[#0B5273] transition-colors" />
              <div className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold text-[#06283D] leading-tight">
                  Destination
                </span>
                <span className="block text-xs text-[#667785] truncate mt-0.5">
                  {destination || 'Where are you going?'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#667785] shrink-0 opacity-70" />
            </button>

            {showDestinations && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#DDE7EF] py-1.5 z-40">
                {DESTINATIONS.map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => {
                      setDestination(dest);
                      setShowDestinations(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                      destination === dest
                        ? 'bg-[#F4F8FC] text-[#06283D] font-semibold'
                        : 'text-[#667785] hover:bg-[#F4F8FC] hover:text-[#06283D]'
                    }`}
                  >
                    {dest}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Field 2: Check In */}
          <div className="relative lg:col-span-2.5 px-3.5 py-2 lg:border-r border-[#DDE7EF]">
            <div
              onClick={() => checkInRef.current?.showPicker?.()}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-[#5A768E] shrink-0 group-hover:text-[#0B5273]" />
              <div className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold text-[#06283D] leading-tight">
                  Check In
                </span>
                <span className="block text-xs text-[#667785] truncate mt-0.5 tabular-nums">
                  {formatDisplayDate(checkIn)}
                </span>
                <input
                  ref={checkInRef}
                  type="date"
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    setErrorMsg(null);
                  }}
                  aria-label="Check In Date"
                  className="sr-only"
                />
              </div>
            </div>
          </div>

          {/* Field 3: Check Out */}
          <div className="relative lg:col-span-2.5 px-3.5 py-2 sm:border-r border-[#DDE7EF]">
            <div
              onClick={() => checkOutRef.current?.showPicker?.()}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-[#5A768E] shrink-0 group-hover:text-[#0B5273]" />
              <div className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold text-[#06283D] leading-tight">
                  Check Out
                </span>
                <span className="block text-xs text-[#667785] truncate mt-0.5 tabular-nums">
                  {formatDisplayDate(checkOut)}
                </span>
                <input
                  ref={checkOutRef}
                  type="date"
                  value={checkOut}
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                    setErrorMsg(null);
                  }}
                  aria-label="Check Out Date"
                  className="sr-only"
                />
              </div>
            </div>
          </div>

          {/* Field 4: Guests */}
          <div className="relative lg:col-span-2 px-3.5 py-2">
            <button
              type="button"
              onClick={() => {
                setShowGuests((prev) => !prev);
                setShowDestinations(false);
              }}
              className="w-full text-left flex items-center gap-3 cursor-pointer group"
            >
              <User className="w-4 h-4 text-[#5A768E] shrink-0 group-hover:text-[#0B5273]" />
              <div className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold text-[#06283D] leading-tight">
                  Guests
                </span>
                <span className="block text-xs text-[#667785] truncate mt-0.5 tabular-nums">
                  {guests} {guests === 1 ? 'Adult' : 'Adults'}
                </span>
              </div>
            </button>

            {showGuests && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#DDE7EF] p-3 z-40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#06283D]">Adults</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="w-6 h-6 rounded-full border border-[#DDE7EF] flex items-center justify-center text-xs font-bold text-[#06283D] hover:bg-[#F4F8FC] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold w-4 text-center tabular-nums">
                      {guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(8, g + 1))}
                      className="w-6 h-6 rounded-full border border-[#DDE7EF] flex items-center justify-center text-xs font-bold text-[#06283D] hover:bg-[#F4F8FC] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Field 5: Search Rooms CTA Button */}
          <div className="sm:col-span-2 lg:col-span-2 pl-1">
            <button
              type="submit"
              className="w-full bg-[#06283D] hover:bg-[#0B5273] text-white text-xs sm:text-[13px] font-medium py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 group"
            >
              <span>Search Rooms</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {errorMsg && (
          <p className="text-xs text-red-600 font-medium px-3.5 pt-2">{errorMsg}</p>
        )}
      </form>
    </div>
  );
};
