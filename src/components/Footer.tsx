import React from 'react';
import { SkyviewLogo } from './Navbar';

interface FooterProps {
  onOpenPolicy: (type: 'privacy' | 'terms') => void;
  onSocialClick: (platform: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy, onSocialClick }) => {
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Rooms', href: '#rooms' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Gallery', href: '#destination' },
    { label: 'About', href: '#advantage' },
    { label: 'Contact', href: '#footer' },
  ];

  return (
    <footer id="footer" className="bg-[#041C2C] text-white pt-10 pb-8 border-t border-white/10">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Top Row: Logo | Navigation Links | Social Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Left: Skyview Brand Lockup */}
          <a href="#home" aria-label="Skyview Hotels & Resorts Home">
            <SkyviewLogo light={true} />
          </a>

          {/* Center: Navigation Links */}
          <nav
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-[13px] text-white/80"
            aria-label="Footer Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: 5 Social Icons (Instagram, Facebook, X/Twitter, YouTube, Pinterest) */}
          <div className="flex items-center gap-3.5">
            {/* Instagram */}
            <button
              type="button"
              onClick={() => onSocialClick('Instagram')}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/85 hover:text-white transition-colors cursor-pointer"
              aria-label="Follow Skyview on Instagram"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </button>

            {/* Facebook */}
            <button
              type="button"
              onClick={() => onSocialClick('Facebook')}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/85 hover:text-white transition-colors cursor-pointer"
              aria-label="Follow Skyview on Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
              </svg>
            </button>

            {/* X / Twitter */}
            <button
              type="button"
              onClick={() => onSocialClick('X (Twitter)')}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/85 hover:text-white transition-colors cursor-pointer"
              aria-label="Follow Skyview on X"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>

            {/* YouTube */}
            <button
              type="button"
              onClick={() => onSocialClick('YouTube')}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/85 hover:text-white transition-colors cursor-pointer"
              aria-label="Subscribe to Skyview on YouTube"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </button>

            {/* Pinterest */}
            <button
              type="button"
              onClick={() => onSocialClick('Pinterest')}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/85 hover:text-white transition-colors cursor-pointer"
              aria-label="Follow Skyview on Pinterest"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Row: Copyright & Legal Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11.5px] text-white/60">
          <p>© 2026 Skyview Hotels &amp; Resorts. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-white/25">
              |
            </span>
            <button
              type="button"
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
