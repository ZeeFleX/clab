import { makeAutoObservable } from 'mobx'
import { SyntheticEvent } from 'react'

import { passwordValidator, loginValidator, collectStoreFormData } from 'utils'

import FormsStore from './index'
import { InputType } from './form.types'
import { IInputMessage } from 'components/Input/Input.types'

export default class SignIn {
  formsStore?: FormsStore
  fields: { [index: string]: InputType }
  onSubmit: (event: SyntheticEvent) => void
  submitButtonText?: string
  isValid: boolean | null

  constructor(formsStore?: FormsStore) {
    this.formsStore = formsStore
    this.submitButtonText = 'Войти'
    this.isValid = true
    this.fields = {
      login: {
        placeholder: 'Email или номер телефона',
        name: 'login',
        type: 'text',
        value: '',
        validators: [loginValidator],
        messages: [],
        onChange: (
          event: SyntheticEvent<HTMLInputElement>,
          fieldName: string
        ) => {
          this.inputChangeHandler(event, fieldName)
        },
      },

      ['new-password']: {
        placeholder: 'Password',
        name: 'new-password',
        type: 'password',
        value: '',
        validators: [passwordValidator],
        messages: [],
        onChange: (
          event: SyntheticEvent<HTMLInputElement>,
          fieldName: string
        ) => {
          this.inputChangeHandler(event, fieldName)
        },
      },
    }

    this.onSubmit = async (event?: SyntheticEvent) => {
      event?.preventDefault()
      this.validateForm()

      if (this.isValid) {
        const userStore = this.formsStore?.rootStore?.userStore
        const values = collectStoreFormData(this.fields)

        const result = await userStore?.authorization(
          values.login,
          values['new-password']
        )

        if (result instanceof Error) {
          return false
        }
        return true
      }
    }
    makeAutoObservable(this)
  }

  inputChangeHandler(
    event: SyntheticEvent<HTMLInputElement>,
    fieldName: string
  ) {
    const value = event.currentTarget.value
    this.validateField(fieldName, value)
    this.fields[fieldName].value = value
  }

  validateField(fieldName: string, value: string): IInputMessage[] {
    const messages = this.fields[fieldName].validators
      ?.map((validator) => validator(value))
      .filter((message: IInputMessage) => message.code)
    this.fields[fieldName].messages = messages
    return messages
  }

  validateForm(): boolean {
    Object.values(this.fields).forEach(({ name, value }) => {
      this.validateField(name, value)
    })
    const formIsValid = Object.values(this.fields).every(
      (field) => !field.messages.length
    )
    this.isValid = formIsValid
    return formIsValid
  }
}
