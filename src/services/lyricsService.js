// services/lyricsService.js
// This file handles all communication with external APIs
// It's the "service layer" - separating API logic from UI components

// Base URLs for the APIs we're using
const LRCLIB_API_BASE = 'https://lrclib.net/api';  // Free lyrics API, no key needed!
const AUDIODB_API_BASE = 'https://www.theaudiodb.com/api/v1/json/2'; // Artist info API

// Helper function to handle all API responses consistently
const handleResponse = async (response) => {
  // Check if the HTTP request was successful (status 200-299)
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  // First get the response as text to check if it's empty
  // (AudioDB sometimes returns empty responses)
  const text = await response.text();
  if (!text) {
    throw new Error('Empty response from API');
  }
  
  // Try to parse the text as JSON
  try {
    return JSON.parse(text);
  } catch (error) {
    // If JSON parsing fails, log first 100 chars for debugging
    console.error('Invalid JSON response:', text.substring(0, 100));
    throw new Error('Invalid JSON from API');
  }
};

// Fetch lyrics from LRClib.net API
// Parameters: artist name and song title
// Returns: object with full lyrics and a short snippet
export const fetchLyrics = async (artist, title) => {
  try {
    // Build the search URL with query parameters
    // encodeURIComponent() makes the text URL-safe (handles spaces, special chars)
    const url = `${LRCLIB_API_BASE}/search?artist_name=${encodeURIComponent(artist)}&track_name=${encodeURIComponent(title)}`;
    
    // Make the HTTP GET request
    const response = await fetch(url);
    
    // Parse the response using our helper
    const data = await handleResponse(response);
    
    // LRClib returns an array of matching songs
    if (data && data.length > 0) {
      // Take the first match (usually the best match)
      const bestMatch = data[0];
      
      // LRClib provides two types of lyrics:
      // - plainLyrics: regular text
      // - syncedLyrics: with timestamps like [00:45.20]
      let lyrics = bestMatch.plainLyrics;
      
      // If no plain lyrics, extract from synced lyrics
      if (!lyrics && bestMatch.syncedLyrics) {
        // Remove all timestamp tags using regex
        // \[\d{2}:\d{2}\.\d{2}\] matches [00:00.00] format
        lyrics = bestMatch.syncedLyrics.replace(/\[\d{2}:\d{2}\.\d{2}\]/g, '').trim();
      }
      
      if (lyrics) {
        // Split into lines and remove empty ones
        const lines = lyrics.split('\n').filter(line => line.trim());
        // Create a snippet from first 2 lines for preview
        const snippet = lines.slice(0, 2).join(' ');
        
        return {
          fullLyrics: lyrics,
          snippet: snippet || 'No lyrics available',
          duration: bestMatch.duration,  // Song length in seconds
          albumName: bestMatch.albumName
        };
      }
    }
    return null; // No matches found
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    throw error; // Re-throw to let calling code handle it
  }
};

// Fetch artist information from AudioDB
// Parameter: artist name
// Returns: object with biography, genre, image, etc.
export const fetchArtistInfo = async (artistName) => {
  try {
    // AudioDB search endpoint
    const url = `${AUDIODB_API_BASE}/search.php?s=${encodeURIComponent(artistName)}`;
    const response = await fetch(url);
    const data = await handleResponse(response);
    
    // Check if we got artist data
    if (data.artists && data.artists.length > 0) {
      // Take the first artist result
      const artist = data.artists[0];
      
      // Map AudioDB fields to our app's format
      // Using || operator for fallback values if field is null
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
    return null; // No artist found
  } catch (error) {
    console.error('Error fetching artist info:', error);
    throw error;
  }
};

// Fetch album information from AudioDB
// Parameters: artist name and album name
// Returns: object with album details
export const fetchAlbumInfo = async (artistName, albumName) => {
  try {
    // Search for specific album by artist
    const url = `${AUDIODB_API_BASE}/searchalbum.php?s=${encodeURIComponent(artistName)}&a=${encodeURIComponent(albumName)}`;
    const response = await fetch(url);
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

// Fetch track list for an artist
// Note: AudioDB's track endpoint has been unreliable, so this is simplified
export const fetchArtistTracks = async (artistName) => {
  try {
    // Try to get artist info instead (more reliable)
    const url = `${AUDIODB_API_BASE}/search.php?s=${encodeURIComponent(artistName)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.log('AudioDB tracks endpoint not working');
      return [];
    }
    
    const text = await response.text();
    if (!text) {
      console.log('Empty response from AudioDB');
      return [];
    }
    
    const data = JSON.parse(text);
    
    // If we found the artist, return some placeholder tracks
    // (Real track endpoint is broken, so this is a workaround)
    if (data.artists && data.artists.length > 0) {
      return [
        { id: 1, name: 'Top Song 1', album: 'Greatest Hits', genre: data.artists[0].strGenre },
        { id: 2, name: 'Top Song 2', album: 'Greatest Hits', genre: data.artists[0].strGenre }
      ];
    }
    
    return [];
  } catch (error) {
    console.log('Error fetching tracks, returning empty array');
    return []; // Return empty array instead of throwing
  }
};

// Main function for the Random page - fetches a random song with all its data
export const fetchRandomSongData = async () => {
  // Pool of popular songs that are likely to be in both APIs
  // This ensures better success rate than truly random selection
  const songPool = [
    { artist: 'Coldplay', song: 'Yellow' },
    { artist: 'The Beatles', song: 'Hey Jude' },
    { artist: 'Queen', song: 'Bohemian Rhapsody' },
    { artist: 'Adele', song: 'Hello' },
    { artist: 'Ed Sheeran', song: 'Perfect' },
    { artist: 'Imagine Dragons', song: 'Radioactive' },
    { artist: 'Bruno Mars', song: 'Just The Way You Are' },
    { artist: 'Taylor Swift', song: 'Love Story' },
    { artist: 'Maroon 5', song: 'Sugar' },
    { artist: 'OneRepublic', song: 'Counting Stars' },
    { artist: 'The Weeknd', song: 'Blinding Lights' },
    { artist: 'Dua Lipa', song: 'Levitating' },
    { artist: 'Post Malone', song: 'Circles' },
    { artist: 'Billie Eilish', song: 'Bad Guy' },
    { artist: 'Shawn Mendes', song: 'Stitches' }
  ];
  
  // Select a random song from the pool
  const randomIndex = Math.floor(Math.random() * songPool.length);
  const selected = songPool[randomIndex];
  
  console.log('Fetching random song:', selected.artist, '-', selected.song);
  
  try {
    // Fetch both APIs in parallel for efficiency
    // Promise.allSettled won't fail if one API is down
    // It returns an array with {status: 'fulfilled'|'rejected', value/reason}
    const [lyricsResult, artistResult] = await Promise.allSettled([
      fetchLyrics(selected.artist, selected.song),
      fetchArtistInfo(selected.artist)
    ]);
    
    // Extract successful results (might be null if API failed)
    const lyricsData = lyricsResult.status === 'fulfilled' ? lyricsResult.value : null;
    const artistInfo = artistResult.status === 'fulfilled' ? artistResult.value : null;
    
    // Log what worked for debugging
    if (lyricsData) console.log('✅ Lyrics fetched successfully');
    else console.log('❌ Lyrics not available');
    
    if (artistInfo) console.log('✅ Artist info fetched successfully');
    else console.log('❌ Artist info not available');
    
    // Return combined data object
    // Uses || operator for fallback values if API data is missing
    return {
      id: Date.now(), // Unique ID using timestamp
      lyric: lyricsData?.snippet || `Now playing: ${selected.song}`,
      fullLyrics: lyricsData?.fullLyrics || '',
      artist: selected.artist,
      song: selected.song,
      album: lyricsData?.albumName || '',
      genre: artistInfo?.genre || 'Music', // Default to 'Music' if no genre
      artistInfo: artistInfo // Might be null if AudioDB is down
    };
  } catch (error) {
    console.error('Error fetching random song data:', error);
    throw error; // Re-throw for hook to handle
  }
};