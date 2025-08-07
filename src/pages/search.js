import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LyricCard from '../components/LyricCard';
import { mockLyrics } from '../utils/mockData';

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const [query, setQuery] = useState(params.get('q') || '');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      const filtered = mockLyrics.filter(
        item => item.artist.toLowerCase().includes(query.toLowerCase()) || 
               item.song.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <h1>Search Mode</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search artists or songs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        
        <div className="results">
          {results.map(item => (
            <LyricCard 
              key={item.id}
              id={item.id}
              lyric={item.lyric}
              artist={item.artist}
            />
          ))}
        </div>
      </main>
    </div>
  );
}