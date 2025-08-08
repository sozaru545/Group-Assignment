import React from 'react'
import styles from '../styles/LyricCard.module.css'

export default function LyricCard({ children }) {
  return <div className={styles.card}>{children}</div>
}

// HEADER
function Header({ children }) {
  return <div className={styles.header}>{children}</div>
}

// BODY
function Body({ children }) {
  return <div className={styles.body}>{children}</div>
}

// FOOTER
function Footer({ children }) {
  return <div className={styles.footer}>{children}</div>
}

// attach sub‐components
LyricCard.Header = Header
LyricCard.Body   = Body
LyricCard.Footer = Footer
