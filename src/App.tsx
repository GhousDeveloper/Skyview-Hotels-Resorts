/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookingSearchCriteria } from './components/BookingSearch';
import { FeatureStrip } from './components/FeatureStrip';
import { FeaturedRooms } from './components/FeaturedRooms';
import { DestinationFeature } from './components/DestinationFeature';
import { Advantages } from './components/Advantages';
import { SpecialOffer } from './components/SpecialOffer';
import { Footer } from './components/Footer';
import {
  RoomDetailModal,
  ExperienceDetailModal,
  BookingReservationModal,
  VideoShowcaseModal,
  QuickSearchModal,
  GalleryLightboxModal,
  ContactConciergeModal,
} from './components/Modals';
import { RoomItem, ExperienceItem } from './data/resortData';
import { X } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<string>('EN');
  const [selectedRoom, setSelectedRoom] = useState<RoomItem | null>(null);
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceItem | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [bookingRoom, setBookingRoom] = useState<RoomItem | null>(null);
  const [bookingCriteria, setBookingCriteria] =
    useState<BookingSearchCriteria | null>(null);
  const [bookingPromo, setBookingPromo] = useState<string>('');
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState<boolean>(false);
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [infoNotice, setInfoNotice] = useState<{
    title: string;
    body: string;
  } | null>(null);

  const currencyMap: Record<string, { symbol: string; multiplier: number }> = {
    EN: { symbol: '$', multiplier: 1 },
    FR: { symbol: '€', multiplier: 0.92 },
    DE: { symbol: '€', multiplier: 0.92 },
    JP: { symbol: '¥', multiplier: 150 },
  };

  const activeCurrency = currencyMap[language] || currencyMap.EN;

  const handleOpenBooking = (promo = '') => {
    setBookingRoom(null);
    setBookingCriteria(null);
    setBookingPromo(promo);
    setBookingModalOpen(true);
  };

  const handleSearchRooms = (criteria: BookingSearchCriteria) => {
    setBookingRoom(null);
    setBookingCriteria(criteria);
    setBookingPromo('');
    setBookingModalOpen(true);
  };

  const handleBookSpecificRoom = (room: RoomItem) => {
    setSelectedRoom(null);
    setBookingRoom(room);
    setBookingPromo('');
    setBookingModalOpen(true);
  };

  const handleOpenPolicy = (type: 'privacy' | 'terms') => {
    if (type === 'privacy') {
      setInfoNotice({
        title: 'Skyview Privacy Policy',
        body: 'Skyview Hotels & Resorts respects your privacy. Personal reservation details are encrypted and used exclusively to curate your stay and concierge preferences.',
      });
    } else {
      setInfoNotice({
        title: 'Terms & Conditions',
        body: 'Flexible reservations include complimentary cancellation up to 48 hours prior to arrival. Best Price Guarantee applies to all direct bookings made on Skyview.',
      });
    }
  };

  const handleSocialClick = (platform: string) => {
    setInfoNotice({
      title: `Skyview on ${platform}`,
      body: `Explore @SkyviewResorts on ${platform} for daily golden-hour views from Uluwatu, Amalfi, and Santorini.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8FC] text-[#06283D]">
      {/* Top Navigation Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenGallery={() => setGalleryModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
        language={language}
        onSelectLanguage={setLanguage}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section + Floating Booking Search Bar */}
        <Hero onSearch={handleSearchRooms} />

        {/* 2. Hotel Benefits 5-Item Strip */}
        <FeatureStrip />

        {/* 3. Featured Stays / Exquisite Rooms & Suites */}
        <FeaturedRooms
          onSelectRoom={(room) => setSelectedRoom(room)}
          currencyMultiplier={activeCurrency.multiplier}
          currencySymbol={activeCurrency.symbol}
        />

        {/* 4. Top Destination (Bali Beach Resort) + Hotel Experiences */}
        <DestinationFeature
          onExploreDestination={() =>
            handleSearchRooms({
              destination: 'Bali, Indonesia',
              checkIn: '2026-05-12',
              checkOut: '2026-05-16',
              guests: 2,
            })
          }
          onWatchVideo={() => setVideoModalOpen(true)}
          onSelectExperience={(exp) => setSelectedExperience(exp)}
        />

        {/* 5. Why Choose Us / The Skyview Advantage + Center Image + Guest Testimonial Slider */}
        <Advantages />

        {/* 6. Special Offer Banner with Live Countdown Timer */}
        <SpecialOffer onBookOffer={() => handleOpenBooking('SKYVIEW30')} />
      </main>

      {/* 7. Dark Navy Footer */}
      <Footer
        onOpenPolicy={handleOpenPolicy}
        onSocialClick={handleSocialClick}
      />

      {/* Interactive Modals */}
      <RoomDetailModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onBookRoom={handleBookSpecificRoom}
        currencyMultiplier={activeCurrency.multiplier}
        currencySymbol={activeCurrency.symbol}
      />

      <ExperienceDetailModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
        onReserveExperience={(exp) => {
          setSelectedExperience(null);
          setInfoNotice({
            title: `${exp.title} Concierge Inquiry`,
            body: `Our Bali Resort Concierge has noted your interest in "${exp.title}" (${exp.schedule}). Complete a room reservation or contact concierge@skyview.com to lock in your preferred time.`,
          });
        }}
      />

      <BookingReservationModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialRoom={bookingRoom}
        initialCriteria={bookingCriteria}
        initialPromo={bookingPromo}
        currencyMultiplier={activeCurrency.multiplier}
        currencySymbol={activeCurrency.symbol}
      />

      <VideoShowcaseModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        onBookNow={() =>
          handleSearchRooms({
            destination: 'Bali, Indonesia',
            checkIn: '2026-05-12',
            checkOut: '2026-05-16',
            guests: 2,
          })
        }
      />

      <QuickSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectRoom={(room) => setSelectedRoom(room)}
        onSelectExperience={(exp) => setSelectedExperience(exp)}
      />

      <GalleryLightboxModal
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
        onBookNow={() => handleOpenBooking()}
      />

      <ContactConciergeModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* Subtle Floating Info Dialog for Legal/Social/Concierge feedback */}
      {infoNotice && (
        <div
          className="fixed bottom-5 right-5 z-50 max-w-sm bg-[#06283D] text-white rounded-2xl shadow-2xl border border-white/15 p-5"
          role="status"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="font-serif-display text-lg text-white">
                {infoNotice.title}
              </h4>
              <p className="text-xs text-white/80 leading-relaxed mt-1">
                {infoNotice.body}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setInfoNotice(null)}
              className="p-1 rounded-full hover:bg-white/10 text-white/70 hover:text-white cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
