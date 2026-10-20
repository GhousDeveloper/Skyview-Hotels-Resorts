import React, { useState } from 'react';
import {
  X,
  Check,
  User,
  BedDouble,
  Maximize2,
  Clock,
  Search,
  ArrowRight,
  Play,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import {
  RoomItem,
  ExperienceItem,
  ROOMS_DATA,
  EXPERIENCES_DATA,
  DESTINATIONS,
} from '../data/resortData';
import { ResortImage } from './ResortImage';
import { BookingSearchCriteria } from './BookingSearch';
import { SceneId } from '../utils/resortImages';

interface RoomModalProps {
  room: RoomItem | null;
  onClose: () => void;
  onBookRoom: (room: RoomItem) => void;
  currencyMultiplier: number;
  currencySymbol: string;
}

export const RoomDetailModal: React.FC<RoomModalProps> = ({
  room,
  onClose,
  onBookRoom,
  currencyMultiplier,
  currencySymbol,
}) => {
  if (!room) return null;
  const price = Math.round(room.pricePerNight * currencyMultiplier);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#041C2C]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="room-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#DDE7EF] my-8">
        <div className="relative h-64 sm:h-72 w-full">
          <ResortImage scene={room.scene} alt={room.name} className="w-full h-full" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#06283D]/80 hover:bg-[#06283D] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-3">
            <h3
              id="room-modal-title"
              className="font-serif-display text-2xl sm:text-3xl text-[#06283D]"
            >
              {room.name}
            </h3>
            <div className="text-[#06283D] tabular-nums">
              <span className="text-2xl font-bold">
                {currencySymbol}
                {price}
              </span>
              <span className="text-xs text-[#667785]"> / night</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#5A768E] mb-5">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Up to {room.guests} Guests
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="w-3.5 h-3.5" /> {room.beds}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5" /> {room.sizeSqm} m²
            </span>
            <span aria-hidden="true">·</span>
            <span>{room.view}</span>
          </div>

          <p className="text-sm text-[#334E63] leading-relaxed mb-6">
            {room.description}
          </p>

          <div className="bg-[#F4F8FC] rounded-xl p-4 border border-[#DDE7EF] mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#06283D] mb-3">
              Signature Suite Privileges
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {room.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-xs text-[#334E63]"
                >
                  <Check className="w-3.5 h-3.5 text-[#0B5273] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-[#DDE7EF] text-xs font-semibold text-[#667785] hover:text-[#06283D] cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onBookRoom(room)}
              className="bg-[#06283D] hover:bg-[#0B5273] text-white px-6 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Reserve {room.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ExperienceModalProps {
  experience: ExperienceItem | null;
  onClose: () => void;
  onReserveExperience: (exp: ExperienceItem) => void;
}

export const ExperienceDetailModal: React.FC<ExperienceModalProps> = ({
  experience,
  onClose,
  onReserveExperience,
}) => {
  if (!experience) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#041C2C]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#DDE7EF]">
        <div className="relative h-60 w-full">
          <ResortImage
            scene={experience.scene}
            alt={experience.title}
            className="w-full h-full"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#06283D]/80 hover:bg-[#06283D] text-white flex items-center justify-center cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5A768E] mb-1">
            CURATED EXPERIENCE
          </p>
          <h3 className="font-serif-display text-2xl sm:text-3xl text-[#06283D] mb-2">
            {experience.title} — {experience.subtitle}
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#5A768E] mb-4">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {experience.duration}
            </span>
            <span aria-hidden="true">·</span>
            <span>{experience.schedule}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-[#06283D]">
              {experience.priceLabel}
            </span>
          </div>

          <p className="text-sm text-[#334E63] leading-relaxed mb-5">
            {experience.description}
          </p>

          <div className="bg-[#F4F8FC] rounded-xl p-4 border border-[#DDE7EF] mb-6 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#06283D]">
              What&apos;s Included
            </h4>
            {experience.includes.map((inc) => (
              <div key={inc} className="flex items-start gap-2 text-xs text-[#334E63]">
                <Check className="w-3.5 h-3.5 text-[#0B5273] shrink-0 mt-0.5" />
                <span>{inc}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-[#DDE7EF] text-xs font-semibold text-[#667785] hover:text-[#06283D] cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onReserveExperience(experience)}
              className="bg-[#06283D] hover:bg-[#0B5273] text-white px-6 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Inquire &amp; Reserve</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoom?: RoomItem | null;
  initialCriteria?: BookingSearchCriteria | null;
  initialPromo?: string;
  currencyMultiplier: number;
  currencySymbol: string;
}

export const BookingReservationModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialRoom,
  initialCriteria,
  initialPromo = '',
  currencyMultiplier,
  currencySymbol,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    initialRoom?.id || ROOMS_DATA[0].id
  );
  const [destination, setDestination] = useState<string>(
    initialCriteria?.destination || DESTINATIONS[0]
  );
  const [checkIn, setCheckIn] = useState<string>(
    initialCriteria?.checkIn || '2026-05-12'
  );
  const [checkOut, setCheckOut] = useState<string>(
    initialCriteria?.checkOut || '2026-05-16'
  );
  const [guests, setGuests] = useState<number>(initialCriteria?.guests || 2);
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [promoCode, setPromoCode] = useState<string>(initialPromo);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  const activeRoom =
    ROOMS_DATA.find((r) => r.id === (initialRoom?.id || selectedRoomId)) ||
    ROOMS_DATA[0];

  const nights = Math.max(
    1,
    Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000
    )
  );
  const unitPrice = Math.round(activeRoom.pricePerNight * currencyMultiplier);
  const subtotal = unitPrice * nights;
  const hasDiscount =
    promoCode.trim().toUpperCase() === 'SKYVIEW30' || Boolean(initialPromo);
  const discountAmount = hasDiscount ? Math.round(subtotal * 0.3) : 0;
  const totalAmount = subtotal - discountAmount;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.includes('@')) {
      setFormError('Please enter your full name and a valid email address.');
      return;
    }
    setFormError(null);
    setConfirmed(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#041C2C]/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#DDE7EF] my-8">
        <div className="bg-[#06283D] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/75">
              SKYVIEW RESERVATIONS
            </p>
            <h3 className="font-serif-display text-2xl">
              {confirmed ? 'Reservation Confirmed' : 'Complete Your Sanctuary Stay'}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setConfirmed(false);
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            aria-label="Close reservation modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {confirmed ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#E8F1F8] text-[#0B5273] flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="font-serif-display text-2xl text-[#06283D]">
              We Look Forward to Welcoming You, {guestName}
            </h4>
            <p className="text-sm text-[#667785] max-w-md mx-auto">
              Your reservation for the{' '}
              <strong className="text-[#06283D]">{activeRoom.name}</strong> at{' '}
              <strong className="text-[#06283D]">{destination}</strong> ({nights}{' '}
              {nights === 1 ? 'night' : 'nights'}) has been sent to{' '}
              <span className="underline">{guestEmail}</span>.
            </p>
            <div className="bg-[#F4F8FC] rounded-xl p-4 border border-[#DDE7EF] max-w-md mx-auto text-xs text-left space-y-1.5 tabular-nums">
              <div className="flex justify-between">
                <span className="text-[#667785]">Confirmation Reference:</span>
                <span className="font-semibold text-[#06283D]">#SKY-2026-8841</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667785]">Check-In / Check-Out:</span>
                <span className="font-semibold text-[#06283D]">
                  {checkIn} → {checkOut}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667785]">Total Reserved:</span>
                <span className="font-bold text-[#06283D]">
                  {currencySymbol}
                  {totalAmount}
                </span>
              </div>
            </div>
            <div className="pt-3">
              <button
                type="button"
                onClick={() => {
                  setConfirmed(false);
                  onClose();
                }}
                className="bg-[#06283D] text-white px-7 py-2.5 rounded-full text-xs font-semibold cursor-pointer"
              >
                Return to Resort
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="p-6 sm:p-7 space-y-4">
            {initialCriteria && (
              <div className="bg-[#F4F8FC] border border-[#DDE7EF] rounded-xl p-3.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-[#06283D]">
                    {ROOMS_DATA.filter((r) => r.guests >= guests).length} Luxury
                    Suites Available
                  </span>{' '}
                  <span className="text-[#667785]">
                    in {destination} for {guests}{' '}
                    {guests === 1 ? 'Adult' : 'Adults'}
                  </span>
                </div>
                <span className="text-[#0B5273] font-semibold">
                  Best Rate Guaranteed
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#06283D] mb-1">
                  Destination Resort
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full rounded-xl border border-[#DDE7EF] px-3.5 py-2.5 text-xs text-[#06283D] bg-[#F4F8FC] focus:outline-none focus:border-[#0B5273]"
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#06283D] mb-1">
                  Select Room or Villa
                </label>
                <select
                  value={initialRoom?.id || selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full rounded-xl border border-[#DDE7EF] px-3.5 py-2.5 text-xs text-[#06283D] bg-[#F4F8FC] focus:outline-none focus:border-[#0B5273]"
                >
                  {ROOMS_DATA.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({currencySymbol}
                      {Math.round(r.pricePerNight * currencyMultiplier)}/night · Up to{' '}
                      {r.guests} guests)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#06283D] mb-1">
                  Check In
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full rounded-xl border border-[#DDE7EF] px-3.5 py-2 text-xs text-[#06283D] bg-[#F4F8FC]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#06283D] mb-1">
                  Check Out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full rounded-xl border border-[#DDE7EF] px-3.5 py-2 text-xs text-[#06283D] bg-[#F4F8FC]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#06283D] mb-1">
                  Guests
                </label>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full rounded-xl border border-[#DDE7EF] px-3.5 py-2 text-xs text-[#06283D] bg-[#F4F8FC]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#06283D] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Mitchell"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full rounded-xl border border-[#DDE7EF] px-3.5 py-2.5 text-xs text-[#06283D] focus:outline-none focus:border-[#0B5273]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#06283D] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="guest@example.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#DDE7EF] px-3.5 py-2.5 text-xs text-[#06283D] focus:outline-none focus:border-[#0B5273]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#06283D] mb-1">
                Promotional Code (Use SKYVIEW30 for 30% Dream Stay Offer)
              </label>
              <input
                type="text"
                placeholder="Optional promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full rounded-xl border border-[#DDE7EF] px-3.5 py-2 text-xs text-[#06283D] uppercase"
              />
            </div>

            <div className="bg-[#F4F8FC] rounded-xl p-4 border border-[#DDE7EF] space-y-1.5 text-xs tabular-nums">
              <div className="flex justify-between text-[#667785]">
                <span>
                  {activeRoom.name} ({currencySymbol}
                  {unitPrice} × {nights} {nights === 1 ? 'night' : 'nights'})
                </span>
                <span>
                  {currencySymbol}
                  {subtotal}
                </span>
              </div>
              {hasDiscount && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Limited Time 30% Dream Stay Offer (SKYVIEW30)</span>
                  <span>
                    -{currencySymbol}
                    {discountAmount}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-[#06283D] pt-2 border-t border-[#DDE7EF]">
                <span>Total Stay (Includes Daily Breakfast &amp; Taxes)</span>
                <span>
                  {currencySymbol}
                  {totalAmount}
                </span>
              </div>
            </div>

            {formError && (
              <p className="text-xs text-red-600 font-medium">{formError}</p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border border-[#DDE7EF] text-xs font-semibold text-[#667785] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#06283D] hover:bg-[#0B5273] text-white px-7 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Confirm Reservation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

export const VideoShowcaseModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  onBookNow,
}) => {
  const [activeChapter, setActiveChapter] = useState(0);
  if (!isOpen) return null;

  const chapters = [
    {
      title: '01. Cliffside Arrival & Infinity Sanctuary',
      scene: 'hero_resort_sunset' as const,
      caption:
        'Perched 120 meters above the Indian Ocean in Uluwatu, Bali, our architectural villas blend seamlessly into limestone cliffs and golden sunset horizons.',
      time: '00:00 / 02:45',
    },
    {
      title: '02. Secluded Cove & Private Lagoon',
      scene: 'destination_beach_resort' as const,
      caption:
        'Descend via private cliffside inclinator to our untouched white-sand lagoon for morning paddleboarding, coral snorkeling, and beachfront dining.',
      time: '00:58 / 02:45',
    },
    {
      title: '03. Twilight Wellness & Starlight Dining',
      scene: 'advantage_sunset_pool' as const,
      caption:
        'Unwind with holistic Balinese spa rituals followed by a candlelit seven-course coastal tasting menu overlooking the evening tide.',
      time: '01:52 / 02:45',
    },
  ];

  const current = chapters[activeChapter];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#041C2C]/85 backdrop-blur-md flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#06283D] text-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-white/15">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Play className="w-4 h-4 text-[#F2C08B] fill-[#F2C08B]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-white/90">
              Skyview Bali Beach Resort — Official Film Showcase
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
            aria-label="Close video modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <ResortImage
            scene={current.scene}
            alt={current.title}
            className="w-full h-full"
            imgClassName="scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041C2C] via-transparent to-black/25" />

          <div className="absolute bottom-5 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-lg">
              <span className="text-[11px] font-mono text-[#F2C08B] tabular-nums">
                {current.time}
              </span>
              <h4 className="font-serif-display text-xl sm:text-2xl text-white mt-0.5">
                {current.title}
              </h4>
              <p className="text-xs text-white/85 mt-1 leading-relaxed">
                {current.caption}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onBookNow();
              }}
              className="bg-white text-[#06283D] px-5 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>Book Bali Resort</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="p-4 bg-[#041C2C] grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {chapters.map((ch, idx) => (
            <button
              key={ch.title}
              type="button"
              onClick={() => setActiveChapter(idx)}
              className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                activeChapter === idx
                  ? 'bg-white/12 border-white/40 text-white'
                  : 'bg-white/5 border-transparent text-white/65 hover:text-white'
              }`}
            >
              <div className="text-xs font-semibold truncate">{ch.title}</div>
              <div className="text-[11px] text-white/55 mt-0.5 tabular-nums">
                {ch.time}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoom: (room: RoomItem) => void;
  onSelectExperience: (exp: ExperienceItem) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectRoom,
  onSelectExperience,
}) => {
  const [query, setQuery] = useState('');
  if (!isOpen) return null;

  const q = query.trim().toLowerCase();
  const matchedRooms = ROOMS_DATA.filter(
    (r) =>
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.beds.toLowerCase().includes(q)
  );
  const matchedExps = EXPERIENCES_DATA.filter(
    (e) =>
      !q ||
      e.title.toLowerCase().includes(q) ||
      e.subtitle.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-[#041C2C]/70 backdrop-blur-sm flex items-start justify-center pt-20 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#DDE7EF]">
        <div className="p-4 border-b border-[#DDE7EF] flex items-center gap-3">
          <Search className="w-4 h-4 text-[#5A768E]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search luxury suites, pool villas, dining, spa experiences..."
            className="w-full text-sm text-[#06283D] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F4F8FC] text-[#667785] cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-4 space-y-5">
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#5A768E] mb-2">
              Suites &amp; Villas ({matchedRooms.length})
            </h4>
            <div className="space-y-2">
              {matchedRooms.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectRoom(room);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-[#F4F8FC] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-semibold text-[#06283D]">
                      {room.name}
                    </div>
                    <div className="text-[11px] text-[#667785]">
                      Up to {room.guests} Guests · {room.beds}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#06283D] tabular-nums">
                    ${room.pricePerNight} / night
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#5A768E] mb-2">
              Curated Experiences ({matchedExps.length})
            </h4>
            <div className="space-y-2">
              {matchedExps.map((exp) => (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectExperience(exp);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-[#F4F8FC] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-semibold text-[#06283D]">
                      {exp.title}
                    </div>
                    <div className="text-[11px] text-[#667785]">{exp.subtitle}</div>
                  </div>
                  <span className="text-xs font-medium text-[#0B5273]">
                    {exp.priceLabel}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

const GALLERY_ITEMS: { scene: SceneId; title: string; category: string }[] = [
  {
    scene: 'hero_resort_sunset',
    title: 'Skyview Cliffside Infinity Sanctuary',
    category: 'Resort Architecture',
  },
  {
    scene: 'destination_beach_resort',
    title: 'Private Limestone Cove & Lagoon, Bali',
    category: 'Destinations',
  },
  {
    scene: 'advantage_sunset_pool',
    title: 'Twilight Cabanas & Sunset Reflection Pool',
    category: 'Resort Grounds',
  },
  {
    scene: 'room_pool_villa',
    title: 'Private Plunge Pool Villa',
    category: 'Suites & Villas',
  },
  {
    scene: 'room_deluxe',
    title: 'Sunlit Deluxe Ocean Room',
    category: 'Suites & Villas',
  },
  {
    scene: 'room_ocean_suite',
    title: 'Panoramic Ocean View Suite',
    category: 'Suites & Villas',
  },
  {
    scene: 'room_family_suite',
    title: 'Two-Bedroom Family Sanctuary',
    category: 'Suites & Villas',
  },
  {
    scene: 'exp_spa_wellness',
    title: 'Holistic Balinese Botanical Spa',
    category: 'Experiences',
  },
  {
    scene: 'exp_culinary',
    title: 'Seven-Course Coastal Tasting Table',
    category: 'Fine Dining',
  },
  {
    scene: 'exp_adventure',
    title: 'Guided Ridge & Coastal Expeditions',
    category: 'Adventure',
  },
  {
    scene: 'exp_culture',
    title: 'Sacred Water Temple Twilight Immersion',
    category: 'Culture',
  },
  {
    scene: 'offer_banner_sunset',
    title: 'Evening Pavilion & Poolside Lounge',
    category: 'Resort Grounds',
  },
];

export const GalleryLightboxModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  onBookNow,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  if (!isOpen) return null;

  const activeItem = GALLERY_ITEMS[selectedIdx];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#041C2C]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#06283D] text-white rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl border border-white/15 my-8">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/70">
              VISUAL PORTFOLIO
            </p>
            <h3 className="font-serif-display text-2xl text-white">
              Skyview Resort &amp; Residences Gallery
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookNow();
              }}
              className="bg-white text-[#06283D] px-4 py-2 rounded-full text-xs font-semibold cursor-pointer"
            >
              Book Your Stay
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              aria-label="Close gallery"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Selected Image */}
        <div className="relative h-72 sm:h-[420px] w-full bg-[#041C2C]">
          <ResortImage
            scene={activeItem.scene}
            alt={activeItem.title}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041C2C]/90 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-white/75">
                {activeItem.category}
              </span>
              <h4 className="font-serif-display text-xl sm:text-2xl text-white mt-0.5">
                {activeItem.title}
              </h4>
            </div>
            <span className="text-xs text-white/75 tabular-nums">
              {selectedIdx + 1} / {GALLERY_ITEMS.length}
            </span>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="p-4 bg-[#041C2C] grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2">
          {GALLERY_ITEMS.map((item, idx) => (
            <button
              key={item.scene}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`relative h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                selectedIdx === idx
                  ? 'border-white scale-105'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <ResortImage
                scene={item.scene}
                alt={item.title}
                className="w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactConciergeModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@')) return;
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#041C2C]/75 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#DDE7EF]">
        <div className="bg-[#06283D] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/75">
              24/7 PRIVATE CONCIERGE
            </p>
            <h3 className="font-serif-display text-2xl">
              Contact Skyview Hotels &amp; Resorts
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setSent(false);
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            aria-label="Close contact modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {sent ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#E8F1F8] text-[#0B5273] flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-serif-display text-2xl text-[#06283D]">
              Inquiry Received, {name}
            </h4>
            <p className="text-xs text-[#667785] leading-relaxed">
              Our Chief Concierge in Bali will respond to{' '}
              <span className="underline">{email}</span> within 30 minutes to
              assist with your bespoke travel arrangements.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                onClose();
              }}
              className="bg-[#06283D] text-white px-6 py-2.5 rounded-full text-xs font-semibold cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="bg-[#F4F8FC] rounded-xl p-4 border border-[#DDE7EF] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#334E63]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0B5273] shrink-0" />
                <span>+62 361 849 9200</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0B5273] shrink-0" />
                <span className="truncate">concierge@skyview.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0B5273] shrink-0" />
                <span>Uluwatu, Bali</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#06283D] mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full rounded-xl border border-[#DDE7EF] px-3.5 py-2.5 text-xs text-[#06283D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#06283D] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="guest@example.com"
                className="w-full rounded-xl border border-[#DDE7EF] px-3.5 py-2.5 text-xs text-[#06283D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#06283D] mb-1">
                How May Our Concierge Assist You?
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Private helicopter transfer, bespoke dining requests, villa inquiries..."
                className="w-full rounded-xl border border-[#DDE7EF] px-3.5 py-2.5 text-xs text-[#06283D]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border border-[#DDE7EF] text-xs font-semibold text-[#667785] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#06283D] hover:bg-[#0B5273] text-white px-6 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Send to Concierge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
