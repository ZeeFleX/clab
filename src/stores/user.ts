import { makeAutoObservable } from 'mobx'

import { RootStore } from './'
import {
  registrationNotifyPhoneAction,
  registrationConfirmPhoneAction,
  registrationAction,
  authorizationAction,
  passwordRecoveryAction,
} from 'api'
export default class UserStore {
  rootStore?: RootStore
  user?: string
  constructor(rootStore?: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  async registrationNotifyPhone(phone: string) {
    try {
      const response = await registrationNotifyPhoneAction({ phone })

      if (response.status === 400) {
        throw new Error(response.message)
      }

      return response
    } catch (error: any) {
      const uiStore = this.rootStore?.UIStore
      uiStore?.createFlash({ type: 'error', content: error.message as string })
      return error
    }
  }

  async registrationConfirmPhone(phone: string, code: string) {
    try {
      const response = await registrationConfirmPhoneAction({ phone, code })

      if (response.status === 400) {
        throw new Error(response.message)
      }

      return response
    } catch (error: any) {
      const uiStore = this.rootStore?.UIStore
      uiStore?.createFlash({ type: 'error', content: error.message as string })
      return error
    }
  }

  async registration(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    code: string,
    type = 0
  ) {
    try {
      const response = await registrationAction({
        firstName,
        lastName,
        email,
        password,
        code,
        type,
      })

      if (response.error) {
        throw new Error(response.error)
      }

      return response
    } catch (error: any) {
      const uiStore = this.rootStore?.UIStore
      uiStore?.createFlash({ type: 'error', content: error.message as string })
      return error
    }
  }

  async authorization(login: string, password: string) {
    try {
      const uiStore = this.rootStore?.UIStore
      const response = await authorizationAction({
        login,
        password,
      })

      if (response.error) {
        throw new Error(response.error)
      }

      uiStore?.createFlash({ type: 'success', content: 'Добро пожаловать' })

      return response
    } catch (error: any) {
      const uiStore = this.rootStore?.UIStore
      uiStore?.createFlash({ type: 'error', content: error.message as string })
      return error
    }
  }

  async passwordRecovery(login: string) {
    try {
      const uiStore = this.rootStore?.UIStore
      const response = await passwordRecoveryAction({
        login,
      })

      if (response.error) {
        throw new Error(response.error)
      }

      return response
    } catch (error: any) {
      const uiStore = this.rootStore?.UIStore
      uiStore?.createFlash({ type: 'error', content: error.message as string })
      return error
    }
  }
}
