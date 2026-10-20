import React from 'react';
import { BedDouble, Flower2, UtensilsCrossed, MapPin, ShieldCheck } from 'lucide-react';

const BENEFITS = [
  {
    icon: BedDouble,
    title: 'Luxury Rooms & Suites',
    subtitle: 'Elegant spaces for every traveler',
  },
  {
    icon: Flower2,
    title: 'World-Class Amenities',
    subtitle: 'Pool, spa, fitness & more',
  },
  {
    icon: UtensilsCrossed,
    title: 'Fine Dining',
    subtitle: 'Global flavors, local ingredients',
  },
  {
    icon: MapPin,
    title: 'Prime Locations',
    subtitle: 'Nature, city & coastal retreats',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted & Safe',
    subtitle: 'Your comfort, our priority',
  },
];

export const FeatureStrip: React.FC = () => {
  return (
    <section
      aria-label="Hotel Benefits"
      className="bg-[#F4F8FC] border-b border-[#DDE7EF] py-7 sm:py-9"
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-0">
          {BENEFITS.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-center gap-3.5 lg:px-5 first:lg:pl-0 last:lg:pr-0 ${
                  idx < BENEFITS.length - 1 ? 'lg:border-r lg:border-[#DDE7EF]' : ''
                }`}
              >
                <div className="w-11 h-11 rounded-xl bg-[#E8F1F8] text-[#06283D] flex items-center justify-center shrink-0">
                  <IconComponent className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-sans text-[13.5px] font-semibold text-[#06283D] leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-[11.5px] text-[#667785] leading-snug mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
