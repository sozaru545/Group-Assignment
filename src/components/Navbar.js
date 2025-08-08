// src/components/Navbar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.wrapper}>
      <nav className={`container ${styles.navbar}`}>
        <h1 className={styles.logo}>LyricSpot</h1>

        {/* Desktop links */}
        <ul className={`${styles.navLinks} ${open ? styles.open : ""}`} id="main-nav">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")} onClick={() => setOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/random" className={({ isActive }) => (isActive ? styles.active : "")} onClick={() => setOpen(false)}>
              Random
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className={({ isActive }) => (isActive ? styles.active : "")} onClick={() => setOpen(false)}>
              Search
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : "")} onClick={() => setOpen(false)}>
              About
            </NavLink>
          </li>
        </ul>

        {/* Right side controls */}
        <div className={styles.right}>
          <ThemeToggle />
          <button
            className={styles.menuBtn}
            aria-label="Toggle menu"
            aria-controls="main-nav"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {/* simple hamburger */}
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>
      </nav>
    </header>
  );
}
