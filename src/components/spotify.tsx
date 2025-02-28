'use client';

import { useEffect } from 'react';

import { Pulse } from '@/components/ui/pulse';
import { formatLastPlayed } from '@/utils/formatLastPlayed';
import { SquareArrowOutUpRight } from 'lucide-react';
import Image from 'next/image';
import useSWR, { mutate } from 'swr';

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
      <div className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 bg-accent/50">
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
      <div className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
        <div className="absolute inset-0 h-[400px] w-[400px] object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
        <div className="absolute inset-0 bg-linear-to-b from-gray-900/25 to-gray-900/5" />
        <h3 className="z-10 text-sm font-medium absolute top-0 left-0 p-4 flex items-center gap-2">
          <Pulse color="red" />
          Algo deu errado.
        </h3>
        <h3 className="z-10 text-sm font-medium absolute bottom-0 left-0 p-4 flex items-center gap-2">
          Tente novamente mais tarde.
        </h3>
      </div>
    );
  }

  if (data?.message || data?.error) {
    return (
      <div className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
        <Image
          src="/case.png"
          alt={`Capa do álbum`}
          width={400}
          height={400}
          className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out grayscale opacity-50"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-b from-gray-900/25 to-gray-900/5" />
        <h3 className="z-10 text-sm font-medium absolute top-0 left-0 p-4 flex items-center gap-2">
          <Pulse color="red" />
          Algo deu errado.
        </h3>
        <h3 className="z-10 text-sm font-medium absolute bottom-0 left-0 p-4 flex items-center gap-2">
          Tente novamente mais tarde.
        </h3>
      </div>
    );
  }

  return (
    <>
      {data && data.isPlaying ? (
        <div className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
          <Image
            src={data?.albumImageUrl || '/case.png'}
            alt={`Capa do álbum ${data?.album}`}
            width={400}
            height={400}
            className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-b from-gray-900/25 to-gray-900/5" />
          <h3 className="z-10 text-sm font-medium absolute top-0 left-0 p-4 flex items-center gap-2">
            <Pulse />
            {data?.title}, {data?.artist}
          </h3>
          <h3 className="z-10 text-sm font-medium absolute bottom-8 left-0 p-4 flex items-center gap-2">
            {data?.album}
          </h3>
          <a
            href={data?.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 text-sm font-medium absolute bottom-0 left-0 p-4 flex items-center gap-2"
          >
            <SquareArrowOutUpRight size={14} />
            Abrir no Spotify
          </a>
        </div>
      ) : (
        <div className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
          <Image
            src={data?.albumImageUrl || '/case.png'}
            alt="Capa do álbum"
            width={400}
            height={400}
            className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out grayscale opacity-50"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-b from-gray-900/25 to-gray-900/5" />
          <h3 className="z-10 text-sm font-medium absolute top-0 left-0 p-4 flex items-center gap-2">
            <Pulse color="red" />
            Última música: <br />
            {data?.title}, {data?.artist} • {formatLastPlayed(data?.lastPlayed)}
          </h3>
          <h3 className="z-10 text-sm font-medium absolute bottom-8 left-0 p-4 flex items-center gap-2">
            {data?.album}
          </h3>
          <a
            href={data?.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 text-sm font-medium absolute bottom-0 left-0 p-4 flex items-center gap-2"
          >
            <SquareArrowOutUpRight size={14} />
            Abrir no Spotify
          </a>
        </div>
      )}
    </>
  );
}
