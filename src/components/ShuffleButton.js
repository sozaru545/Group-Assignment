// components/ShuffleButton.js
import styles from '../styles/ShuffleButton.module.css';

export default function ShuffleButton({ onShuffle }) {
  return (
    <button className={styles.shuffleBtn} onClick={onShuffle}>
      🎵 Please Shuffle Again 🎵
    </button>
  );
}




