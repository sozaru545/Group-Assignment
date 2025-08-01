// components/LyricCard.js
import styles from '../styles/LyricCard.module.css';

export default function LyricCard({ lyric, artist }) {
  return (
    <div className={styles.card}>
      <p className={styles.lyric}>"{lyric}"</p>
      <h3 className={styles.artist}>- {artist}</h3>
    </div>
  );
}

