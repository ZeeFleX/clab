import React from 'react'

import { InstagramFeed } from 'components'

import styles from './MainPage.module.sass'

export const Mainpage = () => {
  return (
    <div className={styles.MainPage}>
      <InstagramFeed />
    </div>
  )
}

export default Mainpage
