import UserStore from './user'
import UIStore from './ui'
import FormsStore from './forms'

export class RootStore {
  userStore: UserStore
  UIStore: UIStore
  formsStore: FormsStore
  constructor() {
    this.userStore = new UserStore(this)
    this.UIStore = new UIStore(this)
    this.formsStore = new FormsStore(this)
  }
}

export default new RootStore()
