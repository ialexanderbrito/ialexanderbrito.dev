'use client';

import { useEffect } from 'react';

import { Pulse } from '@/components/ui/pulse';
import { formatLastPlayed } from '@/utils/formatLastPlayed';
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
  const { data, isLoading, error } = useSWR<SpotifyTrack>(
    '/api/now-playing',
    fetcher,
    {
      refreshInterval: ONE_MINUTE,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  );

  useEffect(() => {
    const interval = setInterval(() => {
      mutate('/api/now-playing'); // Força atualização
    }, ONE_MINUTE);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="group relative flex flex-col overflow-hidden rounded-[15px] w-full h-[176px] bg-muted/20 animate-pulse border border-border/50">
        <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10">
          <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
          <div className="h-3 w-24 rounded bg-muted-foreground/30" />
        </div>
        <div className="absolute bottom-4 right-4 h-8 w-32 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10" />
      </div>
    );
  }

  if (error || data?.message || data?.error) {
    return (
      <div className="relative flex flex-col overflow-hidden rounded-[15px] w-full h-[176px] border border-border/50 group bg-muted/20">
        <img
          src="/case.png"
          alt="Capa do álbum de erro"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale"
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="absolute top-3 left-3 pr-3 w-full z-10 pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/60 border border-white/20 shadow-sm text-xs font-medium text-white w-fit max-w-[95%]">
            <Pulse color="red" />
            <span className="truncate">Algo deu errado. Tente mais tarde.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {data && data.isPlaying ? (
        <div className="relative flex flex-col overflow-hidden rounded-[15px] w-full h-[176px] border border-border/50 group bg-muted/20">
          <img
            src={data?.albumImageUrl || '/case.png'}
            alt={`Capa do álbum ${data?.album}`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />

          <div className="absolute top-3 left-3 pr-3 w-full z-10 pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/60 border border-white/20 shadow-sm text-xs font-medium text-white w-fit max-w-[95%]">
              <Pulse color="green" />
              <span className="truncate">
                Tocando: {data?.title} • {data?.artist}
              </span>
            </div>
          </div>

          {data?.songUrl && (
            <div className="absolute bottom-4 right-4 z-20">
              <a
                href={data.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Abrir ${data.title} no Spotify`}
                className="flex items-center justify-center h-9 w-9 rounded-full backdrop-blur-md bg-black/40 border border-white/20 text-white/90 hover:text-[#1DB954] hover:bg-black/60 transition-all shadow-sm hover:scale-105 active:scale-95"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="relative flex flex-col overflow-hidden rounded-[15px] w-full h-[176px] border border-border/50 group bg-muted/20">
          <img
            src={data?.albumImageUrl || '/case.png'}
            alt={`Capa do álbum ${data?.album}`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale"
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

          <div className="absolute top-3 left-3 pr-3 w-full flex flex-col gap-1.5 z-10 pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/60 border border-white/20 shadow-sm text-xs font-medium text-white w-fit max-w-[95%]">
              <Pulse color="red" />
              <span className="truncate">
                Última: {data?.title} • {data?.artist}
              </span>
            </div>
            <div className="flex items-center px-3 py-1.5 rounded-full backdrop-blur-md bg-black/60 border border-white/20 shadow-sm text-[10px] font-medium text-white/80 w-fit">
              {formatLastPlayed(data?.lastPlayed)}
            </div>
          </div>

          {data?.songUrl && (
            <div className="absolute bottom-4 right-4 z-20">
              <a
                href={data.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Abrir ${data.title} no Spotify`}
                className="flex items-center justify-center h-9 w-9 rounded-full backdrop-blur-md bg-black/40 border border-white/20 text-white/90 hover:text-[#1DB954] hover:bg-black/60 transition-all shadow-sm hover:scale-105 active:scale-95"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
}
