import React, { FC, useEffect } from 'react'
import { useObserver } from 'mobx-react-lite'

import { useStores } from 'hooks/useStores'

import { IInstagramFeedProps } from './InstagramFeed.types'

import 'react-ig-feed/dist/index.css'
import styles from './InstagramFeed.module.sass'

export const InstagramFeed: FC<IInstagramFeedProps> = () => {
  const { instagramStore } = useStores()

  useEffect(() => {
    instagramStore.getInstagramFeed()
  }, [])

  const instagramItems = useObserver(() => instagramStore.data)

  return (
    <div className={styles.InstagramFeed}>
      <h1>Впечатления</h1>
      <div className={styles.imagesContainer}>
        {instagramItems?.data?.map((item: any) => (
          <a
            key={item.id}
            href={item.permalink}
            target="_blank"
            className={styles.igItem}
            rel="noreferrer"
          >
            <img src={item.media_url} />
          </a>
        ))}
      </div>
    </div>
  )
}

export default InstagramFeed
