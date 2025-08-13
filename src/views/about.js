import Navbar from '../components/Navbar'; 
import styles from '../styles/about.module.css';

export default function AboutPage() {
  return (
    <div className={styles.pageContainer}>
      
      <main className={styles.mainContent}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>About LyricSpot</h1>
        <h2>What is LyricSpot?</h2>
        <p>
          LyricSpot is a web application that displays song lyrics and artist information. 
          The application allows users to discover music through random lyric generation 
          and search for specific songs or artists.
        </p>

        <h2>Features</h2>
        <p>
          The application includes three main features. The Random feature displays a 
          randomly selected song lyric along with the artist name and song title. Users 
          can click a button to generate a new random selection. The Search feature enables 
          users to search for songs by artist name or song title. Search results display 
          lyric previews and related information such as album names and song duration.
        </p>

        <h2>Data Sources (APIs)</h2>
        <p>
          Primary lyrics data comes from LRClib.net, an open-source lyrics database. 
          Artist biographical information and images are sourced from TheAudioDB when 
          the service is operational. Mock data is stored locally to ensure the application 
          remains functional during API outages or network issues.
        </p>
      </main>
    </div>
  );
}
