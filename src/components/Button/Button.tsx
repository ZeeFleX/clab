import React, { FC } from 'react'

import { IButtonProps } from './Button.types'
import styles from './Button.module.sass'

export const Button: FC<IButtonProps> = ({
  text,
  onClick,
  startAdornment,
  endAdornment,
  type,
  ...props
}) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      type={type}
      style={{ ...props.style }}
      {...props}
    >
      <div className={styles.adornment}>{startAdornment}</div>

      <span className={styles.buttonText}>{text}</span>
      <div className={styles.adornment}>{endAdornment}</div>
    </button>
  )
}

export default Button
