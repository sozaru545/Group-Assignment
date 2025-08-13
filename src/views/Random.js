// views/Random.js
import { useEffect } from "react";
import LyricCard from "../components/LyricCard";
import ShuffleButton from "../components/ShuffleButton";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorDisplay from "../components/ErrorDisplay";
import useRandomLyric from "../hooks/useRandomLyric";
import styles from "../styles/random.module.css";

export default function Random() {
  const { lyric, error, isLoading, getLyric, isUsingMockData } = useRandomLyric();

  // Fetch initial lyric on component mount
  useEffect(() => {
    getLyric();
  }, []);

  // Handle loading state
  if (isLoading) {
    return (
      <main className={`container ${styles.page}`}>
        <div className="card">
          <LoadingSkeleton height="3em" style={{ marginBottom: '1em' }} />
          <LoadingSkeleton width="150px" height="1em" />
        </div>
        <div className={styles.shuffleButton}>
          <button disabled>Loading...</button>
        </div>
      </main>
    );
  }

  // Handle error state
  if (error && !lyric) {
    return (
      <main className={`container ${styles.page}`}>
        <ErrorDisplay message="Failed to load lyrics. Please try again." />
        <div className={styles.shuffleButton}>
          <ShuffleButton onShuffle={getLyric} />
        </div>
      </main>
    );
  }

  // Handle no data state
  if (!lyric) {
    return (
      <main className={`container ${styles.page}`}>
        <p>No lyrics available. Click below to load some!</p>
        <div className={styles.shuffleButton}>
          <ShuffleButton onShuffle={getLyric} />
        </div>
      </main>
    );
  }

  // Normalize data structure (handle both API and mock data formats)
  const displayLyric = lyric.lyric || lyric.text || "No lyrics available";
  const displayArtist = lyric.artist || "Unknown Artist";

  return (
    <main className={`container ${styles.page}`}>
      {isUsingMockData && (
        <div className={styles.notice}>
          <small>Using offline data (API unavailable)</small>
        </div>
      )}
      
      <LyricCard 
        lyric={displayLyric} 
        artist={displayArtist} 
      />
      
      {/* Display additional info if available from API */}
      {lyric.song && (
        <div className={styles.songInfo}>
          <p><strong>Song:</strong> {lyric.song}</p>
          {lyric.genre && <p><strong>Genre:</strong> {lyric.genre}</p>}
        </div>
      )}
      
      <div className={styles.shuffleButton}>
        <ShuffleButton 
          onShuffle={getLyric} 
          disabled={isLoading}
        />
      </div>
    </main>
  );
}