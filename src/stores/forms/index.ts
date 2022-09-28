import { makeAutoObservable } from 'mobx'
import { RootStore } from '../'
import SigninForm from './signin'
import SignUp1Form from './signup1'
import SignUp2Form from './signup2'
import SignUp3Form from './signup3'
import PasswordRecovery1Form from './passwordRecovery1'
import PasswordRecovery2Form from './passwordRecovery2'

export default class FormsStore {
  rootStore?: RootStore
  signin?: SigninForm
  signup1?: SignUp1Form
  signup2?: SignUp2Form
  signup3?: SignUp3Form
  passwordRecovery1: PasswordRecovery1Form
  passwordRecovery2: PasswordRecovery2Form
  constructor(rootStore?: RootStore) {
    this.rootStore = rootStore
    this.signin = new SigninForm(this)
    this.signup1 = new SignUp1Form(this)
    this.signup2 = new SignUp2Form(this)
    this.signup3 = new SignUp3Form(this)
    this.passwordRecovery1 = new PasswordRecovery1Form(this)
    this.passwordRecovery2 = new PasswordRecovery2Form(this)
    makeAutoObservable(this)
  }
}
