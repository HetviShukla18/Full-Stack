const API_BASE = 'https://api.themoviedb.org/3';
const RAW_KEY = import.meta.env.VITE_TMDB_API_KEY;
// Remove optional wrapping quotes and trim whitespace
const API_KEY = (RAW_KEY || '').trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '');

const looksLikeV4Token = (token) => typeof token === 'string' && token.startsWith('eyJ'); // JWT style
const IS_V4 = looksLikeV4Token(API_KEY);

if (!API_KEY) {
  // eslint-disable-next-line no-console
  console.warn('VITE_TMDB_API_KEY is not set. Create .env.local and set VITE_TMDB_API_KEY=YOUR_KEY');
} else if (IS_V4) {
  // eslint-disable-next-line no-console
  console.info('Using TMDB v4 access token via Authorization header.');
}

const withKey = (path, params = {}) => {
  const url = new URL(API_BASE + path);
  if (!IS_V4) {
    // v3 API key via query param
    url.searchParams.set('api_key', API_KEY || '');
  }
  url.searchParams.set('language', params.language || 'en-US');
  Object.entries(params).forEach(([k, v]) => {
    if (k !== 'language' && v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  });
  return url.toString();
};

export const imageBase = {
  original: 'https://image.tmdb.org/t/p/original',
  w500: 'https://image.tmdb.org/t/p/w500',
};

export async function fetchJSON(url) {
  const headers = {};
  if (IS_V4) {
    headers.Authorization = `Bearer ${API_KEY}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`TMDB error ${res.status}`);
  return res.json();
}

export const requests = {
  trending: (type = 'all') => withKey(`/trending/${type}/week`),
  topRated: (type = 'movie') => withKey(`/${type}/top_rated`),
  popular: (type = 'movie') => withKey(`/${type}/popular`),
  nowPlaying: () => withKey('/movie/now_playing'),
  upcoming: () => withKey('/movie/upcoming'),
  byGenre: (genreId, type = 'movie') => withKey(`/discover/${type}`, { with_genres: genreId }),
  details: (type, id) => withKey(`/${type}/${id}`),
  videos: (type, id) => withKey(`/${type}/${id}/videos`),
  search: (query) => withKey('/search/multi', { query }),
};

export async function getTrailerKey(type, id) {
  try {
    const data = await fetchJSON(requests.videos(type, id));
    const trailer = data.results?.find(
      (v) => v.type === 'Trailer' && v.site === 'YouTube'
    ) || data.results?.find((v) => v.site === 'YouTube');
    return trailer?.key || null;
  } catch (e) {
    return null;
  }
}

export function getItemType(item) {
  // item can be movie or tv
  if (item.media_type) return item.media_type;
  return item.first_air_date ? 'tv' : 'movie';
}
