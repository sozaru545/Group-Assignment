// views/Search.js
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LyricCard from '../components/LyricCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorDisplay from '../components/ErrorDisplay';
import { mockLyrics } from '../utils/mockData';

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const [query, setQuery] = useState(params.get('q') || '');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [location.search]);

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsUsingMockData(false);

    try {
      // Try to search using LRClib API directly
      const searchUrl = `https://lrclib.net/api/search?q=${encodeURIComponent(searchQuery)}`;
      const response = await fetch(searchUrl);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data && data.length > 0) {
          // Remove duplicates based on artist + track combination
          const uniqueTracks = [];
          const seen = new Set();
          
          for (const item of data) {
            const key = `${item.artistName}-${item.trackName}`.toLowerCase();
            if (!seen.has(key)) {
              seen.add(key);
              uniqueTracks.push(item);
            }
          }
          
          // Convert LRClib results to our format
          const lrcResults = uniqueTracks.slice(0, 10).map(item => {
            // Get a better lyric snippet
            let lyricSnippet = 'Lyrics available';
            
            if (item.plainLyrics) {
              const lines = item.plainLyrics.split('\n').filter(line => line.trim());
              // Take first 2 lines for a better preview
              lyricSnippet = lines.slice(0, 2).join(' / ');
              if (lyricSnippet.length > 150) {
                lyricSnippet = lyricSnippet.substring(0, 150) + '...';
              }
            } else if (item.syncedLyrics) {
              // Remove timestamps from synced lyrics
              const cleanLyrics = item.syncedLyrics.replace(/\[\d{2}:\d{2}\.\d{2}\]/g, '').trim();
              const lines = cleanLyrics.split('\n').filter(line => line.trim());
              lyricSnippet = lines.slice(0, 2).join(' / ');
              if (lyricSnippet.length > 150) {
                lyricSnippet = lyricSnippet.substring(0, 150) + '...';
              }
            }
            
            return {
              id: item.id || Date.now() + Math.random(),
              lyric: lyricSnippet,
              artist: item.artistName,
              song: item.trackName,
              album: item.albumName || 'Unknown Album',
              duration: item.duration,
              genre: 'Music'
            };
          });
          
          setResults(lrcResults);
          console.log('✅ Found', lrcResults.length, 'unique results from LRClib');
        } else {
          // No results from API, fall back to mock data
          throw new Error('No API results');
        }
      } else {
        throw new Error('API request failed');
      }
    } catch (apiError) {
      console.warn('API search failed, using mock data:', apiError.message);
      
      // Fallback to mock data search
      const filtered = mockLyrics.filter(
        item => 
          item.artist.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.song.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.lyric && item.lyric.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      setResults(filtered);
      setIsUsingMockData(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    // Clear error when user starts typing
    if (error) setError(null);
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <h1>Search Mode</h1>
        
        {isUsingMockData && results.length > 0 && (
          <div style={{ 
            padding: '0.5em', 
            background: 'var(--card)', 
            borderRadius: '8px',
            marginBottom: '1em' 
          }}>
            <small>Using offline search (API unavailable)</small>
          </div>
        )}
        
        <form onSubmit={handleSearch} style={{ marginBottom: '2em' }}>
          <div style={{ display: 'flex', gap: '0.5em' }}>
            <input
              type="text"
              placeholder="Search artists or songs..."
              value={query}
              onChange={handleInputChange}
              style={{
                flex: 1,
                padding: '0.75em',
                fontSize: '1em',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                background: 'var(--card)',
                color: 'var(--text)'
              }}
            />
            <button 
              type="submit"
              disabled={isLoading || !query.trim()}
              style={{
                padding: '0.75em 1.5em',
                fontSize: '1em',
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: isLoading ? 'wait' : 'pointer',
                opacity: isLoading || !query.trim() ? 0.6 : 1
              }}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
        
        {error && <ErrorDisplay message={error} />}
        
        {isLoading && (
          <div className="results">
            <LoadingSkeleton height="100px" style={{ marginBottom: '1em' }} />
            <LoadingSkeleton height="100px" style={{ marginBottom: '1em' }} />
            <LoadingSkeleton height="100px" />
          </div>
        )}
        
        {!isLoading && query && results.length === 0 && (
          <p>No results found for "{query}". Try searching for different artists or songs.</p>
        )}
        
        {!isLoading && results.length > 0 && (
          <div className="results">
            <p style={{ marginBottom: '1em' }}>
              Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </p>
            {results.map(item => (
              <div key={item.id} style={{ marginBottom: '1.5em' }}>
                <LyricCard 
                  lyric={item.lyric}
                  artist={`${item.artist} - "${item.song}"`}
                />
                {item.album && item.album !== 'Unknown Album' && (
                  <small style={{ 
                    display: 'block', 
                    marginTop: '0.5em', 
                    opacity: 0.7,
                    paddingLeft: '1em'
                  }}>
                    Album: {item.album}
                    {item.duration && ` • ${Math.floor(item.duration / 60)}:${(item.duration % 60).toString().padStart(2, '0')}`}
                  </small>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}