'use client';

import { memo, useCallback, useMemo, useRef, useState } from 'react';
import Map, { MapRef } from 'react-map-gl/mapbox';

import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Pinned } from './pinned';
import { Button } from './ui/button';

const MAX_ZOOM = 4;
const MIN_ZOOM = 4;
const INITIAL_VIEW_STATE = {
  latitude: -22.7852417,
  longitude: -43.3904112,
  zoom: MAX_ZOOM,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
  width: 600,
  height: 400,
};

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Location = memo(function Location() {
  const [currentZoom, setCurrentZoom] = useState(MAX_ZOOM);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  const mapRef = useRef<MapRef>(null);

  const { theme, resolvedTheme } = useTheme();

  const effectiveTheme = theme === 'system' ? resolvedTheme : theme;
  const mapStyle = useMemo(
    () =>
      `mapbox://styles/mapbox/${effectiveTheme === 'dark' ? 'dark-v11' : 'light-v11'}`,
    [effectiveTheme],
  );

  const handleMove = useCallback((evt: any) => {
    setViewState((prev) => ({
      ...prev,
      ...evt.viewState,
      bearing: evt.viewState.bearing ?? 0,
      pitch: evt.viewState.pitch ?? 0,
      padding: evt.viewState.padding ?? {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      width: prev.width,
      height: prev.height,
    }));
  }, []);

  const handleZoom = useCallback(
    (zoomIn: boolean) => {
      if (isButtonDisabled) return;
      setCurrentZoom((prevZoom) => {
        const newZoom = prevZoom + (zoomIn ? 1 : -1);
        if (newZoom >= MIN_ZOOM && newZoom <= MAX_ZOOM) {
          if (zoomIn) {
            mapRef.current?.zoomIn();
          } else {
            mapRef.current?.zoomOut();
          }
          setIsButtonDisabled(true);
          setTimeout(() => setIsButtonDisabled(false), 300);
          return newZoom;
        }
        return prevZoom;
      });
    },
    [isButtonDisabled],
  );

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden border border-border/50 shadow-sm group bg-muted/20">
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
          viewState={viewState}
          onMove={handleMove}
        >
          <Pinned />

          {/* Clouds Layer */}
          <div className="animate-animated-cloud absolute inset-0 z-20 pointer-events-none">
            <div className="relative">
              <img
                className="absolute z-20 opacity-70 h-auto w-[480px]"
                src="/cloud.png"
                alt=""
                loading="lazy"
              />
              <img
                className="absolute z-10 -translate-x-16 translate-y-28 opacity-20 blur-sm brightness-0 h-auto w-[480px]"
                src="/cloud.png"
                alt=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Plane Layer */}
          <img
            className="absolute -top-32 animated-plane z-10 object-contain h-auto w-10 pointer-events-none"
            src="/plane.png"
            alt=""
            loading="lazy"
          />

          {/* Premium Vignette/Gradient overlay for depth */}
          <div className="absolute inset-0 z-30 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]" />

          {isMapLoaded && (
            <>
              {/* Modern Glassmorphism Badge */}
              <div className="absolute top-3 left-3 z-40 pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-background/70 border border-border/50 shadow-sm text-xs font-medium text-foreground transition-transform hover:scale-105">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Rio de Janeiro, BR
                </div>
              </div>

              {/* Stacked Glassmorphic Controls */}
              <div className="absolute right-3 bottom-3 flex flex-col gap-1.5 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleZoom(true);
                  }}
                  aria-label="Zoom In"
                  size="icon"
                  variant="outline"
                  className={cn(
                    'backdrop-blur-md bg-background/70 border-border/50 hover:bg-background/90 rounded-full h-8 w-8 shadow-sm transition-transform active:scale-95',
                    currentZoom < MAX_ZOOM ? 'cancel-drag' : 'hidden',
                  )}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleZoom(false);
                  }}
                  aria-label="Zoom Out"
                  size="icon"
                  variant="outline"
                  className={cn(
                    'backdrop-blur-md bg-background/70 border-border/50 hover:bg-background/90 rounded-full h-8 w-8 shadow-sm transition-transform active:scale-95',
                    currentZoom > MIN_ZOOM ? 'cancel-drag' : 'hidden',
                  )}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </Map>
      </div>
    </div>
  );
});

export default Location;
