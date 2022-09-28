import React from 'react'
import { useObserver } from 'mobx-react-lite'

import { useStores } from 'hooks/useStores'

import styles from './Flashes.module.sass'

export const Flashes = () => {
  const { UIStore } = useStores()
  const flashes = useObserver(() => UIStore.flashes)
  return (
    <div className={styles.flashesContainer}>
      {flashes.map((flash: any) => (
        <div
          className={`${styles.flash} ${styles[`flash${flash.type}`]}`}
          key={flash.id}
        >
          {flash.content}
        </div>
      ))}
    </div>
  )
}

export default Flashes
