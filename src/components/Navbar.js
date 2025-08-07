import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>LyricSpot</h1>
      <ul className={styles.navLinks}>
        <li>
          <Link
            to="/"
            className={location.pathname === "/" ? styles.active : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/random"
            className={location.pathname === "/random" ? styles.active : ""}
          >
            Random
          </Link>
        </li>
        <li>
          <Link
            to="/search"
            className={location.pathname === "/search" ? styles.active : ""}
          >
            Search
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={location.pathname === "/about" ? styles.active : ""}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

