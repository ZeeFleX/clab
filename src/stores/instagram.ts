import { makeAutoObservable } from 'mobx'

import { INSTAGRAM_TOKEN } from 'config'
import { getInstagramFeedAction } from 'api'

import { RootStore } from './'

export default class UserStore {
  rootStore?: RootStore
  data?: any
  constructor(rootStore?: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  async getInstagramFeed() {
    try {
      const response = await getInstagramFeedAction(INSTAGRAM_TOKEN)

      if (response) {
        this.data = response
      }

      return response
    } catch (error: any) {
      const uiStore = this.rootStore?.UIStore
      uiStore?.createFlash({ type: 'error', content: error.message as string })
      return error
    }
  }
}
