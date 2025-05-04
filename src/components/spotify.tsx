'use client';

import { useEffect } from 'react';

import { Pulse } from '@/components/ui/pulse';
import { formatLastPlayed } from '@/utils/formatLastPlayed';
import useSWR, { mutate } from 'swr';

import TiltedCard from './ui/tilted-card';

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  album: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
  message?: string;
  error?: string;
  lastPlayed?: string;
}

export const dynamic = 'force-dynamic';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ONE_MINUTE = 60000;

export default function Spotify() {
  const { data, isLoading, error } = useSWR<SpotifyTrack>('/api/now-playing', fetcher, {
    refreshInterval: ONE_MINUTE,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      mutate('/api/now-playing'); // Força atualização
    }, ONE_MINUTE);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 bg-accent/50 w-full">
        <div className="absolute inset-0 h-full w-full bg-accent/50" />
        <div className="absolute inset-0 bg-muted" />
        <div className="z-10 absolute top-0 left-0 p-4 flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-gray-400" />
          <div className="h-4 w-20 rounded bg-gray-400 sm:w-32 md:w-40 lg:w-48" />
        </div>
        <div className="z-10 absolute bottom-0 left-0 p-4 flex items-center gap-2">
          <div className="h-4 w-28 rounded bg-gray-400 sm:w-32 md:w-40 lg:w-48" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <TiltedCard
        imageSrc={'/case.png'}
        altText={`Capa do álbum ${data?.album}`}
        captionText={`${data?.title}, ${data?.artist}`}
        containerHeight={176}
        containerWidth={'100%'}
        imageHeight={176}
        imageWidth={'100%'}
        rotateAmplitude={12}
        scaleOnHover={1.05}
        showMobileWarning={false}
        showTooltip={false}
        displayOverlayContent={true}
        showSpotifyButton={false}
        disabled={true}
        overlayContent={
          <div className="pt-4 pl-2 pr-2 w-full">
            <span className="flex items-center gap-2">
              <Pulse color="red" />
              Algo deu errado. Tente novamente mais tarde.
            </span>
          </div>
        }
      />
    );
  }

  if (data?.message || data?.error) {
    return (
      <TiltedCard
        imageSrc={'/case.png'}
        altText={`Capa do álbum ${data?.album}`}
        captionText={`${data?.title}, ${data?.artist}`}
        containerHeight={176}
        containerWidth={'100%'}
        imageHeight={176}
        imageWidth={'100%'}
        rotateAmplitude={12}
        scaleOnHover={1.05}
        showMobileWarning={false}
        showTooltip={false}
        displayOverlayContent={true}
        showSpotifyButton={false}
        disabled={true}
        overlayContent={
          <div className="pt-4 pl-2 pr-2 w-full">
            <span className="flex items-center gap-2">
              <Pulse color="red" />
              Algo deu errado. Tente novamente mais tarde.
            </span>
          </div>
        }
      />
    );
  }

  return (
    <>
      {data && data.isPlaying ? (
        <TiltedCard
          imageSrc={data?.albumImageUrl || '/case.png'}
          altText={`Capa do álbum ${data?.album}`}
          captionText={`${data?.title}, ${data?.artist}`}
          containerHeight={176}
          containerWidth={'100%'}
          imageHeight={176}
          imageWidth={'100%'}
          rotateAmplitude={12}
          scaleOnHover={1.05}
          showMobileWarning={false}
          showTooltip={false}
          displayOverlayContent={true}
          spotifyUrl={data?.songUrl}
          spotifyTitle={data?.title}
          showSpotifyButton={true}
          overlayContent={
            <div className="pt-4 pl-2 pr-2 w-full">
              <span className="flex items-center gap-2">
                <Pulse color="green" />
                Tocando agora: {data?.title}, {data?.artist}
              </span>
            </div>
          }
        />
      ) : (
        <TiltedCard
          imageSrc={data?.albumImageUrl || '/case.png'}
          altText={`Capa do álbum ${data?.album}`}
          captionText={`${data?.title}, ${data?.artist}`}
          containerHeight={176}
          containerWidth={'100%'}
          imageHeight={176}
          imageWidth={'100%'}
          rotateAmplitude={12}
          scaleOnHover={1.05}
          showMobileWarning={false}
          showTooltip={false}
          displayOverlayContent={true}
          spotifyUrl={data?.songUrl}
          spotifyTitle={data?.title}
          showSpotifyButton={true}
          disabled={true}
          overlayContent={
            <div className="pt-4 pl-2 pr-2 w-full">
              <span className="flex items-center gap-2">
                <Pulse color="red" />
                Última música: {data?.title}, {data?.artist} • {formatLastPlayed(data?.lastPlayed)}
              </span>
            </div>
          }
        />
      )}
    </>
  );
}
