import React from 'react'
import styles from '../styles/ErrorDisplay.module.css'

export default function ErrorDisplay({ message, children }) {
  return (
    <div className={styles.error}>
      <strong>Error:</strong> {message || children}
    </div>
  )
}
