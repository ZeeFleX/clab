import React from 'react'

import { InstagramFeed } from 'components'

import styles from './MainPage.module.sass'

export const Mainpage = () => {
  return (
    <div className={styles.MainPage}>
      <InstagramFeed
        token="IGQVJVNHVGci1lV3cyd2duU2lOX2VpQ0dOQXBUaHRaekdSRFdPVFNYSEdUUmVSa1poa1BQV2xLRGlaaS1wUTF2ZAU9YRFJKODRQT3h3Y01sZAjlVVFg3VXgwdkotbHdLSm01U0NvRVlNSGxfOFdocHlNbwZDZD"
        count="8"
      />
    </div>
  )
}

export default Mainpage
