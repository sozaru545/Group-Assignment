import Navbar from '../components/Navbar'; 
import styles from '../styles/search.module.css';

export default function SearchPage() {
  return (
    <div className={styles.pageContainer}>
   
      <main className={styles.mainContent}>
        <h1>Search Mode</h1>
        <input
          type="text"
          placeholder="Search artists or songs..."
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>Search</button>
      </main>
    </div>
  );
}
