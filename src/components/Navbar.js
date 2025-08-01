import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>LyricSpot</h1>
      <ul className={styles.navLinks}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/random">Random</Link></li>
        <li><Link to="/search">Search</Link></li>
      </ul>
    </nav>
  );
}

