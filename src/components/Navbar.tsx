import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (promoCode?: string) => void;
  onOpenSearch: () => void;
  onOpenGallery: () => void;
  onOpenContact: () => void;
  language: string;
  onSelectLanguage: (lang: string) => void;
}

const LANGUAGES = [
  { code: 'EN', label: 'English (USD)' },
  { code: 'FR', label: 'Français (EUR)' },
  { code: 'DE', label: 'Deutsch (EUR)' },
  { code: 'JP', label: '日本語 (JPY)' },
];

export const SkyviewLogo: React.FC<{ light?: boolean }> = ({ light = true }) => (
  <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
    <svg
      width="36"
      height="28"
      viewBox="0 0 40 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <path
        d="M2 27L16.5 4L25.5 18.5C21.5 18.5 18.2 15.8 15 16.2C11.5 16.6 8.5 21.5 2 27Z"
        fill={light ? '#FFFFFF' : '#06283D'}
      />
      <path
        d="M11 27C15.5 22.5 19.5 20.5 26 21L29.5 27H11Z"
        fill={light ? '#FFFFFF' : '#06283D'}
      />
      <path
        d="M24 14L29.5 6L38 20.5C34.5 19.2 31.5 17.5 27.5 17.5L24 14Z"
        fill={light ? 'rgba(255,255,255,0.88)' : '#0B5273'}
      />
    </svg>
    <div className="flex flex-col leading-none">
      <span
        className={`font-serif-display text-xl md:text-[23px] font-medium tracking-tight ${
          light ? 'text-white' : 'text-[#06283D]'
        }`}
      >
        Skyview
      </span>
      <span
        className={`text-[7.5px] tracking-[0.24em] font-semibold uppercase mt-0.5 ${
          light ? 'text-white/80' : 'text-[#5A768E]'
        }`}
      >
        HOTELS & RESORTS
      </span>
    </div>
  </div>
);

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenSearch,
  onOpenGallery,
  onOpenContact,
  language,
  onSelectLanguage,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Rooms', href: '#rooms' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Gallery', href: '#destination', onClick: onOpenGallery },
    { label: 'About', href: '#advantage' },
    { label: 'Contact', href: '#footer', onClick: onOpenContact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#06283D]/95 backdrop-blur-md shadow-md py-3.5 border-b border-white/10'
          : 'bg-gradient-to-b from-[#041C2C]/75 via-[#06283D]/35 to-transparent py-5'
      }`}
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-lg"
          aria-label="Skyview Hotels & Resorts Home"
        >
          <SkyviewLogo light={true} />
        </a>

        {/* Zone 2: Center Navigation */}
        <nav
          className="hidden lg:flex items-center gap-8 text-[14px] font-medium"
          aria-label="Primary Navigation"
        >
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
              }}
              className="whitespace-nowrap shrink-0 text-white/95 hover:text-white transition-colors duration-150 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-white hover:after:w-full after:transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Right Controls */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            className="p-2 rounded-full text-white/95 hover:bg-white/15 transition-colors cursor-pointer"
            aria-label="Search rooms and destinations"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen((prev) => !prev)}
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-md text-white/95 hover:bg-white/15 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              aria-label="Select Language"
              aria-expanded={langMenuOpen}
            >
              <span>{language}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-[#DDE7EF] py-1.5 z-50">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      onSelectLanguage(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      language === l.code
                        ? 'bg-[#F4F8FC] text-[#06283D] font-semibold'
                        : 'text-[#667785] hover:bg-[#F4F8FC] hover:text-[#06283D]'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-[11px] uppercase">{l.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="group bg-[#06283D] hover:bg-[#0B5273] border border-white/20 text-white text-xs sm:text-[13px] font-medium px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className="p-2 rounded-full text-white hover:bg-white/15 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg text-white hover:bg-white/15 transition-colors"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#06283D]/98 backdrop-blur-lg border-t border-white/10 px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-2.5">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
                className="text-white/90 hover:text-white py-2 text-base font-medium border-b border-white/5"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => onSelectLanguage(l.code)}
                  className={`px-2.5 py-1 rounded text-xs font-medium ${
                    language === l.code
                      ? 'bg-white text-[#06283D]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {l.code}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="bg-white text-[#06283D] px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
