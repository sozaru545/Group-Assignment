import React from 'react'
import styles from '../styles/Button.module.css'
import cn from 'classnames' // optional, or just string interpolation

export default function Button({ variant = 'primary', children, ...props }) {
  const cls = cn(
    styles.button,
    variant === 'primary'   ? styles.primary :
    variant === 'secondary' ? styles.secondary :
    ''
  )
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
