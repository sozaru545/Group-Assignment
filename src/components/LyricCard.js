// components/LyricCard.js
import { Link } from 'react-router-dom';
import styles from '../styles/LyricCard.module.css';

export default function LyricCard({ id, lyric, artist }) {
  return (
    <div className={styles.card}>
      <Link to={`/song/${id}`}>
        <p className={styles.lyric}>"{lyric}"</p>
      </Link>
      <h3 className={styles.artist}>
        <Link to={`/artist/${encodeURIComponent(artist)}`}>
          - {artist}
        </Link>
      </h3>
    </div>
  );
}
