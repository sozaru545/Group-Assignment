import Navbar from '../components/Navbar'; 
import styles from '../styles/index.module.css';

export default function Home() {
  return (
    <div className={styles.pageContainer}>
    
      <main className={styles.mainContent}>
        {/* Home contents */}
        <p>Welcome to LyricSpot!</p>
      </main>
    </div>
  );
}
