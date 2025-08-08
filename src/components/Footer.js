import React from 'react'
import styles from '../styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} LyricSpot. All rights reserved.</p>
    </footer>
  )
}
