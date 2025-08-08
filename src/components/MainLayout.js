import React from 'react'
import styles from '../styles/MainLayout.module.css'

export default function MainLayout({ children }) {
  return <div className={styles.container}>{children}</div>
}

// optional sub‐slots
export function Header({ children }) {
  return <header className={styles.header}>{children}</header>
}

export function Sidebar({ children }) {
  return <aside className={styles.sidebar}>{children}</aside>
}

export function Content({ children }) {
  return <section className={styles.content}>{children}</section>
}

export function FooterSlot({ children }) {
  return <footer className={styles.footer}>{children}</footer>
}
