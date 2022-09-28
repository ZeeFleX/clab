import { makeAutoObservable } from 'mobx'
import { RootStore } from './'
import { v4 as uuidv4 } from 'uuid'

export default class UIStore {
  theme: 'light' | 'dark'
  rootStore: RootStore
  flashes: any[]

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
    this.theme = 'light'
    this.flashes = []
  }

  createFlash(flash: { type: string; content: string }): void {
    const id = uuidv4()
    this.flashes = [
      ...this.flashes,
      {
        ...flash,
        id,
      },
    ]

    setTimeout(() => {
      this.removeFlash(id)
    }, 5000)
    if (flash.type === 'error') {
      console.warn(flash.content)
    }
  }

  removeFlash(flashId: string): void {
    this.flashes = this.flashes.filter((flash) => flash.id !== flashId)
  }
}
