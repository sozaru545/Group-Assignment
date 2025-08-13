// services/lyricsServiceWithProxy.js
// Alternative service using CORS proxy for development

// CORS Proxy options (choose one that works)
// Option 1: AllOrigins (usually reliable)
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
// Option 2: Alternative proxy (backup)
// const CORS_PROXY = 'https://corsproxy.io/?';

// Base URLs for the APIs
const LYRICS_API_BASE = 'https://api.lyrics.ovh/v1';
const AUDIODB_API_BASE = 'https://www.theaudiodb.com/api/v1/json/2';

// Helper to add proxy to URL
const proxyUrl = (url) => {
  // AudioDB usually doesn't need proxy, but Lyrics.ovh does
  if (url.includes('lyrics.ovh')) {
    console.log('Using proxy for:', url);
    return CORS_PROXY + encodeURIComponent(url);
  }
  return url;
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Response Error:', response.status, errorText);
    throw new Error(`API Error: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

// Fetch lyrics from Lyrics.ovh API with proxy
export const fetchLyrics = async (artist, title) => {
  try {
    console.log('Fetching lyrics for:', artist, title);
    const url = `${LYRICS_API_BASE}/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`;
    const proxiedUrl = proxyUrl(url);
    
    const response = await fetch(proxiedUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    const data = await handleResponse(response);
    
    if (data.lyrics) {
      const lines = data.lyrics.split('\n').filter(line => line.trim());
      const snippet = lines.slice(0, 2).join(' ');
      return {
        fullLyrics: data.lyrics,
        snippet: snippet || 'No lyrics available'
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    
    // Try without proxy as fallback
    try {
      console.log('Retrying without proxy...');
      const url = `${LYRICS_API_BASE}/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.lyrics) {
        const lines = data.lyrics.split('\n').filter(line => line.trim());
        const snippet = lines.slice(0, 2).join(' ');
        return {
          fullLyrics: data.lyrics,
          snippet: snippet || 'No lyrics available'
        };
      }
    } catch (retryError) {
      console.error('Retry also failed:', retryError);
    }
    
    throw error;
  }
};

// Fetch artist information from AudioDB (usually doesn't need proxy)
export const fetchArtistInfo = async (artistName) => {
  try {
    console.log('Fetching artist info for:', artistName);
    const url = `${AUDIODB_API_BASE}/search.php?s=${encodeURIComponent(artistName)}`;
    
    // AudioDB usually works without proxy, try direct first
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    const data = await handleResponse(response);
    
    if (data.artists && data.artists.length > 0) {
      const artist = data.artists[0];
      console.log('Artist found:', artist.strArtist);
      return {
        name: artist.strArtist,
        biography: artist.strBiographyEN,
        genre: artist.strGenre,
        formed: artist.intFormedYear,
        website: artist.strWebsite,
        image: artist.strArtistThumb,
        country: artist.strCountry
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching artist info:', error);
    throw error;
  }
};

// Fetch album information from AudioDB
export const fetchAlbumInfo = async (artistName, albumName) => {
  try {
    const url = `${AUDIODB_API_BASE}/searchalbum.php?s=${encodeURIComponent(artistName)}&a=${encodeURIComponent(albumName)}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    const data = await handleResponse(response);
    
    if (data.album && data.album.length > 0) {
      const album = data.album[0];
      return {
        name: album.strAlbum,
        year: album.intYearReleased,
        image: album.strAlbumThumb,
        description: album.strDescriptionEN
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching album info:', error);
    throw error;
  }
};

// Simplified track fetching
export const fetchArtistTracks = async (artistName) => {
  try {
    // For simplicity, just return empty array if it fails
    // The AudioDB track endpoint is complex and requires multiple calls
    console.log('Track fetching not fully implemented yet');
    return [];
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return [];
  }
};

// Combined function to fetch random song with lyrics and artist info
export const fetchRandomSongData = async () => {
  const songPool = [
    { artist: 'Coldplay', song: 'Yellow' },
    { artist: 'The Beatles', song: 'Let It Be' },
    { artist: 'Queen', song: 'We Will Rock You' },
    { artist: 'Adele', song: 'Hello' },
    { artist: 'Ed Sheeran', song: 'Perfect' },
    { artist: 'Imagine Dragons', song: 'Radioactive' },
    { artist: 'Maroon 5', song: 'Sugar' },
    { artist: 'OneRepublic', song: 'Counting Stars' }
  ];
  
  const randomIndex = Math.floor(Math.random() * songPool.length);
  const selected = songPool[randomIndex];
  
  console.log('Selected random song:', selected);
  
  try {
    // Fetch both in parallel, but don't fail if one doesn't work
    const [artistInfo, lyricsData] = await Promise.allSettled([
      fetchArtistInfo(selected.artist),
      fetchLyrics(selected.artist, selected.song)
    ]);
    
    const artist = artistInfo.status === 'fulfilled' ? artistInfo.value : null;
    const lyrics = lyricsData.status === 'fulfilled' ? lyricsData.value : null;
    
    // If we got at least some data, use it
    if (artist || lyrics) {
      return {
        id: Date.now(),
        lyric: lyrics?.snippet || `Now playing: ${selected.song}`,
        fullLyrics: lyrics?.fullLyrics || '',
        artist: selected.artist,
        song: selected.song,
        genre: artist?.genre || 'Music',
        artistInfo: artist
      };
    }
    
    throw new Error('Could not fetch any API data');
  } catch (error) {
    console.error('Error in fetchRandomSongData:', error);
    throw error;
  }
};