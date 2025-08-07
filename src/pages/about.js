import Navbar from '../components/Navbar'; 
import styles from '../styles/about.module.css';

export default function AboutPage() {
  return (
    <div className={styles.pageContainer}>
      
      <main className={styles.mainContent}>
        <h1>About LyricSpot</h1>
        {/* The rest of the about page contents */}
      </main>
    </div>
  );
}
