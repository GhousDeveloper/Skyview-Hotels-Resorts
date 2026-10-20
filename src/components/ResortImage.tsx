import React, { useState } from 'react';
import { getResortImage, SceneId } from '../utils/resortImages';

export const SCENE_PHOTO_PATHS: Record<SceneId, string> = {
  hero_resort_sunset: '/images/hero_resort_sunset.jpg',
  room_deluxe: '/images/room_deluxe.jpg',
  room_ocean_suite: '/images/room_ocean_suite.jpg',
  room_pool_villa: '/images/room_pool_villa.jpg',
  room_family_suite: '/images/room_family_suite.jpg',
  room_penthouse: '/images/room_penthouse.jpg',
  room_cliff_bungalow: '/images/room_cliff_bungalow.jpg',
  destination_beach_resort: '/images/destination_beach_resort.jpg',
  exp_spa_wellness: '/images/exp_spa_wellness.jpg',
  exp_culinary: '/images/exp_culinary.jpg',
  exp_adventure: '/images/exp_adventure.jpg',
  exp_culture: '/images/exp_culture.jpg',
  advantage_sunset_pool: '/images/advantage_sunset_pool.jpg',
  offer_banner_sunset: '/images/offer_banner_sunset.jpg',
  avatar_sarah: '/images/avatar_sarah.jpg',
  avatar_marcus: '/images/avatar_marcus.jpg',
  avatar_elena: '/images/avatar_elena.jpg',
};

interface ResortImageProps {
  scene: SceneId;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: 'eager' | 'lazy';
}

export const ResortImage: React.FC<ResortImageProps> = ({
  scene,
  alt,
  className = '',
  imgClassName = '',
  loading = 'eager',
}) => {
  const [useFallback, setUseFallback] = useState(false);

  const primarySrc = SCENE_PHOTO_PATHS[scene];
  const fallbackSrc = useFallback ? getResortImage(scene) : '';
  const activeSrc = useFallback ? fallbackSrc : primarySrc;

  return (
    <div className={`relative overflow-hidden bg-[#0B2D45] ${className}`}>
      <img
        src={activeSrc}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        onError={() => {
          if (!useFallback) {
            setUseFallback(true);
          }
        }}
        className={`w-full h-full object-cover block ${imgClassName}`}
      />
    </div>
  );
};
