'use client';
import { useEffect, useState } from 'react';

import { Pulse } from '@/components/ui/pulse';
import { SquareArrowOutUpRight } from 'lucide-react';
import Image from 'next/image';

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  album: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
}

export function Spotify() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);

  async function nowPlaying() {
    const response = await fetch('/api/now-playing');
    const data = await response.json();

    setTrack(data);
  }

  useEffect(() => {
    nowPlaying();
  }, []);

  return (
    <>
      {track && track.isPlaying ? (
        <div className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
          <Image
            src={track?.albumImageUrl}
            alt={`Capa do álbum ${track?.album}`}
            width={400}
            height={400}
            className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5" />
          <h3 className="z-10 text-sm font-medium absolute top-0 left-0 p-4 flex items-center gap-2">
            <Pulse />
            {track?.title || 'Local não definido'}, {track?.artist}
          </h3>
          <h3 className="z-10 text-sm font-medium absolute bottom-0 left-0 p-4 flex items-center gap-2">
            {track?.album}
          </h3>
          <a
            href={track?.songUrl}
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
            alt={`Capa do álbum ${track?.album}`}
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
