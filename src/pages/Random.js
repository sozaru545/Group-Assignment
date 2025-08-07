import { useState } from "react";
import Navbar from "../components/Navbar";
import LyricCard from "../components/LyricCard";
import ShuffleButton from "../components/ShuffleButton";
import { mockLyrics } from "../utils/mockData"; 
import styles from "../styles/random.module.css";

export default function Random() {
  const [index, setIndex] = useState(0);

  const shuffleLyric = () => {
    const randomIndex = Math.floor(Math.random() * mockLyrics.length);
    setIndex(randomIndex);
  };

  return (
    <>
   
      <main className={styles.page}>
        <LyricCard
          lyric={mockLyrics[index].lyric}
          artist={mockLyrics[index].artist}
        />
        <div className={styles.shuffleButton}>
          <ShuffleButton onShuffle={shuffleLyric} />
        </div>
      </main>
    </>
  );
}
