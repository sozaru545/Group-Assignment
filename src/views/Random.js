import { useEffect, useState } from "react";
import LyricCard from "../components/LyricCard";
import ShuffleButton from "../components/ShuffleButton";
import { mockLyrics } from "../utils/mockData";
import styles from "../styles/random.module.css";

export default function Random() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (mockLyrics.length) {
      setIndex(Math.floor(Math.random() * mockLyrics.length));
    }
  }, []);

  const shuffleLyric = () => {
    if (!mockLyrics.length) return;
    let next = Math.floor(Math.random() * mockLyrics.length);
    if (mockLyrics.length > 1 && next === index) next = (next + 1) % mockLyrics.length;
    setIndex(next);
  };

  if (!mockLyrics.length) return <p>No lyrics available.</p>;

  const item = mockLyrics[index];

  return (
    <main className={`container ${styles.page}`}>
      <LyricCard lyric={item.lyric} artist={item.artist} />
      <div className={styles.shuffleButton}>
        <ShuffleButton onShuffle={shuffleLyric} />
      </div>
    </main>
  );
}
