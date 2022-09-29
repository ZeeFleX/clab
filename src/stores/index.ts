import UserStore from './user'
import UIStore from './ui'
import FormsStore from './forms'
import InstagramStore from './instagram'

export class RootStore {
  userStore: UserStore
  UIStore: UIStore
  formsStore: FormsStore
  instagramStore: InstagramStore
  constructor() {
    this.userStore = new UserStore(this)
    this.UIStore = new UIStore(this)
    this.formsStore = new FormsStore(this)
    this.instagramStore = new InstagramStore(this)
  }
}

export default new RootStore()
