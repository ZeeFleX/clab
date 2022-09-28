import React, { useLayoutEffect } from 'react'

import * as IFeed from 'instafeed'

import styles from './InstagramFeed.module.sass'

export const InstagramFeed = () => {
  useLayoutEffect(() => {
    new IFeed({
      username: 'silverscreen',
      container: document.getElementById('instagram-feed'),
      display_profile: true,
      display_biography: true,
      display_gallery: true,
      display_captions: true,
      max_tries: 8,
      callback: null,
      styling: true,
      items: 8,
      items_per_row: 4,
      margin: 1,
      lazy_load: true,
      on_error: console.error,
    })
  }, [])
  return (
    <div className={styles.InstagramFeed}>
      <h1>Впечатления</h1>
      <div className={styles.imagesContainer} id="instagram-feed"></div>
    </div>
  )
}

export default InstagramFeed
