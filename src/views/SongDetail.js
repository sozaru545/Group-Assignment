// views/SongDetail.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchLyrics, fetchAlbumInfo } from '../services/lyricsService';
import { mockLyrics } from '../utils/mockData';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorDisplay from '../components/ErrorDisplay';

export default function SongDetail() {
  const { id } = useParams();
  const [songData, setSongData] = useState(null);
  const [lyricsData, setLyricsData] = useState(null);
  const [albumInfo, setAlbumInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  useEffect(() => {
    const loadSongData = async () => {
      setIsLoading(true);
      setError(null);
      
      // First, find the song in mock data (as we need artist/title for API)
      const mockSong = mockLyrics.find(item => item.id === parseInt(id));
      
      if (!mockSong) {
        setError('Song not found');
        setIsLoading(false);
        return;
      }
      
      setSongData(mockSong);
      
      try {
        // Try to fetch additional data from APIs
        const [lyrics, album] = await Promise.all([
          fetchLyrics(mockSong.artist, mockSong.song),
          mockSong.album ? fetchAlbumInfo(mockSong.artist, mockSong.album) : null
        ]);
        
        setLyricsData(lyrics);
        setAlbumInfo(album);
        setIsUsingMockData(false);
      } catch (apiError) {
        console.warn('API failed, using only mock data:', apiError);
        setIsUsingMockData(true);
        // We already have mockSong set, so the component can still display basic info
      } finally {
        setIsLoading(false);
      }
    };

    loadSongData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="page-container">
        <h1><LoadingSkeleton width="300px" /></h1>
        <h2><LoadingSkeleton width="200px" /></h2>
        <LoadingSkeleton height="50px" style={{ marginTop: '1em' }} />
        <h3>Lyrics:</h3>
        <LoadingSkeleton height="200px" />
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

  if (!songData) {
    return (
      <div className="page-container">
        <p>Song information not available.</p>
      </div>
    );
  }

  // Display lyrics snippet (not full lyrics to respect copyright)
  const displayLyrics = lyricsData?.snippet || songData.lyric || "Lyrics not available";

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
      
      <h1>{songData.song}</h1>
      <h2>by {songData.artist}</h2>
      
      {/* Album Cover if available */}
      {albumInfo?.image && (
        <img 
          src={albumInfo.image} 
          alt={`${songData.album} cover`}
          style={{ 
            maxWidth: '300px', 
            borderRadius: '8px',
            marginBottom: '1em' 
          }}
        />
      )}
      
      {/* Song Details */}
      <div style={{ marginBottom: '2em' }}>
        {songData.album && (
          <p><strong>Album:</strong> {songData.album}</p>
        )}
        {(albumInfo?.year || songData.year) && (
          <p><strong>Year:</strong> {albumInfo?.year || songData.year}</p>
        )}
        {songData.genre && (
          <p><strong>Genre:</strong> {songData.genre}</p>
        )}
      </div>
      
      {/* Album Description if available */}
      {albumInfo?.description && (
        <div style={{ marginBottom: '2em' }}>
          <h3>About the Album</h3>
          <p style={{ lineHeight: '1.6' }}>
            {albumInfo.description.length > 300 
              ? albumInfo.description.substring(0, 300) + '...' 
              : albumInfo.description}
          </p>
        </div>
      )}
      
      {/* Lyrics Section */}
      <h3>Lyrics Preview:</h3>
      <div style={{ 
        background: 'var(--card)', 
        padding: '1em',
        borderRadius: '8px',
        fontStyle: 'italic'
      }}>
        <p>{displayLyrics}</p>
      </div>
      
      {lyricsData?.fullLyrics && (
        <p style={{ marginTop: '1em', fontSize: '0.9em', opacity: 0.7 }}>
          <em>Full lyrics available through the API</em>
        </p>
      )}
    </div>
  );
}