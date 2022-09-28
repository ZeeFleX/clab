import React from 'react'

import { Link } from 'react-router-dom'

import { Button } from 'components'

import styles from './Header.module.sass'

export const Header = () => {
  return (
    <div className={styles.header}>
      <Link to={`/signin`}>
        <Button text="Вход" />
      </Link>
      <Link to={`/signup`}>
        <Button text="Регистрация" />
      </Link>
    </div>
  )
}

export default Header
