'use client';

import { memo, useCallback, useMemo, useRef, useState } from 'react';
import Map, { MapRef } from 'react-map-gl/mapbox';

import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Pinned } from './pinned';
import { Button } from './ui/button';

const MAX_ZOOM = 10;
const MIN_ZOOM = 4;
const INITIAL_VIEW_STATE = {
  latitude: -22.7852417,
  longitude: -43.3904112,
  zoom: MAX_ZOOM,
};

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Location = memo(function Location() {
  const [currentZoom, setCurrentZoom] = useState(MAX_ZOOM);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const mapRef = useRef<MapRef>(null);

  const { theme } = useTheme();

  const handleZoom = useCallback(
    (zoomIn: boolean) => {
      if (isButtonDisabled) return;

      setCurrentZoom((prevZoom) => {
        const newZoom = prevZoom + (zoomIn ? 1 : -1);
        if (newZoom >= MIN_ZOOM && newZoom <= MAX_ZOOM) {
          zoomIn ? mapRef.current?.zoomIn() : mapRef.current?.zoomOut();
          setIsButtonDisabled(true);
          setTimeout(() => setIsButtonDisabled(false), 300);
          return newZoom;
        }
        return prevZoom;
      });
    },
    [isButtonDisabled],
  );

  const mapStyle = useMemo(() => `mapbox://styles/mapbox/${theme === 'dark' ? 'dark-v11' : 'streets-v12'}`, [theme]);

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="relative size-full">
        <Map
          mapboxAccessToken={mapboxToken}
          mapStyle={mapStyle}
          ref={mapRef}
          scrollZoom={false}
          dragPan={false}
          doubleClickZoom={false}
          attributionControl={false}
          dragRotate={false}
          pitchWithRotate={false}
          touchZoomRotate={false}
          antialias
          onLoad={() => setIsMapLoaded(true)}
          initialViewState={INITIAL_VIEW_STATE}
          maxZoom={MAX_ZOOM}
          minZoom={MIN_ZOOM}
        >
          <Pinned />
          <div className="animate-animated-cloud absolute inset-0 z-30">
            <div className="relative">
              <img className="absolute z-20 opacity-75 h-auto w-[480px]" src="/cloud.png" alt="" loading="lazy" />
              <img
                className="absolute z-10 -translate-x-16 translate-y-28 opacity-15 blur-xs brightness-0 h-auto w-[480px]"
                src="/cloud.png"
                alt="Nuvem"
                loading="lazy"
              />
            </div>
          </div>

          <img
            className="absolute -top-32 animated-plane z-10 object-contain h-auto w-[40px]"
            src="/plane.png"
            alt="Avião"
            loading="lazy"
          />

          {isMapLoaded && (
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between z-30">
              <Button
                onClick={() => handleZoom(false)}
                aria-label="Zoom Out"
                size="icon"
                variant="outline"
                className={cn(currentZoom > MIN_ZOOM ? 'cancel-drag' : 'invisible')}
              >
                <Minus />
              </Button>
              <Button
                onClick={() => handleZoom(true)}
                aria-label="Zoom In"
                size="icon"
                variant="outline"
                className={cn(currentZoom < MAX_ZOOM ? 'cancel-drag' : 'invisible')}
              >
                <Plus />
              </Button>
            </div>
          )}
        </Map>
      </div>
    </div>
  );
});

export default Location;
