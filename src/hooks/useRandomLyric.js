// hooks/useRandomLyric.js
import { useState, useCallback } from 'react';
import { fetchRandomSongData } from '../services/lyricsService';
import { fetchRandomLyric as fetchMockLyric } from '../services/mockLyricsAPI';
import { mockLyrics } from '../utils/mockData';

const useRandomLyric = () => {
  const [lyric, setLyric] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  // Function to get random mock lyric
  const getRandomMockLyric = () => {
    const randomIndex = Math.floor(Math.random() * mockLyrics.length);
    return mockLyrics[randomIndex];
  };

  const getLyric = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsUsingMockData(false);
    
    try {
      // Try to fetch from real API first
      const data = await fetchRandomSongData();
      setLyric(data);
    } catch (apiError) {
      console.warn('Real API failed, falling back to mock data:', apiError);
      
      try {
        // Fallback to mock API service
        const mockData = await fetchMockLyric();
        setLyric(mockData);
        setIsUsingMockData(true);
      } catch (mockError) {
        // If mock API also fails, use static mock data
        console.warn('Mock API failed, using static data:', mockError);
        const staticMockData = getRandomMockLyric();
        setLyric({
          ...staticMockData,
          text: staticMockData.lyric // Normalize the data structure
        });
        setIsUsingMockData(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { 
    lyric, 
    error, 
    isLoading, 
    getLyric,
    isUsingMockData 
  };
};

export default useRandomLyric;