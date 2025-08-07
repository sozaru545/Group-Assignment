// hooks/useRandomLyric.js
import { useState } from 'react';
import { fetchRandomLyric } from '../services/mockLyricsAPI';
import { useTheme } from '../context/ThemeContext';

const useRandomLyric = () => {
  const [lyric, setLyric] = useState(null);
  const [error, setError] = useState(null);
  const { setIsLoading } = useTheme();

  const getLyric = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchRandomLyric();
      setLyric(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { lyric, error, getLyric };
};

export default useRandomLyric;

