import { SceneId } from '../utils/resortImages';

export interface RoomItem {
  id: string;
  name: string;
  guests: number;
  beds: string;
  pricePerNight: number;
  sizeSqm: number;
  view: string;
  scene: SceneId;
  description: string;
  highlights: string[];
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  schedule: string;
  priceLabel: string;
  scene: SceneId;
  description: string;
  includes: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  location: string;
  staySuite: string;
  rating: number;
  avatarScene: SceneId;
}

export const DESTINATIONS = [
  'Bali, Indonesia',
  'Uluwatu Cliffside, Bali',
  'Amalfi Coast, Italy',
  'Santorini Caldera, Greece',
  'Baa Atoll, Maldives',
  'Big Sur Coast, California',
];

export const ROOMS_DATA: RoomItem[] = [
  {
    id: 'deluxe-room',
    name: 'Deluxe Room',
    guests: 2,
    beds: '1 King Bed',
    pricePerNight: 120,
    sizeSqm: 52,
    view: 'Ocean Horizon & Terrace',
    scene: 'room_deluxe',
    description:
      'Bathed in warm coastal light, our Deluxe Room features floor-to-ceiling sliding glass doors opening onto a private ocean-view balcony, handcrafted teak furnishings, and a marble soaking tub.',
    highlights: [
      'Private ocean-facing balcony with lounge seating',
      'Custom 400-thread-count organic Egyptian cotton linens',
      'Rainforest shower & deep limestone soaking bath',
      'Complimentary sunset aperitif & artisanal minibar',
    ],
    featured: true,
  },
  {
    id: 'ocean-view-suite',
    name: 'Ocean View Suite',
    guests: 3,
    beds: '1 King Bed',
    pricePerNight: 180,
    sizeSqm: 78,
    view: 'Panoramic Cliff & Bay View',
    scene: 'room_ocean_suite',
    description:
      'Designed for lingering mornings and golden-hour evenings, the Ocean View Suite offers wrap-around coastal vistas, a separate sunlit living salon, and bespoke butler service.',
    highlights: [
      'Corner wrap-around glass windows overlooking the bay',
      'Spacious living lounge with convertible daybed for 3rd guest',
      '24-hour dedicated Skyview personal concierge',
      'Daily gourmet breakfast served in-suite or cliffside',
    ],
    featured: true,
  },
  {
    id: 'private-pool-villa',
    name: 'Private Pool Villa',
    guests: 4,
    beds: '2 King Beds',
    pricePerNight: 320,
    sizeSqm: 145,
    view: 'Private Infinity Plunge Pool & Tropical Garden',
    scene: 'room_pool_villa',
    description:
      'An intimate sanctuary nestled among fragrant frangipani palms. Enjoy your own heated turquoise plunge pool, open-air timber dining pavilion, and direct path to the cove beach.',
    highlights: [
      'Private temperature-controlled infinity pool & sun deck',
      'Two master bedrooms with indoor/outdoor rain showers',
      'Private open-air dining bale with chef-on-call option',
      'Complimentary private airport limousine transfer',
    ],
    featured: true,
  },
  {
    id: 'family-suite',
    name: 'Family Suite',
    guests: 5,
    beds: '2 King Beds',
    pricePerNight: 250,
    sizeSqm: 118,
    view: 'Coastal Garden & Ocean Terrace',
    scene: 'room_family_suite',
    description:
      'Generously proportioned for unforgettable family gatherings, combining an expansive L-shaped lounge, dual master suites, and an oversized wraparound terrace.',
    highlights: [
      'Two interconnected luxury bedrooms with en-suite baths',
      'Expansive living room & private dining table for six',
      'Complimentary curated kids coastal explorer program',
      'Priority cabanas at the main cliffside infinity pool',
    ],
    featured: true,
  },
  {
    id: 'skyview-penthouse',
    name: 'Skyview Royal Penthouse',
    guests: 6,
    beds: '3 King Beds',
    pricePerNight: 540,
    sizeSqm: 240,
    view: 'Unobstructed 270° Cliff & Sunset Ocean Panorama',
    scene: 'room_penthouse',
    description:
      'Crowning the highest ridge of the resort, the Skyview Royal Penthouse offers a cantilevered glass-edge infinity pool, private wine cellar, and private spa treatment suite.',
    highlights: [
      'Cantilevered cliff-edge private infinity pool',
      'Private sommelier-curated wine tasting room',
      'In-residence couples spa & dry cedar sauna',
      'Dedicated private chauffeur & yacht charter priority',
    ],
    featured: false,
  },
  {
    id: 'cliffside-bungalow',
    name: 'Cliffside Retreat Bungalow',
    guests: 2,
    beds: '1 King Bed',
    pricePerNight: 210,
    sizeSqm: 68,
    view: 'Dramatic Limestone Cliff & Surf View',
    scene: 'room_cliff_bungalow',
    description:
      'Perched directly above the rhythmic ocean swell, this romantic hideaway blends vernacular timber craft with contemporary luxury and an outdoor starlight bath.',
    highlights: [
      'Suspended cliff-edge hammock & sunset firepit deck',
      'Hand-carved volcanic stone outdoor soaking tub',
      'Acoustic sound system & bespoke aromatherapy bar',
      'Complimentary sunrise yoga & sound-healing session',
    ],
    featured: false,
  },
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: 'spa-wellness',
    title: 'Spa & Wellness',
    subtitle: 'Relax. Rejuvenate.',
    duration: '90 – 180 Minutes',
    schedule: 'Daily · 8:00 AM – 9:00 PM',
    priceLabel: 'From $145 / guest',
    scene: 'exp_spa_wellness',
    description:
      'Surrender to ancient Balinese healing rituals in open-air cliffside treatment pavilions where warm sea breezes and herbal botanical oils restore deep equilibrium.',
    includes: [
      'Warm volcanic stone & frangipani oil massage',
      'Ocean-facing hydrotherapy vitality pools & herbal steam',
      'Private sound-bath meditation & organic wellness elixir',
    ],
  },
  {
    id: 'culinary-journey',
    title: 'Culinary Journey',
    subtitle: 'Taste the world.',
    duration: '7-Course Tasting Menu',
    schedule: 'Nightly · Sunset Seating at 6:00 PM',
    priceLabel: 'From $165 / guest',
    scene: 'exp_culinary',
    description:
      'Savor hyper-local line-caught seafood, heritage botanicals, and rare vintage pairings crafted by our Michelin-trained culinary team on our candlelit ocean terrace.',
    includes: [
      'Seven-course coastal tasting menu with sommelier pairings',
      'Private cliff-edge candlelit table overlooking the cove',
      'Interactive morning market & spice garden tour with the Executive Chef',
    ],
  },
  {
    id: 'adventure-tours',
    title: 'Adventure Tours',
    subtitle: 'Explore more.',
    duration: 'Half-Day or Full-Day',
    schedule: 'Departures at 6:30 AM & 1:30 PM',
    priceLabel: 'From $110 / guest',
    scene: 'exp_adventure',
    description:
      'Trek along dramatic emerald ridge trails, kayak into hidden limestone sea caves, or set sail aboard our private wooden schooner to secluded coral reefs.',
    includes: [
      'Private naturalist guide & bespoke ridge hiking itinerary',
      'Hidden sea-cave kayaking & pristine coral reef snorkeling',
      'Gourmet cliffside sunrise picnic breakfast',
    ],
  },
  {
    id: 'local-culture',
    title: 'Local Culture',
    subtitle: 'Feel the culture.',
    duration: '4 Hours Curated Immersion',
    schedule: 'Tue, Thu, Sat & Sun · 4:00 PM',
    priceLabel: 'From $95 / guest',
    scene: 'exp_culture',
    description:
      'Connect intimately with living island heritage through private twilight temple blessings, traditional gamelan performances, and master artisan workshops.',
    includes: [
      'Private twilight visit to ancient sea temples with cultural historian',
      'Traditional water blessing ceremony & floral offering craft',
      'Twilight royal Rijsttafel feast under temple lanterns',
    ],
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'sarah-mitchell',
    quote:
      '"Skyview Hotel gave us the most beautiful vacation experience! The staff was amazing, the views were breathtaking, and everything was simply perfect."',
    author: 'Sarah Mitchell',
    location: 'United States',
    staySuite: 'Private Pool Villa · Bali Resort',
    rating: 5,
    avatarScene: 'avatar_sarah',
  },
  {
    id: 'marcus-vance',
    quote:
      '"Waking up to the sound of the ocean beneath our cliffside suite and watching the golden sunset from the infinity pool felt like stepping into a dream."',
    author: 'Marcus Vance',
    location: 'United Kingdom',
    staySuite: 'Ocean View Suite · Bali Resort',
    rating: 5,
    avatarScene: 'avatar_marcus',
  },
  {
    id: 'elena-rostova',
    quote:
      '"From the candlelit seven-course coastal dinner to the private temple tour and spa rituals, Skyview redefines effortless five-star hospitality."',
    author: 'Elena Rostova',
    location: 'Switzerland',
    staySuite: 'Deluxe Room · Bali Resort',
    rating: 5,
    avatarScene: 'avatar_elena',
  },
];
