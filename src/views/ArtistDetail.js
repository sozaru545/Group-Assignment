// views/ArtistDetail.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArtistInfo, fetchArtistTracks } from '../services/lyricsService';
import { mockLyrics } from '../utils/mockData';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorDisplay from '../components/ErrorDisplay';

export default function ArtistDetail() {
  const { artistName } = useParams();
  const [artistInfo, setArtistInfo] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  useEffect(() => {
    const loadArtistData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Try to fetch from real API
        const [info, trackList] = await Promise.all([
          fetchArtistInfo(decodeURIComponent(artistName)),
          fetchArtistTracks(decodeURIComponent(artistName))
        ]);
        
        setArtistInfo(info);
        setTracks(trackList);
        setIsUsingMockData(false);
      } catch (apiError) {
        console.warn('API failed, using mock data:', apiError);
        
        // Fallback to mock data
        const artistSongs = mockLyrics.filter(
          song => song.artist.toLowerCase() === decodeURIComponent(artistName).toLowerCase()
        );
        
        if (artistSongs.length > 0) {
          // Create mock artist info from mock data
          setArtistInfo({
            name: decodeURIComponent(artistName),
            genre: artistSongs[0].genre || 'Various',
            biography: 'Artist information not available offline.'
          });
          
          // Convert mock songs to track format
          setTracks(artistSongs.map(song => ({
            id: song.id,
            name: song.song,
            album: song.album,
            genre: song.genre
          })));
          
          setIsUsingMockData(true);
        } else {
          setError('Artist not found');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadArtistData();
  }, [artistName]);

  if (isLoading) {
    return (
      <div className="page-container">
        <h1><LoadingSkeleton width="200px" /></h1>
        <LoadingSkeleton height="100px" style={{ marginTop: '1em' }} />
        <h2>Songs:</h2>
        <LoadingSkeleton height="150px" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <ErrorDisplay message={error} />
      </div>
    );
  }

  if (!artistInfo) {
    return (
      <div className="page-container">
        <p>Artist information not available.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      {isUsingMockData && (
        <div style={{ 
          padding: '0.5em', 
          background: 'var(--card)', 
          borderRadius: '8px',
          marginBottom: '1em' 
        }}>
          <small>Using offline data (API unavailable)</small>
        </div>
      )}
      
      <h1>{artistInfo.name}</h1>
      
      {/* Artist Image if available */}
      {artistInfo.image && (
        <img 
          src={artistInfo.image} 
          alt={artistInfo.name}
          style={{ 
            maxWidth: '300px', 
            borderRadius: '8px',
            marginBottom: '1em' 
          }}
        />
      )}
      
      {/* Artist Details */}
      <div style={{ marginBottom: '2em' }}>
        {artistInfo.genre && <p><strong>Genre:</strong> {artistInfo.genre}</p>}
        {artistInfo.country && <p><strong>Country:</strong> {artistInfo.country}</p>}
        {artistInfo.formed && <p><strong>Formed:</strong> {artistInfo.formed}</p>}
        {artistInfo.website && (
          <p>
            <strong>Website:</strong>{' '}
            <a href={artistInfo.website} target="_blank" rel="noopener noreferrer">
              {artistInfo.website}
            </a>
          </p>
        )}
      </div>
      
      {/* Biography */}
      {artistInfo.biography && (
        <div style={{ marginBottom: '2em' }}>
          <h2>Biography</h2>
          <p style={{ lineHeight: '1.6' }}>
            {artistInfo.biography.length > 500 
              ? artistInfo.biography.substring(0, 500) + '...' 
              : artistInfo.biography}
          </p>
        </div>
      )}
      
      {/* Track List */}
      <h2>Songs:</h2>
      {tracks.length > 0 ? (
        <ul>
          {tracks.map(track => (
            <li key={track.id}>
              {track.name} 
              {track.album && ` - ${track.album}`}
              {track.year && ` (${track.year})`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No songs available.</p>
      )}
    </div>
  );
}