import React from 'react'
import styles from '../styles/LoadingSkeleton.module.css'

export default function LoadingSkeleton({ width = '100%', height = '1em', style }) {
  return (
    <div
      className={styles.skeleton}
      style={{ width, height, ...style }}
    />
  )
}
