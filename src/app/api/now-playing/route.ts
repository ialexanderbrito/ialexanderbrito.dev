import { NextResponse } from 'next/server';

interface SpotifyTrack {
  name: string;
  album: {
    name: string;
    artists: Array<{ name: string }>;
    images: Array<{ url: string }>;
  };
  external_urls: {
    spotify: string;
  };
}

interface SpotifyApi {
  is_playing: boolean;
  currently_playing_type?: string;
  item?: SpotifyTrack;
  items?: Array<{ track: SpotifyTrack }>;
}

export const dynamic = 'force-dynamic';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN ?? '';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const SPOTIFY_RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

const getBasicToken = () => Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

const getAccessToken = async (): Promise<string> => {
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${getBasicToken()}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }).toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error fetching access token', errorData);
    throw new Error(`Failed to fetch access token: ${errorData.error}`);
  }

  const data = await response.json();
  return data.access_token;
};

const fetchSpotifyData = async (url: string, accessToken: string): Promise<SpotifyApi> => {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    console.error(`Failed to fetch data from ${url}`, errorDetails);
    throw new Error(`Failed to fetch data from ${url}: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

const formatResponse = (data: SpotifyApi) => {
  const track = data.item ?? data.items?.[0]?.track;
  if (!track) {
    throw new Error('No track data available');
  }

  return {
    isPlaying: data.is_playing || false,
    title: track.name,
    album: track.album.name,
    artist: track.album.artists.map((artist) => artist.name).join(', '),
    albumImageUrl: track.album.images[0]?.url,
    songUrl: track.external_urls.spotify,
  };
};

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    let data = await fetchSpotifyData(SPOTIFY_NOW_PLAYING_URL, accessToken);

    // Verificar se a resposta tem conteúdo válido
    if (!data.is_playing || data.currently_playing_type !== 'track') {
      console.warn('Usuário não está ouvindo uma faixa. Buscando última faixa reproduzida.');
      data = await fetchSpotifyData(SPOTIFY_RECENTLY_PLAYED_URL, accessToken);
    }

    const response = NextResponse.json(formatResponse(data));
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error) {
    console.error('Failed to fetch data from Spotify:', error);
    return NextResponse.json({ error: error || 'Failed to fetch data from Spotify' }, { status: 500 });
  }
}
