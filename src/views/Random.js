// views/Random.js
import { useEffect } from "react";
import LyricCard from "../components/LyricCard";
import ShuffleButton from "../components/ShuffleButton";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorDisplay from "../components/ErrorDisplay";
import useRandomLyric from "../hooks/useRandomLyric";
import styles from "../styles/random.module.css";

export default function Random() {
  // Custom hook that handles all the API logic
  const { lyric, error, isLoading, getLyric, isUsingMockData } = useRandomLyric();

  // Fetch initial lyric on component mount
  useEffect(() => {
    getLyric();
  }, []);

  // Handle loading state
  // Show skeleton loader while fetching data
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
        <p>No lyrics available. Click below to load some.</p>
        <div className={styles.shuffleButton}>
          <ShuffleButton onShuffle={getLyric} />
        </div>
      </main>
    );
  }

  // Normalize data structure (handles both API and mock data formats)
  // These lines ensure we always have something to display
  const displayLyric = lyric.lyric || lyric.text || "No lyrics available";
  const displayArtist = lyric.artist || "Unknown Artist";

  // Success State
   return (
    <main className={`container ${styles.page}`}>
      {/* Show notice if we're using offline/mock data */}
      {isUsingMockData && (
        <div className={styles.notice}>
          <small>Using offline data (API unavailable)</small>
        </div>
      )}
      
      {/* Main lyric display card */}
      <LyricCard 
        lyric={displayLyric} 
        artist={displayArtist} 
      />
      
      {/* Additional song info if available from API */}
      {lyric.song && (
        <div className={styles.songInfo}>
          <p><strong>Song:</strong> {lyric.song}</p>
          {/* Only show genre if it exists */}
          {lyric.genre && <p><strong>Genre:</strong> {lyric.genre}</p>}
        </div>
      )}
      
      {/* Shuffle button to get new random song */}
      <div className={styles.shuffleButton}>
        <ShuffleButton 
          onShuffle={getLyric}  // Pass the fetch function
          disabled={isLoading}  // Disable while loading
        />
      </div>
    </main>
  );
}