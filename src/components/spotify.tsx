'use client';

import { useEffect } from 'react';

import { Pulse } from '@/components/ui/pulse';
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
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function Spotify() {
  const { data, isLoading, error } = useSWR<SpotifyTrack>('/api/now-playing', fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      mutate('/api/now-playing'); // Força atualização
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 bg-accent/50">
        <div className="absolute inset-0 h-full w-full bg-accent/50" />
        <div className="absolute inset-0 bg-muted" />
        <div className="z-10 absolute top-0 left-0 p-4 flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-gray-400" />
          <div className="h-4 w-40 rounded bg-gray-400" />
        </div>
        <div className="z-10 absolute bottom-0 left-0 p-4 flex items-center gap-2">
          <div className="h-4 w-48 rounded bg-gray-400" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
        <Image
          src="/case.png"
          alt="Capa do álbum"
          width={400}
          height={400}
          className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5" />
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
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5" />
          <h3 className="z-10 text-sm font-medium absolute top-0 left-0 p-4 flex items-center gap-2">
            <Pulse />
            {data?.title || 'Local não definido'}, {data?.artist}
          </h3>
          <h3 className="z-10 text-sm font-medium absolute bottom-0 left-0 p-4 flex items-center gap-2">
            {data?.album}
          </h3>
          <a
            href={data?.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 text-sm font-medium absolute bottom-0 right-0 p-4 flex items-center gap-2"
          >
            <SquareArrowOutUpRight size={14} />
            Abrir no Spotify
          </a>
        </div>
      ) : (
        <div className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
          <Image
            src="/case.png"
            alt="Capa do álbum"
            width={400}
            height={400}
            className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5" />
          <h3 className="z-10 text-sm font-medium absolute top-0 left-0 p-4 flex items-center gap-2">
            <Pulse color="red" />
            Nada tocando no momento.
          </h3>
          <h3 className="z-10 text-sm font-medium absolute bottom-0 left-0 p-4 flex items-center gap-2">
            Um silêncio confortável.
          </h3>
        </div>
      )}
    </>
  );
}
